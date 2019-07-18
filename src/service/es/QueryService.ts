import {ProductType} from '../../type/ProductType';
import {ChargeDatum} from '../../type/Datum';

export class QueryService {
  constructor() {
  }

  getProducts(): ProductType[] {
    // return fetch(this.geoLookupUrl + zipcode + '.json')
    //     .then(response => response.json())
    //     .then(station => station.location.nearby_weather_stations.pws.station[0])
    //     .catch(console.error);
    return [
        {name: 'Tesla 1', color: '#9f0405', id: '12345678', model: 'm3', type: 'CAR'},
        {name: 'Tesla 2', color: '#303f9f', id: '36278198', model: 's', type: 'CAR'},
        {name: 'PowerWall 1', color: '#444444', id: '3338272', model: '123', type: 'POWERWALL'}
      ]
  };

  getChargingSessions(productId: string) : ChargeDatum[]{
    return [
      {
        chargingState: 'Charging',
        chargerPower: 5,
        batteryLevel: 76,
        batteryRangeIdeal: 276.79,
        batteryRangeEst: 276.79,
        energyAdded: 21.22,
        rangeAddedIdeal: 86.5,
        rangeAddedEst: 90,
        maxCurrent: 24,
        requestedCurrent: 23,
        actualCurrent: 23,
        timeToFull: 1.17,
        chargeRate: 19.5,
        timestamp: new Date()
      },
      {
        chargingState: 'Charging',
        chargerPower: 5,
        batteryLevel: 78,
        batteryRangeIdeal: 276.79,
        batteryRangeEst: 276.79,
        energyAdded: 21.22,
        rangeAddedIdeal: 86.5,
        rangeAddedEst: 90,
        maxCurrent: 24,
        requestedCurrent: 23,
        actualCurrent: 23,
        timeToFull: 1.17,
        chargeRate: 19.5,
        timestamp: new Date(new Date().valueOf() - 10000)
      },
      {
        chargingState: 'Charging',
        chargerPower: 5,
        batteryLevel: 81,
        batteryRangeIdeal: 276.79,
        batteryRangeEst: 276.79,
        energyAdded: 21.22,
        rangeAddedIdeal: 89.5,
        rangeAddedEst: 92,
        maxCurrent: 24,
        requestedCurrent: 23,
        actualCurrent: 23,
        timeToFull: 1,
        chargeRate: 19.1,
        timestamp: new Date(new Date().valueOf() - 20000)
      }
    ]
  }
}


// const { Client } = require('@elastic/elasticsearch')
// const client = new Client({ node: 'http://localhost:9200' })
//
// // promise API
// const result = await client.search({
//   index: 'my-index',
//   body: { foo: 'bar' }
// })
//
// // callback API
// client.search({
//   index: 'my-index',
//   body: { foo: 'bar' }
// }, (err, result) => {
//   if (err) console.log(err)
// })
//The returned value of every API call is formed as follows:

// {
//   body: object | boolean
//   statusCode: number
//   headers: object
//   warnings: [string]
//   meta: object
// }
