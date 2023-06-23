import { IUser } from './general.model';
import {
  randEmail,
  randFirstName,
  randPassword,
  randUuid,
} from '@ngneat/falso';

export const generateOneUser = (): IUser => {
  return {
    id: randUuid(),
    email: randEmail(),
    password: randPassword(),
    name: randFirstName(),
    role: 'customer',
  };
};
