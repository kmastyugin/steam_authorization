import {Request} from "express";
import {IUser} from "@/interfaces/User/IUser";

export interface IAuthRequest extends Request {
  user: IUser;
}