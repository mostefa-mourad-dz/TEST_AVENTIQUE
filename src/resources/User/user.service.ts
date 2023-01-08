import User from './user.interface';
import fs from 'fs/promises';

class UserService {
  // get all courses
  public async index(): Promise<User[]> {
    const link = './src/db/db.json';
    try {
      const data = await fs.readFile(link, 'utf-8');
      const { users }: { users: User[] } = JSON.parse(data);
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export default UserService;
