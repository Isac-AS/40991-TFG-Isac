// Basic imports
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Angular material
import { CustomMaterialModule } from './material.module';
import { LayoutModule } from '@angular/cdk/layout';

// Pages
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserManagementPageComponent } from './pages/user-management-page/user-management-page.component';
import { TestingPageComponent } from './pages/testing-page/testing-page.component';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';

// Services
import { UserApiService } from './services/user-api.service';
import { BackendAPIService } from './services/backend.service';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    HeaderComponent,
    FooterComponent,

    LoginPageComponent,
    RegisterPageComponent,
    UserManagementPageComponent,
    TestingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    LayoutModule,
    CustomMaterialModule
  ],
  providers: [
    UserApiService,
    BackendAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
