import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TodoItem } from '../models/todoItem';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  private http = inject(HttpClient);
  private baseURL = environment.apiUrl + "todoItems";

  createTodoItem(newTodoItem: TodoItem){
    return this.http.post<TodoItem>(this.baseURL,newTodoItem);
  }

  updateTodoItem(updatedTodoItem: TodoItem){
    let todoId:string = updatedTodoItem.id;
    return this.http.put<TodoItem>(this.baseURL + '/'+ todoId.toString(),{id:todoId,todoDTO:updatedTodoItem});
  }

  getTodoItems(){
    return this.http.get<TodoItem[]>(this.baseURL);
  }

  deleteTodoItem(id: string){
    return this.http.delete<TodoItem>(this.baseURL + '/' + id);
  }
}
