export interface IUser {
  _id?: string;
  token?: string;
  balance?: {
    type: number;
    default: 0;
  },
  steamid: string;
  username: string;
  profile: string;
  avatar: {
    small: string;
    medium: string;
    large: string;
  },
}
