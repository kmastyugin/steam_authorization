
require('dotenv').config();
import {UserService, TokenService} from "@services";
import {ApiError} from "@exceptions";
import {ISteamUser} from "@/interfaces/User/ISteamUser";

class AuthService {
  async auth(userData: ISteamUser) {
    const userDataDTO = {
      steamid: userData.steamid,
      username: userData.username,
      profile: userData.profile,
      avatar: {
        small: userData.avatar.small,
        medium: userData.avatar.medium,
        large: userData.avatar.large,
      },
    };

    const userCreated = await UserService.createOrUpdate(userDataDTO);
    return TokenService.generateTokens(userDataDTO, userCreated._id);
  }
  async logout(refreshToken: string) {
    return await TokenService.removeToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    if(!refreshToken) {
      throw ApiError.UnauthorizedError();
    }

    let userData = TokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await TokenService.findToken(refreshToken);

    if(!tokenFromDB || !userData) {
      throw ApiError.UnauthorizedError();
    }

    userData = await UserService.readById(userData._id);

    const userDataDTO = {
      steamid: userData.steamid,
      username: userData.username,
      profile: userData.profile,
      avatar: {
        small: userData.avatar.small,
        medium: userData.avatar.medium,
        large: userData.avatar.large,
      },
    };

    const userCreated = await UserService.createOrUpdate(userDataDTO);
    return TokenService.generateTokens(userDataDTO, userCreated._id);
  }
}

export default new AuthService();