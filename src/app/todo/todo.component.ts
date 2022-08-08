import { MessageService } from './../message.service';
import { Component, OnInit } from '@angular/core';
import { Todo } from '../Todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

  constructor(private todoService: TodoService, public messageService: MessageService) { }
 
  todolist: Todo[] = [];

 

  currentTodo: Todo = {
    id: 0,
    name: ''
  }
  setCurrentTodo(todo: Todo): void{
    this.currentTodo.id = todo.id;
    this.currentTodo.name = todo.name
  }
  resetCurrentTodo(){
    this.currentTodo.id = 0;
    this.currentTodo.name = '';
  }

  getTodos(): void{
    this.todoService.getTodos().subscribe((data)=> {
        this.todolist = data;
    })
  }
  addTodo(name: string){
    this.todoService.addTodo({name: name} as Todo).subscribe()
    this.resetCurrentTodo()
    this.getTodos();
  }
 
  updateTodo(id: number, name: string){
    this.todoService.updateTodo({id, name} as Todo).subscribe()
    this.resetCurrentTodo()
    this.getTodos()
  }

  deleteTodo(id: number):void {
    this.todoService.deleteTodo(id).subscribe()
    this.resetCurrentTodo()
    this.getTodos()
  }

  deleteAllTodo(){
    this.todoService.deleteAll();
    this.getTodos()
    this.messageService.setMessage("success", "Delete all todo success!")
  }

  onSubmit(){
    if(this.currentTodo.name === ''){
      this.messageService.setMessage('error', 'name is require!')
      return;
    }else if(this.currentTodo.id === 0){
        this.addTodo(this.currentTodo.name)
    }else if(this.currentTodo.id !== 0){
        this.updateTodo(this.currentTodo.id, this.currentTodo.name)
    }
  }




  ngOnInit(): void {
    this.getTodos()
  }

}
