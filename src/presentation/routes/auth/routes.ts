import { Router } from 'express';
import { AuthController } from './controller';
import { AuthService } from '../../services';
import { AuthMiddleware } from '../../middlewares/auth.middleware';


export class Authroutes {

  static get routes(): Router {
    const router = Router();
    const authService = new AuthService();
    const controller = new AuthController(authService);

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);
    router.get('/', [AuthMiddleware.validateJWT], controller.getUsers);

    return router;
  }
}