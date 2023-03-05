import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit {

  userForm = this.fb.group({
    username: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    role: [null, Validators.required],
    password: [null, [Validators.required, Validators.minLength(6)]]
  })

  possibleRoles = [
    {name: 'Personal sanitario', databaseName: '1'},
    {name: 'Científico de datos/Desarrollador', databaseName: '2'},
    {name: 'Administrador', databaseName: '0'},
  ]

  constructor(
    public globalService: GlobalService,
    private fb: FormBuilder,
  ) {
    this.globalService.pageName.next({
      currentPageName: 'Registrarse'
    })
  }

  ngOnInit() {}

  register() {
    alert("Amogus")
  }

}
