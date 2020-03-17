import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { PersonService } from '../person.service';
import { Address } from '../model/address';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.scss']
})
export class PersonEditComponent implements OnInit {

  personForm: FormGroup = this.initPersonForm();

  get addresses() {
    return this.personForm.get('addresses') as FormArray;
  }

  constructor(
    private personService: PersonService
  ) {
  }

  ngOnInit(): void {
    this.personService.byId('abc')
      .subscribe(({ addresses, ...rest }) => {
        this.personForm.setValue({ ...rest, addresses: [] });
        addresses.forEach(address => this.addresses.push(this.initAddressForm(address)));
      });
  }

  initPersonForm(): FormGroup {
    return new FormGroup({
      id: new FormControl(''),
      name: new FormControl(''),
      // One-To-One
      account: new FormGroup({
        id: new FormControl(''),
        username: new FormControl(''),
        password: new FormControl(''),
        expiry: new FormControl(new Date()),
        loginFailure: new FormControl(0)
      }),
      // One-To-Many
      addresses: new FormArray([])
    });
  }

  initAddressForm(address: Address = new Address()): FormGroup {
    return new FormGroup({
      id: new FormControl(address.id),
      type: new FormControl(address.type),
      zip: new FormControl(address.zip),
      city: new FormControl(address.city),
      country: new FormControl(address.country),
      line1: new FormControl(address.line1),
      line2: new FormControl(address.line2)
    });
  }

  addAddress() {
    this.addresses.push(this.initAddressForm());
  }

  removeAddress(i: number) {
    this.addresses.removeAt(i);
  }

  submit() {
    console.log(this.personForm.value);
  }
}
