import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  token: string

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.email = ""
    this.password = ""
  }

  login(): void {
    console.log("login!")
    if (this.email.trim().length === 0){
      console.log("you forgot to enter an email")
    } else {
      // go to todos page
    }
  }

  signup(): void {
    console.log("sign up!")
  }

}
