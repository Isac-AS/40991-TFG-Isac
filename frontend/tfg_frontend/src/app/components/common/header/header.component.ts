import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { UserApiService } from 'src/app/services/user-api.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  loggedInCondition = false;
  currentUserName = '';
  
  constructor(
    public globalService: GlobalService,
    private userAPI: UserApiService,
    ) {
    
    this.globalService.loggedInfo.subscribe({
      next: newValue => {
        this.loggedInCondition = newValue.isLoggedIn;
        this.currentUserName = newValue.username;
      }
    })
  }

  logOut() {
    this.userAPI.logOut().subscribe({
      next: res => {
        console.log(res)
      }
    })
    this.globalService.loggedInfo.next({
      isLoggedIn: false,
      username: '',
      role: '0'
    })
  }

}
