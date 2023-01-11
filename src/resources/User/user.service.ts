import User from './user.interface';
import brcypt from 'bcrypt';
import { birthDayCalculator } from '../../utils/helpers/age.helper';
import {
  readAllObjects,
  writeAllObjects,
} from '../../utils/helpers/files.helper';

class UserService {
  private db_name = 'users';
  // get all users
  public async index(): Promise<User[]> {
    try {
      // Read all users using the files utility and than convert them
      const users: User[] = await readAllObjects(this.db_name);
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // get user by id
  public async getUserById(Id: number): Promise<User | null> {
    try {
      // Read all users using the files utility and than convert them
      const users: User[] = await readAllObjects(this.db_name);
      const user = users.find((user: User) => user.id === Id);
      // If user does not exist
      if (!user) {
        throw new Error();
      }
      // else if user exists
      return user;
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
      // Read all users using the files utility and than convert them
      const users: User[] = await readAllObjects(this.db_name);
      // find whther or not the email already exists in the database
      const user = users.find((user: User) => user.email === email);
      if (user) {
        // If email address aleady taken
        throw new Error('User already exists');
      } else {
        // If email address available create object
        const hash = await brcypt.hash(password, 10);
        users.push({
          id: users.length + 1,
          email: email,
          first_name: first_name,
          last_name: last_name,
          birthday: birthDayCalculator(age),
          password: hash,
        });
        // Write data using the file utility
        const result = await writeAllObjects(this.db_name, users);
        if (result) {
          return 'User created successfuly';
        }
        // In case something went wrong during the writing process
        throw new Error('Something went wrong');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // update user by Id
  public async update(
    id: number,
    email: string,
    password: string,
    first_name: string,
    last_name: string,
    age: number,
  ): Promise<string | Error> {
    try {
      // Read all users using the files utility and than convert them
      const users: User[] = await readAllObjects(this.db_name);
      // Check whether user exists
      const user = users.find((user: User) => user.id === id);
      // Check whether new email address exists
      const email_check = users.find((user: User) => user.email === email);
      const hash = await brcypt.hash(password, 10);
      if (user) {
        // check if the email address belongs to the same user
        if (user.email === email || !email_check) {
          // Create object
          const index = users.findIndex((user: User) => user.id === id);
          users[index] = {
            id: id,
            email: email,
            password: hash,
            first_name: first_name,
            last_name: last_name,
            birthday: birthDayCalculator(age),
          };
          // Write data using the file utility
          const result = await writeAllObjects(this.db_name, users);
          if (result) {
            return 'User created successfuly';
          }
          // In case something went wrong during the writing process
          throw new Error('Something went wrong');
        } else {
          // if new email address taken by another user
          throw new Error('Email must be unique');
        }
      } else {
        throw new Error('User not found');
      }
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // delete user by id
  public async deleteUserById(Id: number): Promise<string | Error> {
    try {
      // Read all users using the files utility and than convert them
      const users: User[] = await readAllObjects(this.db_name);
      // Find User By Id
      const user = users.find((user: User) => user.id === Id);
      if (!user) {
        // If User does not exist
        throw new Error('User not found');
      }
      // Find The Index of the user object
      const index = users.findIndex((user: User) => user.id === Id);
      // remove the user from the array
      const new_users = users.splice(index, 1);
      // Write data using the file utility
      const result = await writeAllObjects(this.db_name, new_users);
      if (result) {
        return 'User deleted successfully';
      }
      // In case something went wrong during the writing process
      throw new Error('Something went wrong');
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
