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
import { TestingPageComponent } from './pages/testing-page/testing-page.component';
// User related
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { RegisterPageComponent } from './pages/register-page/register-page.component';
import { UserManagementPageComponent } from './pages/user-management-page/user-management-page.component';
// Pipeline, strategies and records
import { NewPipelinePageComponent } from './pages/pipeline-pages/new-pipeline-page/new-pipeline-page.component';
import { ViewPipelinesPageComponent } from './pages/pipeline-pages/view-pipelines-page/view-pipelines-page.component';
import { NewStrategyPageComponent } from './pages/strategy-pages/new-strategy-page/new-strategy-page.component';
import { ViewStrategiesPageComponent } from './pages/strategy-pages/view-strategies-page/view-strategies-page.component';
import { NewRecordPageComponent } from './pages/health_record_pages/new-record-page/new-record-page.component';
import { ViewRecordsPageComponent } from './pages/health_record_pages/view-records-page/view-records-page.component';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { ThemePickerComponent } from './components/theme-picker/theme-picker.component';
import { AudioRecorderComponent } from './components/audio-recorder/audio-recorder.component';
import { PipelineTableComponent } from './components/pipeline-table/pipeline-table.component';

// Dialogs
import { UserDeletionDialogContent } from './pages/user-management-page/user-management-page.component';
import { EntryDeletionDialogComponent } from './components/entry-deletion-dialog/entry-deletion-dialog.component';

// Services
import { BackendAPIService } from './services/backend.service';
import { AudioRecordingService } from './services/audio-recording.service';
import { UserApiService } from './services/user-api.service';
import { HeathRecordAPIService } from './services/health-record-api.service';
import { PipelineAPIService } from './services/pipepile-api.service';
import { StrategyAPIService } from './services/strategy-api.service';


@NgModule({
  declarations: [
    // Components
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ThemePickerComponent,
    AudioRecorderComponent,
    PipelineTableComponent,
    
    // Pages
    HomePageComponent,
    TestingPageComponent,
    // User related
    LoginPageComponent,
    RegisterPageComponent,
    UserManagementPageComponent,
    // Pipeline, strategies and records
    NewPipelinePageComponent,
    ViewPipelinesPageComponent,
    NewStrategyPageComponent,
    ViewStrategiesPageComponent,
    NewRecordPageComponent,
    ViewRecordsPageComponent,

    // Dialogs
    UserDeletionDialogContent,
    EntryDeletionDialogComponent
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
    BackendAPIService,
    AudioRecordingService,
    UserApiService,
    HeathRecordAPIService,
    PipelineAPIService,
    StrategyAPIService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
