import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NgbModule, NgbCalendar, NgbCalendarGregorian} from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { LoginComponent } from './login/login.component';
import { routingModule } from './app.routing';
import { SignupComponent } from './signup/signup.component';
import { UserGuard } from './_guards/user.guard';
import { AlertService} from './_services/alert.service';
// import { AutenticationService} from './_services/authentication.service';
import { fakeBackendProvider } from './_helpers';
//import { AppreciationService } from './services/appreciation.service';
import {HttpClientModule, HTTP_INTERCEPTORS}  from '@angular/common/http';
// used to create fake backend
import { ErrorInterceptor, JwtInterceptor} from './_helpers';
import { AlertComponent } from './_directives/alert.component';
import { HomeComponent } from './home/home.component';
import { FormattedMentorsComponent } from './mentors/formattedMentors.component';
import { MentorsComponent } from './mentors/mentors.component';
import { MyTrainingsComponent } from './mytrainings/mytrainings.component';
import { FilterPipe} from './_pipes/filter.pipe';
import { AllTrainingsComponent } from './all-trainings/all-trainings.component';
import { AdminComponent } from './admin/admin.component';
import { NgbdDatepickerRange } from './ngbd-datepicker-range/ngbd-datepicker-range';
import { TimeSlotsComponent } from './time-slots/time-slots.component';
// import { NgbCalendarGregorian} from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-calendar';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    AlertComponent,
    HomeComponent,
    FormattedMentorsComponent,
    MentorsComponent,
    MyTrainingsComponent,
    FilterPipe,
    AllTrainingsComponent,
    AdminComponent,
    NgbdDatepickerRange,
    TimeSlotsComponent
  ],
  imports: [
    BrowserModule,
    routingModule,
    AngularFontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    UserGuard,
    AlertService,
    // AuthenticationService,
    // UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: NgbCalendar, useClass: NgbCalendarGregorian}

    // provider used to create fake backend
    //fakeBackendProvider
],
  //providers: [AppreciationService],
  bootstrap: [AppComponent]
  // provider used to create fake backend
 
})
export class AppModule { }
