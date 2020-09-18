import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { AlertService } from '../_alert';
import { Observable } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [TodoService],
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  token: string;
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
    this.email = ""
    this.password = ""
    this.missingCredentials = false
  }

  login() {
    if ((this.email.trim().length === 0) || this.password.trim().length === 0){
      this.alertService.error("Missing Info!", this.options)
    } else {
      this.todoService.loginUser(this.email, this.password).then((response) => {
        // if login failed
       if(!response._id) {
        this.alertService.error("Login failed!", this.options)
       } else {
        this.router.navigate(['/todos', response._id]);
       }
      })
    }
  }

  signup(): void {
    console.log("sign up!")
    this.router.navigate(['/register']);
  }

}
