import {ProductType} from '../../type/ProductType';
import {ChargeDatum} from '../../type/Datum';
import axios from 'axios';

// TODO: get from config
const ENDPOINT = 'http://localhost:3001';


export class QueryService {

  endpoint: string;

  constructor(endpoint: string = ENDPOINT) {
    this.endpoint = endpoint;
  }

  async getProducts(): Promise<ProductType[]> {
    const result = await axios(`${ENDPOINT}/product`);
    return result && result.data;
  };

  async getLastChargingSession(productId: string): Promise<ChargeDatum[]> {
    console.log('getting product: ' + productId);
    const result = await axios(`${ENDPOINT}/product/${productId}/charging?session=latest`);
    return result && result.data;
  };
}

