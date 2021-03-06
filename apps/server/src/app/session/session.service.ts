import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { VehicleActivityType, VehicleStateType, VehicleType } from '@tesla-dashboard/schemas';

import { ProductService } from '../product/product.service';
import { ActivityType } from '@tesla-dashboard/types';
import { decodePredicates, flattenVehicleData, Operator, QueryResult, QuerySet } from '@tesla-dashboard/util';
import { VehicleData } from '@tesla-dashboard/tesla-types';

@Injectable()
export class SessionService {
  constructor(
    @InjectModel('VehicleActivity')
    private readonly vehicleSessionModel: Model<VehicleActivityType>,
    @InjectModel('VehicleState')
    private readonly vehicleStateModel: Model<VehicleStateType>,
    @Inject(forwardRef(() => ProductService))
    private readonly productService: ProductService
  ) {}

  async getSessionDetails(username: string, id: string) {
    const activity = await this.vehicleSessionModel.findById(id);
    return this.vehicleStateModel.find({ vehicleActivity: activity }).sort({ timestamp: 1 });
  }

  async deleteSession(username: string, id: string) {
    const deleteCount = await this.vehicleSessionModel.deleteOne({ _id: id });
    if (deleteCount.deletedCount) {
      // @ts-ignore  // not sure why it wants the entire object instead of partial, TODO: investigate
      const deleteItemCount = await this.vehicleStateModel.deleteMany({
        vehicleActivity: { _id: id },
      });
      if (deleteItemCount.deletedCount) {
        return (deleteCount.deletedCount || 0) + (deleteItemCount.deletedCount || 0);
      }
    }
    return 0;
  }

  async addTag(username: string, sessionId: string, tag: string) {
    const conditions = { _id: sessionId };
    const vehicleSession = await this.vehicleSessionModel.findOne(conditions);
    if (vehicleSession && !vehicleSession.tags.includes(tag)) {
      vehicleSession.tags = [...vehicleSession.tags, tag];
      const result = await this.vehicleSessionModel.updateOne(conditions, vehicleSession);
      return result.nModified ? vehicleSession.tags : [];
    }
  }

  async removeTag(username: string, sessionId: string, tag: string) {
    const conditions = { _id: sessionId };
    const vehicleSession = await this.vehicleSessionModel.findOne(conditions);
    if (vehicleSession && vehicleSession.tags.includes(tag)) {
      vehicleSession.tags.splice(vehicleSession.tags.indexOf(tag), 1);
      const result = await this.vehicleSessionModel.updateOne(conditions, vehicleSession);
      return result.tags;
    }
  }

  async findActivities(username: string, query: QuerySet): Promise<QueryResult> {
    const vehicleId = query.predicates.find((p) => p.field === 'vehicle')?.value;
    if (!vehicleId) {
      throw Error('vehicle/product required in session predicate');
    }
    //    const tags = query.predicates.filter((p) => p.field === 'tags')
    //TODO: handle other predicates here!
    const skipPredicates = new Set(['vehicle']);
    const restPredicates = decodePredicates(query.predicates.filter((p) => !skipPredicates.has(p.field)));
    const skip = query.page.start;
    // set up criteria for count and query
    const criteria = {
      vehicle: { _id: vehicleId, username },
      // tags: tags.map((p) => p.value), // TODO: enable query by arrays in query predicates
      ...restPredicates,
    };

    console.log(JSON.stringify(criteria));

    // get a total count for pagination info
    const countQuery = this.vehicleSessionModel.countDocuments();
    // @ts-ignore
    countQuery.setQuery(criteria);
    const count = await countQuery.exec();

    // do query with same criteria as count
    const mongooseQuery = this.vehicleSessionModel.find();
    // @ts-ignore
    mongooseQuery.setQuery(criteria);
    mongooseQuery.populate(['first', 'last']);
    mongooseQuery.skip(query.page.start).limit(query.page.size);
    if (query.sort) {
      const { field, desc } = query.sort[0];
      mongooseQuery.sort(`${desc ? '-' : ''}${field}`);
    }
    const result = await mongooseQuery.exec();

    return {
      page: { size: result.length, start: skip, total: count },
      results: result,
    };
  }

  async createNewActivity(vehicle: VehicleType, activity: ActivityType, vehicleData: VehicleData) {
    const vehicleState = await this.vehicleStateModel.create(flattenVehicleData(vehicleData));
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
      trip_charging,
    } = vehicleState;

    const session = {
      vehicle,
      activity,
      first: vehicleState,
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
      end_date: vehicleData.vehicle_state.timestamp,
      latitude: vehicleData.drive_state.latitude,
      longitude: vehicleData.drive_state.longitude,
    };
    const newActivity = await this.vehicleSessionModel.create(session);
    vehicleState.vehicleActivity = newActivity;
    await this.vehicleStateModel.updateOne({ _id: vehicleState._id }, vehicleState);
    return newActivity;
  }

  async findTags(username: string, productId: string) {
    const query = this.vehicleSessionModel.find();
    query.setQuery({
      // @ts-ignore
      vehicle: { _id: productId },
      tags: { $exists: true, $not: { $size: 0 } },
    });
    const results = await query.exec();
    return results.reduce((acc, cur) => {
      cur.tags.forEach((tag) => {
        if (tag.length && !acc.includes(tag)) {
          acc.push(tag);
        }
      });
      return acc;
    }, [] as string[]);
  }

  async appendVehicleState(
    vehicleActivity: VehicleActivityType,
    vehicleData: VehicleData
  ): Promise<VehicleActivityType> {
    const vehicleState = flattenVehicleData(vehicleData);
    vehicleState.vehicleActivity = vehicleActivity;
    vehicleActivity.last = await this.vehicleStateModel.create(vehicleState);
    vehicleActivity.end_date = vehicleState.timestamp;
    vehicleActivity.duration_seconds = (vehicleActivity.end_date - vehicleActivity.start_date) / 1000;
    vehicleActivity.distance = vehicleState.odometer - vehicleActivity.first.odometer;

    // TODO: any other data aggregation for this activity

    return this.vehicleSessionModel.updateOne({ _id: vehicleActivity._id }, vehicleActivity);
  }

  async findCurrentActivity(product: VehicleType, vehicleStatus: ActivityType, after: number) {
    const result = await this.findActivities(product.username, {
      predicates: [
        { operator: Operator.EQ, value: product._id, field: 'vehicle' },
        { operator: Operator.EQ, value: vehicleStatus, field: 'activity' },
        {
          operator: Operator.GTE,
          value: after,
          field: 'end_date',
        },
      ],
      page: { size: 1, start: 0 },
      sort: [{ field: 'end_date', desc: true }],
    });
    return result?.results[0];
  }
}
