import { forwardRef, Inject, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { query, schema, tesla } from '@teslapp/common'
import { ProductService } from '../product/product.service'

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
    // TODO: limit access by username
    const vehicleStates = await this.vehicleStateModel
                                    .find({ vehicleSession: id })
                                    .sort({ timestamp: 1 })

  }

  async deleteSession(username: string, id: string) {
    // TODO: limit access by username matching
    const deleteCount = await this.vehicleStateModel.deleteOne({ _id: id })
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


  async createNewSession(vehicleData: tesla.VehicleData) {
    // TODO
    const session = {
      activity: ''
    }
    return this.vehicleSessionModel.create(session)
  }

  async findTags(username:string, productId: string){
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


}
