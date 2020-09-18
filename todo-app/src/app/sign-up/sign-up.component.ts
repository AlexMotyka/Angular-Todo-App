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
    } else {
      this.todoService.signUpUser(this.name, this.email, this.password).then((response) => {
        if(!response._id) {
          if(response.error.errors.email){
            console.log("Invalid email!")
          } else if(response.error.errors.password){
            console.log("Invalid password!")
          } else {
            console.log("Sign up failed!")
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
