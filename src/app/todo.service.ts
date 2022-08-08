import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { Todo } from './Todo';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  private todoUrl = 'api/todolist';

  constructor(private http: HttpClient,  private messageService: MessageService) { }

  private log(type : string, message: string) {
    this.messageService.setMessage(type, message);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getTodos(): Observable<Todo[]>{
    return this.http.get<Todo[]>(this.todoUrl)
    .pipe(
      catchError(this.handleError<Todo[]>('getTodos', []))
    );;
  };

  addTodo(todo: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.todoUrl, todo, this.httpOptions).pipe(
      tap(() => this.log('success', 'Add todo success!'), // this function will send message to messageService
      catchError(this.handleError<Todo>('add Todo'))
      ))
  };

  updateTodo(todo: Todo): Observable<any>{
    return this.http.put(this.todoUrl, todo, this.httpOptions).pipe(
      tap(()=> this.log('success', 'Update todo success!'))
    )
  }

  deleteTodo(id: number): Observable<Todo>{
    const url = `${this.todoUrl}/${id}`;
    return this.http.delete<Todo>(url, this.httpOptions).pipe(
      tap(() => this.log('success', 'Delete todo success!')), // this function will send message to messageService
      catchError(this.handleError<Todo>('deleteHero'))
    );
  }

  deleteAll(): void{
    this.getTodos().subscribe((data)=> {
      let urlToDelete = '';
      for(let todo of data){
        urlToDelete = `${this.todoUrl}/${todo.id}`;
        this.http.delete<Todo>(urlToDelete, this.httpOptions).pipe(
          catchError(this.handleError<Todo>('deleteHero'))
        ).subscribe();
      }
    })
  }
  
}
