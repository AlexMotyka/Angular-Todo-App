import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  nextId: number = 3
  todoName: string = '';
  // hard coded todos for now
  todos: Todo[] = [
    {
      'id': 1,
      'name': 'Finish assignment 1',
      'isEditing': false,
      'isComplete': false,
    },
    {
      'id': 2,
      'name': 'Finish Capstone',
      'isEditing': false,
      'isComplete': false,
    },
  ];
  constructor() { }

  addTodo(todoName: string): void {
    // Make sure the name is not empty
    if(todoName.trim().length === 0){
      todoName = "YOU FORGOT TO NAME ME";
    }

    this.todos.push({
      id: this.nextId,
      name: todoName,
      isEditing: false,
      isCompleted: false
    });

    this.nextId = this.nextId + 1;
  }
}
