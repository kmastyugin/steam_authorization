import express, {Express} from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

import {UserRouter, SteamRouter} from "@routes";
import {errorMiddleware} from "@middlewares";

const http: Express = express();

http.use(cookieParser());
http.use(bodyParser.json());
http.use(bodyParser.urlencoded({ extended: true }));

http.use('/api/user', UserRouter);
http.use('/api/auth/steam', SteamRouter);

http.use(errorMiddleware);

export {http};
