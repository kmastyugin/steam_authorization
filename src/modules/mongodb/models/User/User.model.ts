import {model, Schema} from "mongoose";

export const UserModel = model('User', new Schema({
  steamid: {
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  profile: {
    required: true,
    type: String,
  },
  avatar: {
    small: {
      required: true,
      type: String,
    },
    medium: {
      required: true,
      type: String,
    },
    large: {
      required: true,
      type: String,
    },
  },
  balance: {
    type: Number,
    default: 0,
  },
}));