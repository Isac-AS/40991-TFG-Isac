import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'TFG_frontend';
  currentPageName = '';
  currentLoggedUserRole = '0';

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public globalService: GlobalService
  ) {
    this.globalService.pageName.subscribe({
      next: newValue => {
        this.currentPageName = newValue.currentPageName;
      }
    })

    this.globalService.loggedInfo.subscribe({
      next: newValue => {
        this.currentLoggedUserRole = newValue.role;
      }
    })
  }
}
