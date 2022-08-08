import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Todo } from './Todo';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService{
  createDb() {
    const todolist: Todo[] = [
      {id: 11, name: "Do homework"},
      {id: 12, name: "Swimming"},
      {id: 13, name: "Play sorce"}

    ];
    return {todolist};
  }
  genId(todolist: Todo[]): number {
    return todolist.length > 0 ? Math.max(...todolist.map(todo => todo.id)) + 1 : 11;
  }
  constructor() { }
}
