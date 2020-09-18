import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  name: string;
  email: string;
  password: string;
  missingCredentials: boolean;

  options = {
    autoClose: true,
    keepAfterRouteChange: false
  };

  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router,
    protected alertService: AlertService) { }

  ngOnInit() {
    this.name = ""
    this.email = ""
    this.password = ""
    this.missingCredentials = false
  }

  submit() {
    if ((this.email.trim().length === 0) || (this.password.trim().length === 0) || (this.name.trim().length === 0)){
      this.alertService.error("Missing sign up info!")
    } else {
      this.todoService.signUpUser(this.name, this.email, this.password).then((response) => {
        if(!response._id) {
          if(response.error.errors.email){
            this.alertService.error("Invalid email!", this.options)
          } else if(response.error.errors.password){
            this.alertService.error("Password is to short!", this.options)
          } else {
            this.alertService.error("Sign up failed!")
          }
        } else {
          this.router.navigate(['/todos', response._id]);
        }
      })
    }
  }

  cancel() {
    this.router.navigate(['']);
  }

}
