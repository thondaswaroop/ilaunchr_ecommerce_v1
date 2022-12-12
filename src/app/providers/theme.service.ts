import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  finalColor: string = '';

  constructor(
    public storage: StorageService) { }



  getColor() {
    this.storage.get('preferColor').then((color: any) => {
      this.finalColor = color;
    });
    return this.finalColor;
  }
}
