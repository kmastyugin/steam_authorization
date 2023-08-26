require('dotenv').config();
import SteamAuth from "node-steam-openid";

const API_KEY = process.env.STEAM_APIKEY;

const steam = new SteamAuth({
  realm: process.env.DOMEN,
  returnUrl: process.env.DOMEN + "/api/auth/steam/authenticate",
  apiKey: API_KEY,
});

export {steam};