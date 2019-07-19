import { Component, OnInit, Input } from '@angular/core';
import { Mentor, FormattedMentor } from '../_models/mentor';
import { Skill } from '../_models/skill'
import { UserService } from '../_services/user.service';
import { isNullOrUndefined} from 'util';

@Component({
  selector: 'app-formatted-mentors',
  templateUrl: './formattedMentors.component.html',
  styleUrls: ['./formattedMentors.component.css']
})
export class FormattedMentorsComponent implements OnInit {

  public searchString: string;
 

  @Input() 
  mentors: Array<Mentor>;
 
  formattedMentors: Array<FormattedMentor>;
 
  ngOnChanges(): void {
    this.formattedMentors = this.mentors.map(e => ({
      ...e,
      formattedName: this.getFormattedName(e),
      formattedSkills: this.getFormattedSkills(e),
    }));
  }
 

  constructor(private userService : UserService) { 
    this.userService.getAllMentors().subscribe(
      (resp : Mentor[]) => {
          this.mentors = resp;

      }
  );
  }

  ngOnInit() {
  
}
  

getFormattedSkills(mentor: Mentor){
  if (!isNullOrUndefined(mentor.skills) && mentor.skills.length !== 0) {
    return  mentor.skills.map(function(skill){return skill.description}).join(", ");
  }
  }

getFormattedName(mentor: Mentor): string {
    return `${mentor.firstName} ${mentor.lastName}`;
  }
 

handleSelectionEvent(event){
  console.log("change in controls", event);
  }

checkAvailableTimeSlots(mentor: any) {
  
}

}
