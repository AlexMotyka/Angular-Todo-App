import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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

  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.email = ""
    this.password = ""
    this.missingCredentials = false
  }

  login() {
    if ((this.email.trim().length === 0) || this.password.trim().length === 0){
      // TODO: add a pop up alert
      this.missingCredentials = true
    } else {
      this.todoService.loginUser(this.email, this.password).then((response) => {
        // if login failed
       if(!response._id) {
         console.log("Login failed!")
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
