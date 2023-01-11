import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import UserController from './resources/User/user.controller';

const app = new App([new UserController()], Number(3000));

app.listen();
