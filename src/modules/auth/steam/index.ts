require('dotenv').config();
import SteamAuth from "node-steam-openid";

const API_KEY = process.env.STEAM_APIKEY;

const steam = new SteamAuth({
  realm: "http://localhost:3000",
  returnUrl: "http://localhost:3000/api/auth/steam/authenticate",
  apiKey: API_KEY,
});

export {steam};