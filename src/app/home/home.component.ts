import { Component, OnInit, Input, OnChanges, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { User} from '../_models/user';
import { Training } from '../_models/training';
import { Role } from '../_models/role';
import { MyTrainingsComponent } from '../mytrainings/mytrainings.component';
import { UserService } from '../_services/user.service';
import { first } from 'rxjs/operators';
import { TrainingInProgress} from '../_models/trainingInProgress';
import { Router, ActivatedRoute  } from '@angular/router';
import { isNullOrUndefined } from "util";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  currentUser : User;
  isMentor: boolean;
  trainings: Training[] = [];
  allTrainings : Training[] = [];
  private mentorName: any;


  constructor(private userService: UserService,  private router:Router) {
   this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
   
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser.role === Role.Mentor) {
      this.isMentor = true;
      console.log("isMentor " + this.isMentor);
    } 
  }







}


