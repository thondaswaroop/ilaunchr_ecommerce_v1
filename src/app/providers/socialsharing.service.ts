import { Injectable } from '@angular/core';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';

@Injectable({
  providedIn: 'root'
})
export class SocialsharingService {

  constructor(private social: SocialSharing) { }

  share(title: string, message: string, image: any, url: string) {
    this.social.shareWithOptions({ message: message, subject: title, url: url, files: image });
  }

}
