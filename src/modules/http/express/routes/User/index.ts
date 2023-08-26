import {Router} from "express";
const router = Router();

import {UserController} from "@controllers";
import {authMiddleware} from "@middlewares";

router.post('/', UserController.post);
router.get('/', authMiddleware, UserController.get);
router.get('/test', UserController.test);
router.get('/:id', UserController.getById);
router.put('/', UserController.put);
router.delete('/', UserController.delete);

export default router;