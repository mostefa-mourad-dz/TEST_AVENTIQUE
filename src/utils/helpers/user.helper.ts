import User from '../../resources/User/user.interface';
import { ageCalculator } from './age.helper';

export const formatUsers = (users: User[]) => {
  return users.map((user: User) => {
    return {
      fullName: user.first_name + ' ' + user.last_name,
      email: user.email,
      age: ageCalculator(user.birthday),
    };
  });
};
