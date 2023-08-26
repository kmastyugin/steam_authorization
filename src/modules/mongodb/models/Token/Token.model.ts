import {model, Schema} from "mongoose";

export const TokenModel = model('Token', new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
}));