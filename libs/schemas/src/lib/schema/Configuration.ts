import { Document, Schema } from 'mongoose';
import { Configuration } from '@tesla-dashboard/types';

export type ConfigurationType = Configuration & Document;

export const ConfigurationSchema = new Schema<ConfigurationType>({
  apiPort: { type: Number, required: true, unique: false },
  ownerBaseUrl: { type: String, required: true, unique: false },
  teslaClientKey: { type: String, required: true, unique: false },
  teslaClientSecret: { type: String, required: true, unique: false },
});

export const DEFAULT_CONFIG = {
  apiPort: 7101,
  ownerBaseUrl: 'https://owner-api.teslamotors.com',
  teslaClientKey: '81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384',
  teslaClientSecret: 'c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3',
};
