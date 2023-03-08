import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { UserApiService } from 'src/app/services/user-api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

  userForm = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  invalidAnswerFromBackend: boolean;

  constructor(
    public globalService: GlobalService,
    private fb: FormBuilder,
    private userAPI: UserApiService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Iniciar sesión'
    })
    this.invalidAnswerFromBackend = false;
  }

  login() {
    this.userAPI.login(
      this.userForm.value.email!,
      this.userForm.value.password!)
    .subscribe({
      next: (res) => {
        if (res.result == true) {
          console.log(res)
          this._snackBar.open("¡Inicio de sesión correcto!", "Continuar", {duration: 3000});
          this.globalService.loggedInfo.next({
            isLoggedIn: true,
            username: res.user.username,
            role: res.user.role,
            is_admin: res.user.is_admin
          })
          this.router.navigate(["/"]);
        } else if (res.result == false) {
          this._snackBar.open("Error con el inicio de sesión", "Continuar", {duration: 5000});
          this.invalidAnswerFromBackend = true;
        }
      }
    })
  }
}
