import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  providers: [TodoService],
})
export class TodoListComponent implements OnInit {

  // stores the todo name the user types
  todoName: string;
  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoName = '';
  }

  addTodo(): void {
    // check if the name is empty
    if (this.todoName.trim().length === 0) {
      this.todoName = 'YOU FORGOT TO NAME ME';
    }
    this.todoService.addTodo(this.todoName);
    this.todoName = '';
  }

}
