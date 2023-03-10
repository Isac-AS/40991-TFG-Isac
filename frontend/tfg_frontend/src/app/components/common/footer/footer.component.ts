import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent{
  isDarkThemeActive = true;
  
  constructor(
    public globalService: GlobalService,
    ) {
    this.globalService.darkThemeActive.subscribe({
      next: newValue => {
        this.isDarkThemeActive = newValue.isDarkThemeActive;
      }
    })
  }

}
