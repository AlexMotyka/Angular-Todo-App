import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoName: string = '';
  nextId: number;

  nameBeforeEdit: string = '';
  searchCriteria: string = 'all';

  // ec2 instance node server url
  ec2URL: string = 'http://ec2-54-82-237-215.compute-1.amazonaws.com:3000';

  // local copy of the todos that is always identical to the database contents
  todos: Todo[] = [];

  // runs on startup and populates the list with existing todos
  constructor(private http: HttpClient) {
    this.http.get<any>(`${this.ec2URL}/todos`).subscribe(data => {
      this.todos = data;
    });
  }

  addTodo(todoName: string): void {
    // request the server create a todo
    this.http.post<any>(`${this.ec2URL}/todo`, { "name": `${todoName}`}).subscribe(data => {
      // the next id for the local todo is equal to the returned id from the server
      this.nextId = data;
      // create a copy of the todo in the local array
      this.todos.push({
        id: this.nextId,
        name: todoName,
        completed: false,
        editing: false
      })
    })
  }
  // save the name of the todo in case the user cancels the edit
  editTodo(todo: Todo): void {
    this.nameBeforeEdit = todo.name;
    todo.editing = true;
  }
  // complete the edit and update the todo
  doneEdit(todo: Todo): void {
    // make sure the name is not empty
    if (todo.name.trim().length === 0) {
      // if it is revert to the name from before the edit
      todo.name = this.nameBeforeEdit;
    }
    todo.editing = false;
    // request that the server updates the todo
    this.http.put<any>(`${this.ec2URL}/todo`, {"id": todo.id, "name": `${todo.name}`, "completed": `${!todo.completed}`}).subscribe(data => {})

  }

  // cancel the edit due to a click away or escape key hit
  cancelEdit(todo: Todo): void {
    todo.name = this.nameBeforeEdit;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    // delete the local copy of the todo
    this.todos = this.todos.filter(todo => todo.id !== id);
    // request the server to delete the todo
    this.http.delete<any>(`${this.ec2URL}/todo/${id}`).subscribe(data => {})
  }

  // filter the todos based on the completion status
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
