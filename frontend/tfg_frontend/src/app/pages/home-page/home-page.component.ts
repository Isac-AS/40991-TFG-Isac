import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  userList: User[] = [];

  addUserForm = this.fb.group({
    email : ['', [Validators.required, Validators.email]],
    username : [ '', [Validators.required, Validators.minLength(6)]],
    password : [ '', [Validators.required, Validators.minLength(6)]],
    role : ['', [Validators.required]]
  })

  userData: User = {
    username: '',
    mail: '',
    password: '',
    role: '',
  };

  constructor(
    private router: Router,
    private userApi: UserApiService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.userApi.getUsers().subscribe(
      (res) => {
        this.userList = res;
      })
  }

  async addUser() {
    this.userData.username = this.addUserForm.value.username!;
    this.userData.password = this.addUserForm.value.password!;
    this.userData.mail = this.addUserForm.value.email!;
    this.userData.role = this.addUserForm.value.role!;
    this.userApi
      .addUser(this.userData)
      .subscribe(() => this.router.navigate(["/"]))
  }


}
