import { Component, OnInit } from '@angular/core';

import { UserApiService } from 'src/app/services/user-api.service';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userList: User[] = [];

  constructor(
    private userApi: UserApiService
  ) { }

  ngOnInit() {
    this.userApi
      .getUsers()
      .subscribe({
        next: (res) => {
          this.userList = res;
        },
        error: (e) => console.error(e),
        complete: () => console.info('complete')
      })
  }

  saveEntry() {
    
  }

}
