import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/register/artist', AuthController.registerArtist);
authRouter.post('/register/guest', AuthController.registerGuest);
authRouter.post('/login', AuthController.login);
authRouter.post('/logout', AuthController.logout);
authRouter.get('/me', AuthController.getCurrentUser);

export default authRouter;