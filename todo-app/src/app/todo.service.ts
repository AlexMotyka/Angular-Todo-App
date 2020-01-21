import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoName: string = '';
  idForTodo: number = 4;

  nameBeforeEdit: string = '';
  searchCriteria: string = 'all';

  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any>('http://127.0.0.1:3000/todos').subscribe(data => {
      this.todos = data;
    });
  }

  addTodo(todoName: string): void {

    this.todos.push({
      id: this.idForTodo,
      name: todoName,
      completed: false,
      editing: false
    })

    this.idForTodo++;

    this.http.post<any>('http://127.0.0.1:3000/todo', { "name": `${todoName}`}).subscribe(data => {})
  }

  editTodo(todo: Todo): void {
    this.nameBeforeEdit = todo.name;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.name.trim().length === 0) {
      todo.name = this.nameBeforeEdit;
    }
    todo.editing = false;

    this.http.put<any>('http://127.0.0.1:3000/todo', {"id": todo.id, "name": `${todo.name}`}).subscribe(data => {})

  }

  cancelEdit(todo: Todo): void {
    todo.name = this.nameBeforeEdit;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    // TODO: create a DELETE query to delete todo by id
    this.todos = this.todos.filter(todo => todo.id !== id);
  }

  todosFiltered(): Todo[] {
    if (this.searchCriteria === 'all') {
      return this.todos;
    } else if (this.searchCriteria === 'active') {
      return this.todos.filter(todo => !todo.completed);
    } else if (this.searchCriteria === 'completed') {
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }
}
