import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { TestingPageComponent } from './pages/testing-page/testing-page.component';
import { UserManagementPageComponent } from './pages/user-management-page/user-management-page.component';

const routes: Routes = [
  {
    path: "",
    component: HomePageComponent
  },
  {
    path: "home",
    component: HomePageComponent
  },
  {
    path: "login",
    component: LoginPageComponent
  },
  {
    path: "register",
    component: RegisterPageComponent
  },
  {
    path: "user_management",
    component: UserManagementPageComponent
  },
  {
    path: "testing",
    component: TestingPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
