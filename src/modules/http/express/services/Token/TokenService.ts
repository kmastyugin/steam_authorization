import {IUser} from "@/interfaces/User/IUser";

require('dotenv').config();
import jwt from "jsonwebtoken";
import {TokenModel} from "@models";

class TokenService {
  generateTokens(user: IUser, userId: string) {
    const accessToken = jwt.sign({...user, _id: userId}, process.env.JWT_ACCESS_SECRET, { expiresIn: "24h", });
    const refreshToken = jwt.sign({...user, _id: userId}, process.env.JWT_REFRESH_SECRET, { expiresIn: "30d", });

    return {
      accessToken,
      refreshToken,
      user: {
        ...user,
        _id: userId,
      }
    }
  }

  async saveToken(refreshToken: string, userId: string) {
    const tokenData = await TokenModel.findOne({ user: userId });

    if(tokenData) {
      tokenData.refreshToken = refreshToken;
      return await tokenData.save();
    }

    return await TokenModel.create({ user: userId, refreshToken });
  }

  async removeToken(refreshToken: string) {
    console.log(refreshToken);
    return await TokenModel.deleteOne({refreshToken});
  }

  validateAccessToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    } catch(e) {
      return null;
    }
  }

  validateRefreshToken(token: string) {
    try {
      return jwt.verify(token, process.env.JWT_REFRESH_SECRET);
    } catch(e) {
      return null;
    }
  }

  async findToken(refreshToken: string) {
    return await TokenModel.findOne({refreshToken});
  }
}

export default new TokenService();