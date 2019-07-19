import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService} from '../_services/user.service';
import { first } from 'rxjs/operators';
import { AlertService } from '../_services/alert.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService, private alertService : AlertService) {
    this.userService.getAll().subscribe(
      (resp : User[]) => {
          this.users = resp;

      },
      error => {
        this.alertService.error(error);
       
    });
 
  }

  ngOnInit() {
      // this.userService.getAll().pipe(first()).subscribe((users  : User[])=> { 
      //     this.users = users; 
      // });
  }
}
