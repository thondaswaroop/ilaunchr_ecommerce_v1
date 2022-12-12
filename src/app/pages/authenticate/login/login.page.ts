import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { StorageService } from 'src/app/providers/storage.service';
import { ToastService } from 'src/app/providers/toast.service';
import { ValidationService } from 'src/app/providers/validation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  appTitle = environment.appTitle;
  account: any = {
    'username': '',
    'password': ''
  };

  sessionID = environment.appLoginSessionID;
  preferColorTheme: any = '';

  constructor(public navigate: NavigationService, public validation: ValidationService, public toast: ToastService, public api: ApiService, public storage: StorageService, public load: LoaderService) { }

  ngOnInit() {
  }

  pageRedirection(page: any) {
    this.navigate.navigateForward(page);
  }

  doLogin() {
    this.load.loadStart();
    if (this.validation.checkEmptyValue(this.account.username)) {
      this.toast.errortoast('Login_Username');
      this.load.loadStop();
    }
    else if (this.validation.checkEmptyValue(this.account.password)) {
      this.toast.errortoast('Login_Password');
      this.load.loadStop();
    }
    else {
      this.api.post('login', this.account).subscribe((response: any) => {
        if (response.status == 'true') {
          this.storage.set(this.sessionID, response.userid);
          this.load.loadStop();
          this.toast.successtoast(response.message);
          this.navigate.navigateasMain('home');
        }
        else {
          this.load.loadStop();
          this.toast.errortoast(response.message);
        }
      });
    }
  }

}
