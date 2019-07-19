import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/user.service';
import { AlertService } from '../_services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { MustMatch } from '../_helpers/must-match.validator';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  loading = false;
  registerForm: FormGroup;
  submitted = false;
  returnUrl: string;
  error: string;
  success: string

  constructor( 
    private userService: UserService, 
    private router:Router,  
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alertService: AlertService
    ) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [Validators.required, Validators.email]],
      confirmUsername: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]] ,
      role: ['', Validators.required]  
  }
  , {
    validator: MustMatch('username', 'confirmUsername')
}
  );
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {

    this.submitted = true;
  
       // stop here if form is invalid
       if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;

    this.userService.register(this.registerForm.value)
    .pipe(first())
    .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
  }
  

}
