import { Observable } from 'rxjs';
import { Component } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from './services/global.service';
import { UserApiService } from './services/user-api.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

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
    public globalService: GlobalService,
    private userAPIService: UserApiService
  ) {
    // Subscription to pageName. All pages must change the page name in their constructor
    this.globalService.pageName.subscribe({
      next: newValue => {
        this.currentPageName = newValue.currentPageName;
      }
    })
    
    // Subscription to global service as the service that will have the visibility information 
    // controlling what is seen by the user depending on the role and logged in status.
    this.globalService.loggedInfo.subscribe({
      next: newValue => {
        this.currentLoggedUserRole = newValue.role;
      }
    })
    
    this.userAPIService.updateCurrentUserData();
  }
}
