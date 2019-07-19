import { Component, OnInit, OnChanges, Input, ChangeDetectorRef } from '@angular/core';
import { Training } from '../_models/training';
import { User } from '../_models/user';

import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import { first } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFontAwesomeComponent } from 'angular-font-awesome';

@Component({
  selector: 'app-all-trainings',
  templateUrl: './all-trainings.component.html',
  styleUrls: ['./all-trainings.component.css']
})
export class AllTrainingsComponent implements OnInit {

  @Input()
  currentUser: User;

  trainings: any;

  Arr = Array;
  Math = Math;


  constructor(private userService: UserService
    , private alertService: AlertService
    , private route: ActivatedRoute) {


  }

  ngOnInit() {

    this.userService.getAllTrainings().pipe(first())
      .subscribe((data: Training[]) => {
        this.trainings = data;
      });


  }

  getStarList(training: Training) : string[] {
    var value = training.rating;
    var starList: string[] = [];
    let i=1;
    for(i=1; i<=5; i++) {
      if(i<= value) {
        starList.push("fa fa-star");
      } else if(i <= value+0.5) {
        starList.push("fa fa-star-half-o");
      } else {
        starList.push("fa fa-star-o");
      }
    }
    return starList;
  }

  sendProposal(training : Training) {
    this.userService.sendProposal(this.currentUser, training.mentorId)
    .pipe(first())
    .subscribe(
                data => {
                    this.alertService.success('Your proposal was successfully sent', false);
                    //this.router.navigate(['/login']);
                },
                error => {
                  this.alertService.success('Your proposal was successfully sent', false);
                    //this.alertService.error(error);
                    //this.loading = false;
                });
  }

}
