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
  //// TODO: this will become an empty array on init once the server is up
  // todos: Todo[] = [
  //   {
  //     'id': 1,
  //     'name': 'Finish Angular Screencast',
  //     'completed': false,
  //     'editing': false,
  //   },
  //   {
  //     'id': 2,
  //     'name': 'Take over world',
  //     'completed': false,
  //     'editing': false,
  //   },
  //   {
  //     'id': 3,
  //     'name': 'One more thing',
  //     'completed': false,
  //     'editing': false,
  //   },
  // ];
  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any>('http://127.0.0.1:3000/todos').subscribe(data => {
      this.todos = data;
    });
  }

  addTodo(todoName: string): void {

    //// TODO: create POST query to create a new todo
    this.todos.push({
      id: this.idForTodo,
      name: todoName,
      completed: false,
      editing: false
    })

    this.idForTodo++;
  }

  editTodo(todo: Todo): void {
    this.nameBeforeEdit = todo.name;
    todo.editing = true;
  }

  doneEdit(todo: Todo): void {
    if (todo.name.trim().length === 0) {
      todo.name = this.nameBeforeEdit;
    }
    //TODO: create PUT query to update todo name by id
    todo.editing = false;
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
      //// TODO: create GET query to return all uncompleted todos
      return this.todos.filter(todo => !todo.completed);
    } else if (this.searchCriteria === 'completed') {
      //// TODO: create GET query to return all completed todos
      return this.todos.filter(todo => todo.completed);
    }

    return this.todos;
  }
}
