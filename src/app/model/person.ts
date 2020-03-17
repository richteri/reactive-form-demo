import { Account } from './account';
import { Address } from './address';

export class Person {
  id: string;
  name: string;
  account: Account;
  addresses: Address[];
}
