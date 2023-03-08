import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { GlobalService } from 'src/app/services/global.service';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  currentUser: User = {
    email: '',
    username: '',
    password: '',
    role: '',
    is_admin: false
  }
  
  constructor(
    public globalService: GlobalService,
    private userAPIService: UserApiService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Página principal'
    })
  }

  fetchCurrentUserData() {
    this.userAPIService.getCurrentUserData().subscribe({
      next: res => {
        console.log(res)
        if (res.result == true) {
          this.currentUser.email = res.user.email;
          this.currentUser.role = res.user.role;
          this.currentUser.username = res.user.username;
          this.currentUser.password = res.user.password;
          this.currentUser.is_admin = res.user.is_admin;
        }
      }
    })
  }
}
