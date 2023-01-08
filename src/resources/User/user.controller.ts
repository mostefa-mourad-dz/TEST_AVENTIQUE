import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import UserService from './user.service';
import { formatSingleUser, formatUsers } from '../../utils/helpers/user.helper';

class UserController implements Controller {
  public path = '/users';
  public router = Router();

  private UserService = new UserService();
  constructor() {
    this.initialiseRoutes();
  }
  private initialiseRoutes(): void {
    this.router.get(`${this.path}`, this.getAll);
    this.router.get(`${this.path}/:Id`, this.getUserById);
  }

  private getAll = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const users = await this.UserService.index();
      res.status(200).send({
        users: formatUsers(users),
      });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const user = await this.UserService.getUserById(parseInt(req.params.Id));
      if (user) {
        res.status(200).send({
          user: formatSingleUser(user),
        });
      } else {
        next(new HttpException(404, 'User not found'));
      }
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };
}

export default UserController;
