import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from '@ionic/angular';
import { StorageService } from './storage.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  public languageSubject = new BehaviorSubject<any>('en');
  public colorSubject = new BehaviorSubject<any>('');
  languageEvents = this.languageSubject.asObservable();
  colorEvents = this.colorSubject.asObservable();
  constructor(private storageData: StorageService, public translate: TranslateService, public platform: Platform) {

  }
  updateLanguage(language:any) {
    this.languageSubject.next(language);
  }
  updateColorSettings(val:any) {
    this.colorSubject.next(val);
  }
  checktranslate(): Promise<any> {
    return this.storageData.get('language').then((stat: any) => {
      return (stat == 'ar' ? 'ar' : 'en');
    });
  }

  setlanguage(vl:any) {
    this.translate.use(vl);
    this.translate.setDefaultLang(vl);
    this.storageData.set('language', vl);
    this.updateLanguage(vl);
  }

  setColor(vl:any) {
    this.storageData.set('currentTheme', vl);
    this.updateColorSettings(vl);
  }

  async getLanguage() {
    var vl = await this.storageData.get('fta_language');
    if (vl != null)
      return Promise.resolve(vl);
    else
      return Promise.resolve('en');
  }

  async getColor() {
    var vl = await this.storageData.get('currentTheme');
    if (vl != null)
      return Promise.resolve(vl);
    else
      return Promise.resolve('');
  }


  async init() {
    await this.platform.ready();
  }
}
