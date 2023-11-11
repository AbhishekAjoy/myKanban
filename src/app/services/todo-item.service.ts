import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TodoItem } from '../models/todoItem';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  private http = inject(HttpClient);
  private baseURL = environment.apiUrl + "todoItems";
  public updatedTodoItems:TodoItem[] = [];

  createTodoItem(newTodoItem: TodoItem){
    return this.http.post<TodoItem>(this.baseURL,newTodoItem);
  }

  bulkUpdateTodoItems(){
    for(let i = 0; i < this.updatedTodoItems.length; i++){
      this.updateTodoItem(this.updatedTodoItems[i]).subscribe({
        error: e => console.error(e.error)
      });
    }
    this.updatedTodoItems = [];
  }

  updateTodoItem(updatedTodoItem: TodoItem){
    let todoId:string = updatedTodoItem.id;
    //console.log(this.baseURL);
    return this.http.put<TodoItem>(this.baseURL + '/'+ todoId,updatedTodoItem);
  }

  getTodoItems(){
    return this.http.get<TodoItem[]>(this.baseURL);
  }

  deleteTodoItem(id: string){
    return this.http.delete<TodoItem>(this.baseURL + '/' + id);
  }
}
