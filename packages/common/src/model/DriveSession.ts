import { Document, Schema } from "mongoose";
import { DriveState } from "./DriveState";
import { Vehicle } from "./types/tesla/Vehicle";

export interface DriveSession {
  _id: string;
  id_s: string;
  start_date: number;
  end_date?: number;
  archived: boolean;
  tags: string[];
  distance?: number; // end of trip
  first: DriveState;
  last?: DriveState;
  vehicle?: Vehicle;
}

export const DriveSessionSchema = new Schema({
  start_date: { type: Number, required: true },
  end_date: { type: Number, required: true },
  archived: { type: Boolean },
  distance: { type: Number },
  tags: { type: [String] },
  first: { type: Schema.Types.ObjectId, ref: "DriveState" },
  last: { type: Schema.Types.ObjectId, ref: "DriveState" },
  vehicle: { type: Schema.Types.ObjectId, ref: "Vehicle" }
});

export type DriveSessionType = DriveSession & Document;
