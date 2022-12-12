import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/providers/api/api.service';
import { LoaderService } from 'src/app/providers/loader.service';
import { NavigationService } from 'src/app/providers/navigation.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-moreinfodetail',
  templateUrl: './moreinfodetail.page.html',
  styleUrls: ['./moreinfodetail.page.scss'],
})
export class MoreinfodetailPage implements OnInit {

  contents: any = [];
  navLoadedParams: any;

  constructor(private router: Router, public api: ApiService, public load: LoaderService, public navigate: NavigationService) { }

  ngOnInit() {
    if (this.router.getCurrentNavigation()?.extras.state) {
      this.navLoadedParams = this.router.getCurrentNavigation()?.extras.state;
      this.load.loadStart();
      this.api.get('contentview&id='+this.navLoadedParams.id).subscribe((data: any) => {
        this.contents = data.contents;
        this.load.loadStop();
      });
    }
  }


}
