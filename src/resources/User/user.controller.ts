import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../../utils/interfaces/controller.interface';
import HttpException from '../../utils/exceptions/http.exception';
import UserService from './user.service';
import { formatSingleUser, formatUsers } from '../../utils/helpers/user.helper';
import validationMiddleware from '../../middleware/validation.middleware';
import validate from './user.validation';

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
    this.router.post(
      `${this.path}`,
      validationMiddleware(validate.createUser),
      this.store,
    );
    this.router.put(
      `${this.path}/:Id`,
      validationMiddleware(validate.createUser),
      this.update,
    );
    this.router.delete(`${this.path}/:Id`, this.deleteUserById);
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
      }
    } catch (error: any) {
      next(
        new HttpException(
          error.message === 'User not found' ? 404 : 400,
          error.message,
        ),
      );
    }
  };

  private store = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { email, password, first_name, last_name, age } = req.body;
      const response = await this.UserService.store(
        email,
        password,
        first_name,
        last_name,
        age,
      );
      res.status(201).json({ response });
    } catch (error: any) {
      next(new HttpException(400, error.message));
    }
  };

  private update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { email, password, first_name, last_name, age } = req.body;
      const response = await this.UserService.update(
        parseInt(req.params.Id),
        email,
        password,
        first_name,
        last_name,
        age,
      );
      res.status(200).json({ response });
    } catch (error: any) {
      console.log(error);
      next(
        new HttpException(
          error.message === 'User not found' ? 404 : 400,
          error.message,
        ),
      );
    }
  };

  private deleteUserById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const response = await this.UserService.deleteUserById(
        parseInt(req.params.Id),
      );
      res.status(200).send({
        response,
      });
    } catch (error: any) {
      next(
        new HttpException(
          error.message === 'User not found' ? 404 : 400,
          error.message,
        ),
      );
    }
  };
}

export default UserController;
