import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  message = {
    type: '',
    message: ''
  }
  clearMessage(){
    this.message.type = '';
    this.message.message = '';
  }
  setMessage(type: string,message: string){
    this.message.type = type
    this.message.message = message
    setTimeout(()=> {
      this.clearMessage();
    }, 3000)
   
  }
 
  constructor() { }
}
