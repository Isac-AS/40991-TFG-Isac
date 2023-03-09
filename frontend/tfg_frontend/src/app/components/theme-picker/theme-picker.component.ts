import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent {

  isDarkThemeActive = false;

  constructor(@Inject(DOCUMENT) private document: Document) {}

  onChange(newValue: boolean): void {
    if (newValue) {
      this.document.body.classList.add('light-mode');
    } else {
      this.document.body.classList.remove('light-mode');
    }
  }
}
