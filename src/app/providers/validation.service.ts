import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  checkEmptyValue(value: string) {

    if (value == null || value == 'null' || value == '' || value == undefined || value == 'undefined') {
      return true;
    }
    else {
      return false;
    }
  }

  comparePassword(password: string, confirmpassword: string) {
    if (password != confirmpassword) {
      return true;
    }
    else {
      return false;
    }
  }

  checkValidEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !re.test(email);
  }

}
