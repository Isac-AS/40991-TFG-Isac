import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent {

  isDarkThemeActive = true;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    public globalService: GlobalService,
    ) {}

  onChange(): void {
    // Toggle theme
    this.isDarkThemeActive = !this.isDarkThemeActive
    // Notify global service
    this.globalService.darkThemeActive.next({isDarkThemeActive: this.isDarkThemeActive})
    if (this.isDarkThemeActive) {
      this.document.body.classList.remove('light-mode');
    } else {
      this.document.body.classList.add('light-mode');
    }
  }
}
