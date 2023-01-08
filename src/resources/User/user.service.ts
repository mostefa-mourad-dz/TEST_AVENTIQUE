import User from './user.interface';
import fs from 'fs/promises';

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
}

export default UserService;
