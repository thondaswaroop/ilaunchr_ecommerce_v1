import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { environment } from 'src/environments/environment';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';


@Component({
  selector: 'app-moreinfo',
  templateUrl: './moreinfo.page.html',
  styleUrls: ['./moreinfo.page.scss'],
})
export class MoreinfoPage implements OnInit {

  businessInfo: any = [];
  contents: any = [];
  version: string = '';

  constructor(public api: ApiService, public load: LoaderService, public navigate: NavigationService, private socialSharing: SocialSharing) { }

  ngOnInit() {
    this.load.loadStart();
    this.api.get('businessinfo').subscribe((data: any) => {
      this.businessInfo = data.business;
      this.api.get('contentslist').subscribe((data: any) => {
        this.contents = data.contents;
        this.load.loadStop();
      });
    });

    this.version = environment.version;
  }

  pageRedirect(id: any) {
    this.navigate.navigateWithData('moreinfodetail', { 'id': id });
  }

  shareApplication() {
    // this.socialSharing.canShareVia(environment.appTitle, this.businessInfo.share_text, environment.appTitle, '', this.businessInfo.store_link).then((resp) => {
    //   alert(JSON.stringify(resp));
    // }).catch((error) => {
    //   alert('error');
    //   alert(JSON.stringify(error));
    // });

    this.socialSharing.shareViaWhatsApp(this.businessInfo.share_text,'https://thumbs.dreamstime.com/b/new-normal-hand-drawn-lettering-logo-illustration-246631383.jpg',this.businessInfo.store_link).then((resp) => {
      alert(JSON.stringify(resp));
    }).catch((error) => {
      alert('error');
      alert(JSON.stringify(error));
    });

  }

  needApp() {
    window.open(environment.developerURL);
  }

}
