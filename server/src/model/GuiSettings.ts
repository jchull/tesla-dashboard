import {Document, Schema} from 'mongoose';
import {GuiSettings} from './types/tesla/GuiSettings';


export const GuiSettingsSchema = new Schema({
  vehicle: {type: Schema.Types.ObjectId, ref: 'Vehicle'},
  gui_24_hour_time: {type: Boolean},
  gui_charge_rate_units: {type: String},
  gui_distance_units: {type: String},
  gui_range_display: {type: String},
  gui_temperature_units: {type: String},
  show_range_units: {type: Boolean},
  timestamp: {type: Number}

});

export type GuiSettingsType = GuiSettings & Document;

