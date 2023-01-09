import User from '../resources/User/user.interface';
import { formatSingleUser, formatUsers } from '../utils/helpers/user.helper';

const users: User[] = [
  {
    id: 1,
    first_name: 'Sebastian',
    last_name: 'Eschweiler',
    email: 'sebastian@aventique.com',
    birthday: '1999-07-13',
    password: 'password',
  },
  {
    id: 2,
    first_name: 'Steve',
    last_name: 'Palmer',
    email: 'steve@aventique.com',
    birthday: '1998-07-13',
    password: 'password',
  },
  {
    id: 3,
    first_name: 'Ann',
    last_name: 'Smith',
    email: 'ann@aventique.com',
    birthday: '1997-07-13',
    password: 'password',
  },
];

const converted_users = [
  {
    id: 1,
    full_name: 'Sebastian Eschweiler',
    email: 'sebastian@aventique.com',
    age: 23,
  },
  {
    id: 2,
    full_name: 'Steve Palmer',
    email: 'steve@aventique.com',
    age: 24,
  },
  {
    id: 3,
    full_name: 'Ann Smith',
    email: 'ann@aventique.com',
    age: 25,
  },
];

describe('user_helper_test', () => {
  test('single_user_formatter', async () => {
    expect(formatSingleUser(users[0])).toEqual(converted_users[0]);
  });

  test('multiple_users_formatter', async () => {
    expect(formatUsers(users)).toEqual(converted_users);
  });
});
