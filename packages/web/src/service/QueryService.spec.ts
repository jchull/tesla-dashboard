import { QueryService } from './QueryService';
import axios from 'axios';

it('should initialize service', () => {
  const service = new QueryService(axios);
  expect(service).toBeDefined();
});
