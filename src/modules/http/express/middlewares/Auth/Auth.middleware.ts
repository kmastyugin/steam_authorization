import {NextFunction, Request, RequestHandler, Response} from "express";
import {ApiError} from "@exceptions";
import {TokenService} from "@services";
import {IAuthRequest} from "./IAuthRequest";

export const authMiddleware: RequestHandler = (req: IAuthRequest, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if(!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(' ')[1];

    if(!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = TokenService.validateAccessToken(accessToken);

    if(!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();

  } catch(e) {
    return next(ApiError.UnauthorizedError());
  }
}