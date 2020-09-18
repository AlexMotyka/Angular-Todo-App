import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoService],
})
export class TodoListComponent implements OnInit {

  // stores the todo name the user types
  todoName: string;
  userID: string;
  constructor(private todoService: TodoService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.todoName = '';
    this.userID = this.route.snapshot.paramMap.get('id')
    this.todoService.getTodos(this.userID)
  }

  addTodo(): void {
    // check if the name is empty
    if (this.todoName.trim().length === 0) {
      this.todoName = 'YOU FORGOT TO NAME ME';
    }
    this.todoService.addTodo(this.todoName, this.userID);
    this.todoName = '';
  }

  logout() {
    this.router.navigate(['']);
  }

}
