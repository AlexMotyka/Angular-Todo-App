import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { Todo } from 'src/app/todo';

@Component({
  selector: 'todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: Todo;

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

}
