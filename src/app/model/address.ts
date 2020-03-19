import { AddressType } from './address-type';

export class Address {
  id: string;
  type: AddressType;
  zip: string;
  city: string;
  country: string;
  line1: string;
  line2: string;
}
