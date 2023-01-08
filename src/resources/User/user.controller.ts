import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './user.validation';
import UserService from './user.service';

class UserController implements Controller {
  public path = '/users';
  public router = Router();

  private UserService = new UserService();
  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, this.getAll);
  }

  private getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const users = await this.UserService.index();
      res.status(200).send({ users });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
