import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  userForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  constructor(
    public globalService: GlobalService,
    private fb: FormBuilder,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Iniciar sesión'
    })
  }

  ngOnInit() {}

  login() {
    alert("Amogus")
  }
}
