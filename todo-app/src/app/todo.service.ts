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

  URL = 'http://ec2-54-82-237-215.compute-1.amazonaws.com:3000';

  todos: Todo[] = [];

  constructor(private http: HttpClient) {
    this.http.get<any>(`${URL}/todos`).subscribe(data => {
      this.todos = data;
    });
  }

  addTodo(todoName: string): void {

    this.http.post<any>(`${URL}/todo`, { "name": `${todoName}`}).subscribe(data => {
      this.nextId = data;

      this.todos.push({
        id: this.nextId,
        name: todoName,
        completed: false,
        editing: false
      })
    })
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

    this.http.put<any>(`${URL}/todo`, {"id": todo.id, "name": `${todo.name}`, "completed": `${!todo.completed}`}).subscribe(data => {})

  }

  cancelEdit(todo: Todo): void {
    todo.name = this.nameBeforeEdit;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.http.delete<any>(`${URL}/todo/${id}`).subscribe(data => {})
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
