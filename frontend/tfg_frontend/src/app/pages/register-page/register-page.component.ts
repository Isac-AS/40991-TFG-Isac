import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';
import { UserApiService } from 'src/app/services/user-api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent {

  userForm = this.fb.group({
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    role: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  possibleRoles = [
    {name: 'Personal sanitario', databaseName: '1'},
    {name: 'Científico de datos/Desarrollador', databaseName: '2'},
    {name: 'Administrador', databaseName: '3'},
  ]

  userData: User = {
    email: '',
    username: '',
    password: '',
    role: '',
  };

  invalidAnswerFromBackend: boolean;

  constructor(
    public globalService: GlobalService,
    private fb: FormBuilder,
    private router: Router,
    private userAPI: UserApiService,
    private _snackBar: MatSnackBar
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Registrarse'
    })
    this.invalidAnswerFromBackend = false;
  }

  register() {
    this.userData.username = this.userForm.value.username!;
    this.userData.password = this.userForm.value.password!;
    this.userData.email = this.userForm.value.email!;
    this.userData.role = this.userForm.value.role!;
    this.userAPI
      .register(this.userData)
      .subscribe({
        next: (res) => {
          if (res.result == true) {
            this._snackBar.open("¡Usuario creado con éxito!", "Continuar", {duration: 5000});
            this.globalService.loggedInfo.next({
              isLoggedIn: true,
              username: this.userData.username,
              role: this.userData.role,
              is_admin: false
            })
            this.router.navigate(["/"]);
          } else if (res.result == false) {
            this._snackBar.open("Error con la creación del usuario", "Continuar", {duration: 5000});
            this.invalidAnswerFromBackend = true;
          }
        }
      })
  }
}
