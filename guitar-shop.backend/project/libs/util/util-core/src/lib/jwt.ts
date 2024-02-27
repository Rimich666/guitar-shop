import {TokenPayload, UserType} from '@project/shared-types';

export function createJWTPayload(user: UserType): TokenPayload {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}
