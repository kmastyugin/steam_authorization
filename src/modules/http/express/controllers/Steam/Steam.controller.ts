require('dotenv').config();
import {NextFunction, Request, Response} from "express";
import {steam} from "@modules";
import {AuthService, TokenService} from "@services";

class SteamController {
  // redirect steam
  async steamRedirect(req: Request, res: Response) {
    try {
      const redirectUrl = await steam.getRedirectUrl();
      return res.redirect(redirectUrl);
    } catch(e) {
      res.status(500).json(e);
    }
  }

  // авторизация
  async auth(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = await steam.authenticate(req);

      const userTokens = await AuthService.auth(userData);
      await TokenService.saveToken(userTokens.refreshToken, userTokens.user._id);

      res.cookie('jwt', userTokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });

      res.redirect(301, `/api/user/test?token=${userTokens.accessToken}`);
    } catch (e) {
      next(e);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const {jwt: refreshToken} = req.cookies;
      const token = await AuthService.logout(refreshToken);

      res.clearCookie('jwt');

      res.redirect(301, "/api/user/test");
      // return res.json(token);
    } catch(e) {
      next(e);
    }
  }

  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const {jwt: refreshToken} = req.cookies;
      const userTokens = await AuthService.refresh(refreshToken);

      await TokenService.saveToken(userTokens.refreshToken, userTokens.user._id);

      res.cookie('jwt', userTokens.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: true,
      });

      res.json(userTokens);
    } catch(e) {
      throw next(e);
    }
  }
}

export default new SteamController();