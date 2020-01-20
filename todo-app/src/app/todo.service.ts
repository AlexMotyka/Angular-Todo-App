import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoName: string = '';
  idForTodo: number = 4;
  beforeEditCache: string = '';
  filter: string = 'all';
  todos: Todo[] = [
    {
      'id': 1,
      'name': 'Finish Angular Screencast',
      'completed': false,
      'editing': false,
    },
    {
      'id': 2,
      'name': 'Take over world',
      'completed': false,
      'editing': false,
    },
    {
      'id': 3,
      'name': 'One more thing',
      'completed': false,
      'editing': false,
    },
  ];

  constructor() { }

  addTodo(todoName: string): void {
    this.todos.push({
      id: this.idForTodo,
      name: todoName,
      completed: false,
      editing: false
    })

    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.beforeEditCache = todo.name;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.name.trim().length === 0) {
      todo.name = this.beforeEditCache;
    }
    todo.editing = false;
  }

  cancelEdit(todo: Todo): void {
    todo.name = this.beforeEditCache;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  todosFiltered(): Todo[] {
    if (this.filter === 'all') {
      return this.todos;
    } else if (this.filter === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.filter === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }
}
