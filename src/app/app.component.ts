
import { Component } from '@angular/core';
import { MenuController, Platform, NavController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Network } from '@awesome-cordova-plugins/network/ngx';
import { Router, RouterEvent, NavigationStart } from '@angular/router';
import { LanguageService } from './providers/language.service';
import { StorageService } from './providers/storage.service';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { ToastService } from './providers/toast.service';
import { AlertService } from './providers/alert.service';
import { ApiService } from './providers/api/api.service';
import { ThemeService } from './providers/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  ing: any = 'ltr'; // Language based direction can be listed by this variable
  defaultColor: any = ''; // Default color to be selected variable
  ing_star: any = 'start'; // Language based direction of menu can be listed by this variable
  mainusername: any = ''; //Main username at side navigation
  noMenuPages: any = []; //List of pages to hide menu
  activePath: string = ''; //Main activate footer tab will be managed
  appTitle: string = '';
  preferColorTheme: any;
  developer: any;
  version: string = '';


  constructor(private network: Network,
    public storageData: StorageService,
    public translate: TranslateService,
    private menu: MenuController,
    private platform: Platform,
    private navController: NavController,
    private router: Router,
    public lang: LanguageService,
    public storage_n: Storage,
    private alertservice: AlertService,
    public api: ApiService,
    public theme: ThemeService,
    private toastService: ToastService) {
    // watch network for a disconnection
    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
      this.alertservice.showAlert("No_internet_Connection", 'custom-alert failure-alert', this.closeApp); //Showing alert if there is no connection
    });
    this.appTitle = environment.appTitle;
  }

  //App closes while calling this method
  closeApp() {

  }

  //On page loading
  async ngOnInit() {
    this.developer = { 'name': environment.developer, 'url': environment.developerURL };
    this.version = environment.version;
    await this.platform.ready().then(() => {
      this.storage_n.create(); //Create storage set
    });
    this.storageData.init(); //Initiating storage class

    //Get current theme color
    this.storageData.get('color').then((val: any) => {
      if (val == 'black')
        this.defaultColor = false;
      else
        this.defaultColor = true;
    });

    this.lang.setlanguage(await this.lang.getLanguage());  //Set previous existing language from storage
    this.checkTranslation(); //Check the language on default
    this.initializeApp();
    this.api.get('getThemeColor').subscribe((color: any) => {
      this.preferColorTheme = color?.color;
      this.storageData.set('preferColor', this.preferColorTheme);
    });

  }

  //Load splash screen at inital
  loadSplash() {
    this.menu.enable(false);
    this.navController.navigateRoot('/splash');
  }

  //Check translation weather it is english or arabic
  checkTranslation() {
    this.translate.onDefaultLangChange.subscribe((respnose: any) => {
      if (respnose.lang == 'ar') {
        this.ing = 'rtl';
        this.ing_star = 'end';
      }
      else {
        this.ing = 'ltr';
        this.ing_star = 'start';
      }
    });
    this.defaultColor = false;
  }

  pageMove(vl: any) {
    this.menu.close();
    if (vl == 'logout') {
      this.storageData.destroySessions();
      this.navController.navigateRoot('login');
    }
    else {
      this.navController.navigateRoot(vl);
    }
  }


  initializeApp() {
    this.platform.ready().then(() => {
      this.storage_n.create();
    });
    this.storageData.init();
    this.loadSplash(); //Default app loading page
  }

  logout() {
    this.menu.enable(false);
    this.storageData.destroySessions();
    this.navController.navigateRoot('login');
  }

  //If a page leaves
  ionViewWillLeave() {
    this.toastService.toastDismiss(); //Dismisses an active toast message when page changes
  }

}
