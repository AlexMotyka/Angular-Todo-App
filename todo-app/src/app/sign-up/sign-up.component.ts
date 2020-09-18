import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

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

  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.name = ""
    this.email = ""
    this.password = ""
    this.missingCredentials = false
  }

  submit() {
    if ((this.email.trim().length === 0) || (this.password.trim().length === 0) || (this.name.trim().length === 0)){
      // TODO: add a pop up alert
      this.missingCredentials = true
      console.log("Login failed!")
    } else {
      this.todoService.signUpUser(this.name, this.email, this.password).then((user) => {
        if (!user) {
          //TODO: add a pop up alert
          console.log("Login Failed!")
        } else {
          console.log("Login comp: ", this.todoService.user)
          this.router.navigate(['/todos', this.todoService.user._id]);
        }
      })
    }
  }

  cancel() {
    this.router.navigate(['']);
  }

}
