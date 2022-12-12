import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LoaderService } from 'src/app/providers/loader.service';
import { StorageService } from 'src/app/providers/storage.service';
import { ButtonType } from "../../../enums/button-type"

@Component({
  selector: 'app-custom-button',
  templateUrl: './custom-button.component.html',
  styleUrls: ['./custom-button.component.scss'],
})
export class CustomButtonComponent implements OnInit {
  @Input() buttonLabel: any;
  @Input() Buttoncolor: any;
  @Input() ButtonType: any;
  @Input() iconName: any;
  @Input() iconSrc: any;
  @Input() iconSlot: any;
  @Input() buttonRound: any;
  @Input() isDisabled = false;
  @Input() multipleButtonData: any;
  @Input() buttonExpand: any;
  @Input() buttonShape: any;
  @Input() buttonFill: any;
  @Input() multipleButtons = false;
  @Input() signleButton = true;
  @Input() isIconAvailable = false;

  @Output() buttonClick = new EventEmitter();

  preferColorTheme: any;

  ButtonClicked(event: any) {
    this.buttonClick.emit(event);
  }

  constructor(public storage: StorageService, public load: LoaderService) { }
  ngOnInit() {
    this.storage.get('preferColor').then((color: any) => {
      this.preferColorTheme = color;
    });
  }

  isButtonClicked(item: any) {
    this.buttonClick.emit(item.name);
    for (var i = 0; i < this.multipleButtonData.length; i++) {
      if (item.name == this.multipleButtonData[i].name) {
        this.multipleButtonData[i].showFlag = !this.multipleButtonData[i].showFlag;
      }
    }
  }

  isStatusChanged(item: any) {
    this.buttonClick.emit(item.name);
    for (var i = 0; i < this.multipleButtonData.length; i++) {
      if (item.name != this.multipleButtonData[i].name) {
        this.multipleButtonData[i].showFlag = false;
      }
      else {
        this.multipleButtonData[i].showFlag = true
      }
    }
  }


}
