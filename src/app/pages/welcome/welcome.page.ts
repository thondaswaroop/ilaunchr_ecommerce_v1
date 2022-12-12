import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { StorageService } from 'src/app/providers/storage.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage implements OnInit {

  finalStep: boolean = false;

  constructor(private navController: NavController, public storageData: StorageService) {
  }

  ngOnInit() {
  }

  slider: any;

  /** This event will trigger for every slide change */
  slideDidChange(type:any,slideView:any) {
    this.slider = slideView;
    slideView.isEnd().then((istrue:any) => {
      if (istrue == true) {
        this.finalStep = true;
      }
      else {
        this.finalStep = false;
      }
    });

  }

  /** This method is used to navigate the login screen*/
  navigateToLogin() {
    this.storageData.set('onboardstatus', 'yes');
    this.navController.navigateRoot('/login');
  }

  /** This method is triggered when clicked on next and it is used to move the next slide */
  moveToNextSlide() {
    this.slider.slideNext();
  }

  slideOpts = {
    initialSlide: 0,
        loop: true,
        speed: 700,
        autoplay: {
          delay: 2000,
        },
        observer: true,
        observeParents: true,    
    slidesPerView: 2.3,
    breakpoints: {
      1024: {
        slidesPerView: 3.3,
      },
      1120: {
        slidesPerView: 3.3,
      }
    }


  }

}
