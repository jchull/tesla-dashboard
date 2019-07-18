export class QueryService {
  constructor() {
  }

  getProducts() {
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
