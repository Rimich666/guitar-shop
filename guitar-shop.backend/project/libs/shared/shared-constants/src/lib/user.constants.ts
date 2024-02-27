export const SALT_ROUNDS = 10;

export const UserExceptionMessage = {
  UserExists: 'User with this email-address already exists',
  UserNotFound: 'User not found',
  UserPasswordWrong: 'User login or password is wrong'
} as const;
