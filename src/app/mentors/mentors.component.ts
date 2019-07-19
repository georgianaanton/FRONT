import { Component, OnInit } from '@angular/core';
import { Mentor, FormattedMentor } from '../_models/mentor';
import { Skill } from '../_models/skill'
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-mentors',
  template: `
  <app-formatted-mentors [mentors]="mentors"></app-formatted-mentors>
`
})
 

export class MentorsComponent implements OnInit {

  mentors: Mentor[] = [];

  constructor(private userService : UserService) { 
    this.userService.getAllMentors().subscribe(
      (resp : Mentor[]) => {
          this.mentors = resp;

      }
  );
  }

  ngOnInit() {
  
}
  


}
