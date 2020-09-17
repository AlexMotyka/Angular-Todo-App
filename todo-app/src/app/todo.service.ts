import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from './todo';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  todoName: string = '';

  loggedIn: boolean = false;
  nameBeforeEdit: string = '';
  searchCriteria: string = 'all';

  // ec2 instance node server url
  // ec2URL: string = 'http://ec2-35-153-83-228.compute-1.amazonaws.com:3000';
  ec2URL: string = 'http://127.0.0.1:3000';



  // local copy of the todos that is always identical to the database contents
  todos: Todo[] = [];
  user = {} as User;

  // runs on startup and populates the list with existing todos
  constructor(private http: HttpClient) {}

  getTodos(userId: string): void{
    this.http.get<any>(`${this.ec2URL}/todos/${userId}`).subscribe(data => {
      this.todos = data;
    });
  }

  addTodo(todoName: string, userId: string): void {
    // request the server create a todo
    this.http.post<any>(`${this.ec2URL}/todo`, { "name": `${todoName}`, "userId": `${userId}`}).subscribe(data => {
      // the next id for the local todo is equal to the returned id from the server
      const id = data._id;
      // create a copy of the todo in the local array
      this.todos.push({
        _id: id,
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
      // if it is empty revert to the name from before the edit
      todo.name = this.nameBeforeEdit;
    }
    todo.editing = false;
    // request that the server updates the todo
    this.http.put<any>(`${this.ec2URL}/todo/${todo._id}`, {"name": `${todo.name}`, "completed": `${todo.completed}`}).subscribe(data => {})

  }

  updateCompletion(todo: Todo): void {
    this.http.put<any>(`${this.ec2URL}/todo/${todo._id}`, {"name": `${todo.name}`, "completed": `${!todo.completed}`}).subscribe(data => {})
  }

  // cancel the edit due to a click away or escape key hit
  cancelEdit(todo: Todo): void {
    todo.name = this.nameBeforeEdit;
    todo.editing = false;
  }

  deleteTodo(id: number): void {
    // delete the local copy of the todo
    this.todos = this.todos.filter(todo => todo._id !== id);
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

  async loginUser(email: string, password: string) : Promise<User> {
    try {
      let response = await this.http.post<any>(`${this.ec2URL}/user/login`,{"email": `${email}`, "password": `${password}`})
      .toPromise();
      this.user.name = response.name;
      this.user.email = response.email;
      this.user._id = response._id;
      this.user.password = response.password
      console.log("Service login: ", this.user)
      return this.user
    } catch (error) {
      console.log(error)
    }
   
  }
}
