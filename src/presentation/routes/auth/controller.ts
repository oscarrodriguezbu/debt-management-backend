import { Request, Response } from 'express';
import { CustomError, LoginUserDto, RegisterUserDto } from '../../domain';
import { AuthService } from '../../services/auth.service';


export class AuthController {
  constructor(
    public readonly authService: AuthService,
  ) { }

  registerUser = (req: Request, res: Response) => {
    const [error, registerDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error })

    this.authService.registerUser(registerDto!)
      .then((user) => res.json(user))
      .catch(error => CustomError.handleError(error, res));
  }

  loginUser = (req: Request, res: Response) => {
    const [error, loginUserDto] = LoginUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.authService.loginUser(loginUserDto!)
      .then((user) => res.json(user))
      .catch(error => CustomError.handleError(error, res));
  }

  getUsers = (req: any, res: Response) => {
    const user = req.user;

    this.authService.getAll(user)
      .then((user) => res.json(user))
      .catch(error => CustomError.handleError(error, res))
  }

  checkAuthStatus = (req: any, res: Response) => {
    const user = req.user;

    this.authService.checkAuthStatus(user)
      .then((user) => res.json(user))
      .catch(error => CustomError.handleError(error, res))
  }

}