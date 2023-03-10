import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecordPageComponent } from './pages/health_record_pages/new-record-page/new-record-page.component';
import { ViewRecordsPageComponent } from './pages/health_record_pages/view-records-page/view-records-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { NewPipelinePageComponent } from './pages/pipeline-pages/new-pipeline-page/new-pipeline-page.component';
import { ViewPipelinesPageComponent } from './pages/pipeline-pages/view-pipelines-page/view-pipelines-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { NewStrategyPageComponent } from './pages/strategy-pages/new-strategy-page/new-strategy-page.component';
import { ViewStrategiesPageComponent } from './pages/strategy-pages/view-strategies-page/view-strategies-page.component';
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
    path: "testing",
    component: TestingPageComponent
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
    path: "new_record",
    component: NewRecordPageComponent
  },
  {
    path: "view_records",
    component: ViewRecordsPageComponent
  },
  {
    path: "new_pipeline",
    component: NewPipelinePageComponent
  },
  {
    path: "view_pipelines",
    component: ViewPipelinesPageComponent
  },
  {
    path: "new_strategy",
    component: NewStrategyPageComponent
  },
  {
    path: "view_strategies",
    component: ViewStrategiesPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
