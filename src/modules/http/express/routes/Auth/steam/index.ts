import {Router} from "express";
const router = Router();

import {SteamController} from "@controllers";

// redirect route
router.get('/', SteamController.steamRedirect);
// authenticate route
router.get('/authenticate', SteamController.auth);
// logout route
router.post('/logout', SteamController.logout);
// refresh token
router.get('/refresh', SteamController.refresh);

export default router;