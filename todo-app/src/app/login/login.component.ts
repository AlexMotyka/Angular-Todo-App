import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';

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

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.email = ""
    this.password = ""
    this.missingCredentials = false
  }

  login() {
    if ((this.email.trim().length === 0) || this.password.trim().length === 0){
      // TODO: add a pop up alert
      this.missingCredentials = true
      console.log("Login failed!")
    } else {
      this.todoService.loginUser(this.email, this.password).then((user) => {
        if (!user) {
          // TODO: add a pop up alert
          console.log("Login Failed!")
        }
        // console.log(user)
        console.log(this.todoService.user)
      })
    }
  }

  signup(): void {
    console.log("sign up!")
  }

}
