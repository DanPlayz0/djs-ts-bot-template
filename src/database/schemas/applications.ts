import { Schema, model } from "mongoose";

const ApplicationSchema = new Schema({
  user: { type: String, },
  languages: { type: String, },
  experience: { type: String, },
  reason: { type: String, },
  type: { type: String, },
  status: { type: String, },
  createdAt: { type: Date, },
  updatedAt: { type: Date, },
  acceptedAt: { type: Date, },
  deniedAt: { type: Date, },
  message: {
    guild: {type: String },
    channel: {type: String },
    message: {type: String }
  }
});

const Applications = model('applications', ApplicationSchema);
export default Applications;