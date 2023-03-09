import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GlobalService } from 'src/app/services/global.service';
import { UserApiService } from 'src/app/services/user-api.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



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
    private router: Router,
    private _snackBar: MatSnackBar
    ) {
    this.globalService.loggedInfo.subscribe({
      next: newValue => {
        this.loggedInCondition = newValue.isLoggedIn;
        this.currentUserName = newValue.username;
      }
    })
    this.userAPI.updateCurrentUserData();
  }

  logOut() {
    this.userAPI.logOut().subscribe({
      next: res => {
        //console.log(res)
        this._snackBar.open("Sesión cerrada con éxito", "Continuar", {duration: 5000});
      }
    })
    this.globalService.loggedInfo.next({
      isLoggedIn: false,
      username: '',
      role: '0',
      is_admin: false,
    })
    this.router.navigate(["/"])
  }

}
