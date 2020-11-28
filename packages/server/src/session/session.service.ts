import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { query, schema, tesla, types } from '@teslapp/common'
import { ProductService } from '../product/product.service'
import { VehicleState } from '@teslapp/common/dist/model/types'

@Injectable()
export class SessionService {
  constructor(
    @InjectModel('VehicleActivity')
    private readonly vehicleSessionModel: Model<schema.VehicleActivityType>,
    @InjectModel('VehicleState')
    private readonly vehicleStateModel: Model<schema.VehicleStateType>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService
  ) {
  }

  async getSessionDetails(username: string, id: string) {
    return this.vehicleStateModel
               .find({ vehicleSession: id })
               .sort({ timestamp: 1 })

  }

  async deleteSession(username: string, id: string) {
    const deleteCount = await this.vehicleStateModel.deleteOne({ _id: id, username })
    if (deleteCount.deletedCount) {
      const deleteItemCount = await this.vehicleStateModel.deleteMany({
        vehicleSession: id
      })
      if (deleteItemCount.deletedCount) {
        return (
          (deleteCount.deletedCount || 0) + (deleteItemCount.deletedCount || 0)
        )
      }
    }
  }

  async addTag(username: string, sessionId: string, tag: string) {
    const vehicleSession = await this.vehicleSessionModel.findOne({
      _id: sessionId
    })
    if (vehicleSession && !vehicleSession.tags.includes(tag)) {
      vehicleSession.tags.push(tag)
      const result = await this.vehicleStateModel.updateOne(
        { _id: sessionId },
        vehicleSession
      )
      return result.tags
    }
  }

  async removeTag(username: string, sessionId: string, tag: string) {
    const vehicleSession = await this.vehicleSessionModel.findOne({
      _id: sessionId
    })
    if (vehicleSession && vehicleSession.tags.includes(tag)) {
      vehicleSession.tags.splice(vehicleSession.tags.indexOf(tag), 1)
      const result = await this.vehicleStateModel.updateOne(
        { _id: sessionId },
        vehicleSession
      )
      return result.tags
    }
  }

  async findActivities(username: string, query: query.QuerySet): Promise<query.QueryResult> {
    const vehicleId = query.predicates.find((p) => p.field === 'vehicle')
      ?.value
    if (!vehicleId) {
      throw Error('vehicle/product required in session predicate')
    }
    const tags = query.predicates.filter((p) => p.field === 'tags')

    const skip = query.page.start
    // set up criteria for count and query
    const criteria = {
      vehicle: { _id: vehicleId, username },
      tags: tags.map((p) => p.value)
      // start_date: { $gte: jan2019, $lte: dec2019 }
    }

    // get a total count for pagination info
    const countQuery = this.vehicleSessionModel.countDocuments()
    countQuery.setQuery(criteria)
    const count = await countQuery.exec()

    // do query with same criteria as count
    // @ts-ignore
    const mongooseQuery = this.vehicleSessionModel.find()
    mongooseQuery.setQuery(criteria)
    mongooseQuery.populate('first')
    mongooseQuery.populate('last')
    mongooseQuery.skip(query.page.start)
                 .limit(query.page.size)
    if (query.sort) {
      const { field, desc } = query.sort[0]
      mongooseQuery.sort(`${desc ? '-' : ''}${field}`)
    }
    const result = await mongooseQuery.exec()

    return {
      page: { size: result.length, start: skip, total: count },
      results: result
    }
  }


  async createNewActivity(vehicle: schema.VehicleType, activity: types.ActivityType, vehicleData: tesla.VehicleData) {
    const first = await this.vehicleStateModel.create(vehicleData)
    const {
      charge_current_request_max,
      charge_enable_request,
      charge_to_max_range,
      charge_port_cold_weather_mode,
      charge_limit_soc,
      charge_limit_soc_std,
      charge_limit_soc_min,
      charge_limit_soc_max,
      charger_phases,
      charger_pilot_current,
      conn_charge_cable,
      fast_charger_brand,
      fast_charger_present,
      fast_charger_type,
      managed_charging_active,
      managed_charging_start_time,
      managed_charging_user_canceled,
      max_range_charge_counter,
      scheduled_charging_pending,
      scheduled_charging_start_time,
      trip_charging
    } = vehicleData.charge_state

    const session = {
      vehicle,
      activity,
      first,
      archived: false,

      charge_current_request_max,
      charge_enable_request,
      charge_to_max_range,
      charge_port_cold_weather_mode,
      charge_limit_soc,
      charge_limit_soc_std,
      charge_limit_soc_min,
      charge_limit_soc_max,
      charger_phases,
      charger_pilot_current,
      conn_charge_cable,
      fast_charger_brand,
      fast_charger_present,
      fast_charger_type,
      managed_charging_active,
      managed_charging_start_time,
      managed_charging_user_canceled,
      max_range_charge_counter,
      scheduled_charging_pending,
      scheduled_charging_start_time,
      trip_charging,
      distance: 0,
      duration_seconds: 0,
      id_s: vehicle.id_s,
      tags: [],
      start_date: vehicleData.vehicle_state.timestamp,
      latitude: vehicleData.drive_state.latitude,
      longitude: vehicleData.drive_state.longitude
    }
    return this.vehicleSessionModel.create(session)
  }

  async findTags(username: string, productId: string) {
    const query = this.vehicleSessionModel.find()
    query.setQuery({
      vehicle: { _id: productId },
      tags: { $exists: true, $not: { $size: 0 } }
    })
    const results = await query.exec()
    return results.reduce((acc, cur) => {
      cur.tags.forEach((tag) => {
        if (tag.length && !acc.includes(tag)) {
          acc.push(tag)
        }
      })
      return acc
    }, [] as string[])
  }


  async appendVehicleState(vehicleActivity: schema.VehicleActivityType, vehicleData: tesla.VehicleData): Promise<schema.VehicleActivityType> {
    vehicleActivity.last = await this.vehicleStateModel.create(vehicleData)
    vehicleActivity.end_date = vehicleData.vehicle_state.timestamp
    vehicleActivity.duration_seconds = vehicleActivity.end_date - vehicleActivity.start_date
    vehicleActivity.distance = vehicleActivity.last.vehicle_state.odometer - vehicleActivity.first.vehicle_state.odometer

    // TODO: any other data aggregation for this activity

    return this.vehicleSessionModel.update({ _id: vehicleActivity._id }, vehicleActivity)

  }

  async findCurrentActivity(product: schema.VehicleType, vehicleStatus: types.ActivityType, after: number) {
    const result = await this.findActivities(product.username, {
      predicates: [
        { operator: query.Operator.EQ, value: product._id, field: 'vehicle' },
        { operator: query.Operator.EQ, value: vehicleStatus, field: 'activity' },
        {
          operator: query.Operator.GTE,
          value: after,
          field: 'end_date'
        }
      ],
      page: { size: 1, start: 0 }
    })
    return result?.results[0]
  }
}
