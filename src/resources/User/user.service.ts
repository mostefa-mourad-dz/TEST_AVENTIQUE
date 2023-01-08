import User from './user.interface';
import fs from 'fs/promises';
import brcypt from 'bcrypt';
import { birthDayCalculator } from '../../utils/helpers/age.helper';
import HttpException from '../../utils/exceptions/http.exception';

class UserService {
  private link = './src/db/db.json';
  // get all users
  public async index(): Promise<User[]> {
    try {
      const data = await fs.readFile(this.link, 'utf-8');
      const { users }: { users: User[] } = JSON.parse(data);
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // get user by id
  public async getUserById(Id: number): Promise<User | null> {
    try {
      const data = await fs.readFile(this.link, 'utf-8');
      const { users }: { users: User[] } = JSON.parse(data);
      const user = users.find((user: User) => user.id === Id);
      return user ? user : null;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // store user
  public async store(
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    age: number,
  ): Promise<string | Error> {
    try {
      const data = await fs.readFile(this.link, 'utf-8');
      const { users }: { users: User[] } = JSON.parse(data);
      const user = users.find((user: User) => user.email === email);
      if (user) {
        throw new Error('User already exists');
      } else {
        const hash = await brcypt.hash(password, 10);
        users.push({
          id: users.length + 1,
          email: email,
          first_name: first_name,
          last_name: last_name,
          birthday: birthDayCalculator(age),
          password: hash,
        });
        const converted = JSON.stringify({ users: users });
        const result = await fs.writeFile(this.link, converted);
        console.log(result);
        return 'User created successfuly';
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // update user
  public async update(
    id: number,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    age: number,
  ): Promise<string | Error> {
    try {
      const data = await fs.readFile(this.link, 'utf-8');
      const { users }: { users: User[] } = JSON.parse(data);
      const user = users.find((user: User) => user.id === id);
      const email_check = users.find((user: User) => user.email === email);
      const hash = await brcypt.hash(password, 10);
      if (user) {
        if (user.email === email || !email_check) {
          const index = users.findIndex((user: User) => user.id === id);
          users[index] = {
            id: id,
            email: email,
            password: hash,
            first_name: first_name,
            last_name: last_name,
            birthday: birthDayCalculator(age),
          };
          const converted = JSON.stringify({ users: users });
          const result = await fs.writeFile(this.link, converted);
          console.log(result);
          return 'User updated successfuly';
        } else {
          throw new Error('Email must be unique');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
