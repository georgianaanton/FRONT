import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { MentorsComponent } from './mentors/mentors.component';
import { TimeSlotsComponent} from './time-slots/time-slots.component';
import { MyTrainingsComponent } from './mytrainings/mytrainings.component';
import { AllTrainingsComponent } from './all-trainings/all-trainings.component';
import { SignupComponent } from './signup/signup.component';
import { UserGuard } from './_guards/user.guard';


const routes:Routes = [
  
    {path:'login', component: LoginComponent},
    {path:'signup', component: SignupComponent},
    {path:'home', component: HomeComponent, canActivate:[UserGuard]},
    {path:'mentors', component: MentorsComponent},
    {path:'myTrainings', component: MyTrainingsComponent, canActivate:[UserGuard]},
    {path:'allTrainings', component: AllTrainingsComponent},
    {path:'admin', component: AdminComponent},
    {path:'timeSlots', component: TimeSlotsComponent},
    {path:'**', redirectTo: 'home'}
];

export const routingModule = RouterModule.forRoot(routes);
