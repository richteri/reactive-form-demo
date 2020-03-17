import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Person } from './model/person';
import { AddressType } from './model/address-type';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  byId(id: string): Observable<Person> {
    return of({
      id: 'abc',
      name: 'István Richter',
      account: {
        id: 'bcd',
        username: 'irichter',
        password: 'test',
        expiry: new Date('2020-03-31'),
        loginFailure: 3
      },
      addresses: [
        {
          id: 'cde',
          type: AddressType.HOME,
          zip: 8230,
          city: 'Balatonfüred',
          country: 'Hungary',
          line1: 'Fo utca 1',
          line2: 'IV. em. 1.'
        },
        {
          id: 'efg',
          type: AddressType.MAIL,
          zip: 8230,
          city: 'Balatonfüred',
          country: 'Hungary',
          line1: 'Pf. 123',
          line2: ''
        }
      ]
    });
  }
}
