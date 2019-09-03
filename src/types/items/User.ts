// TODO: extract mutual types to separate repo as duplication/not synced with kube-ts-server
import BaseItem, { NullableDate } from './BaseItem';

export enum GenderType {
  female = 'female',
  male = 'male',
}

export default interface User extends BaseItem {
  readonly email: string;
  readonly password: string;
  readonly firstName?: string;
  readonly lastName?: string;
  readonly bio?: string;
  readonly avatar?: string;
  readonly dateOfBirth?: NullableDate;
  readonly gender?: GenderType;
  readonly deletedAt?: NullableDate;
  readonly loginFailedAttempts?: number;
  readonly loginLastAttemptAt?: NullableDate;
  readonly loginLockoutExpiresAt?: NullableDate;
  readonly verifyToken?: string;
  readonly verifiedAt?: NullableDate;
  readonly verifyAttempts?: number;
  readonly verifyLastAttemptAt?: NullableDate;
  readonly verifyLockoutExpiresAt?: NullableDate;
}
