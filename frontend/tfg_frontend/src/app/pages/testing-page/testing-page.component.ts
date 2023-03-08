import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { BackendAPIService } from 'src/app/services/backend.service';
import { GlobalService } from 'src/app/services/global.service';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-testing-page',
  templateUrl: './testing-page.component.html',
  styleUrls: ['./testing-page.component.scss']
})
export class TestingPageComponent implements OnInit {

  currentUser: User = {
    email: '',
    username: '',
    password: '',
    role: '',
    is_admin: false
  }

  currentUserMessage: string = 'No hay un usuario que haya iniciado sesión'

  constructor(
    private backendService: BackendAPIService,
    public globalService: GlobalService,
    private userAPIService: UserApiService
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Página de pruebas'
    })
   }

  ngOnInit() {
  }

  ping() {
    this.backendService.ping().subscribe({
      next: (res: any) => {
        console.log(res)
      }
    })
  }

  logOut() {
    this.userAPIService.logOut().subscribe({
      next: res => {
        console.log(res)
        console.log("Sesión cerrada con éxito")
      }
    })
  }

  isAuthenticated() {
    this.userAPIService.idAuthenticated().subscribe({
      next: res => {
        console.log(res)
      }
    })
  }

  fetchCurrentUserData() {
    console.log("a")
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
