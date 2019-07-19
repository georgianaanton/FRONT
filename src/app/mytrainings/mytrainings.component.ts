import { Component, OnInit, OnChanges, Input, ChangeDetectorRef } from '@angular/core';
import { Training } from '../_models/training';
import { User } from '../_models/user';

import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute  } from '@angular/router';
import { AngularFontAwesomeComponent } from 'angular-font-awesome';
import { isNullOrUndefined} from 'util';
import { TrainingInProgress } from '../_models/trainingInProgress';

@Component({
  selector: 'app-mytrainings',
  templateUrl: './mytrainings.component.html',
  styleUrls: ['./mytrainings.component.css']
})
export class MyTrainingsComponent implements OnInit {

  currentUser: User;

  trainings: any;

  all : any;

  constructor(
    private userService: UserService, 
    private alertService : AlertService, 
    private route : ActivatedRoute) {
  
   }


 
  ngOnInit() {
   
    if (isNullOrUndefined(this.currentUser) ) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.currentUser);
    }

    if (isNullOrUndefined(this.currentUser) ) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      console.log(this.currentUser);
    }
    this.userService.getTrainingsInProgress(this.currentUser.username).pipe(first())
    .subscribe((data : TrainingInProgress[]) => { 
        this.trainings = data; 

    });
   
  }

  getText(training : any) {
    if (training.status === "started") {
      return "Watch progress";
      
    } else if(training.status === "confirmed"){
      return "Start training" ;
    }
    else (training.status === "proposed")  
      return "Go to details";
  }

  doAction(training : any) {

    if (training.status === "confirmed" ){
      this.startTraining(training);
    }
   
  }

  startTraining(training : Training) {
    this.userService.startTraining(this.currentUser, training.id)
    .pipe(first())
    .subscribe(
                data => {
                    this.alertService.success('You successfully started the training: ' + training.description, false);
                    //this.router.navigate(['/login']);
                },
                error => {
                  this.alertService.success('You successfully started the training: ' + training.description, false);
                   // this.alertService.error(error);
                    //this.loading = false;
                });
  }
  

}
