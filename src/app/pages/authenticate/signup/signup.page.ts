import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { ToastService } from 'src/app/providers/toast.service';
import { ValidationService } from 'src/app/providers/validation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  appTitle = environment.appTitle;
  account: any = {
    'username': '',
    'email': '',
    'phone': '',
    'password': '',
    'confirmpassword': ''
  };

  constructor(public navigate: NavigationService, public validation: ValidationService, public toast: ToastService, public api: ApiService, public load: LoaderService) { }

  ngOnInit() {
  }

  pageRedirection(page: any) {
    this.navigate.navigateForward(page);
  }

  doSignup() {
    this.load.loadStart();
    if (this.validation.checkEmptyValue(this.account.username)) {
      this.load.loadStop();
      this.toast.errortoast('Signup_Username');
    }
    else if (this.validation.checkEmptyValue(this.account.email)) {
      this.load.loadStop();
      this.toast.errortoast('Signup_Email');
    }
    else if (this.validation.checkValidEmail(this.account.email)) {
      this.load.loadStop();
      this.toast.errortoast('Invalid_Email');
    }
    else if (this.validation.checkEmptyValue(this.account.phone)) {
      this.load.loadStop();
      this.toast.errortoast('Signup_Phone');
    }
    else if (this.validation.checkEmptyValue(this.account.password)) {
      this.load.loadStop();
      this.toast.errortoast('Signup_Password');
    }
    else if (this.validation.checkEmptyValue(this.account.confirmpassword)) {
      this.load.loadStop();
      this.toast.errortoast('Signup_Confirm_Password');
    }
    else if (this.validation.comparePassword(this.account.password, this.account.confirmpassword)) {
      this.load.loadStop();
      this.toast.errortoast('Missmatch_Password');
    }
    else {
      this.api.post('signup', this.account).subscribe((response: any) => {
        this.load.loadStop();
        if (response.status == 'true') {
          this.toast.successtoast(response.message);
          this.navigate.navigateasMain('login');
        }
        else {
          this.toast.errortoast(response.message);
        }
      });
    }
  }

}
