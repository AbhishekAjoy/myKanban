import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BoardItem } from '../models/boardItem';
import { Observable, map, mergeMap } from 'rxjs';
import { TodoItem } from '../models/todoItem';

@Injectable({
  providedIn: 'root'
})
export class BoardItemService {

  private http = inject(HttpClient);
  private baseURL = environment.apiUrl + "boardItems";
  boards$:Observable<BoardItem[]> = new Observable();

  createBoard(boardName: string){
    const options = boardName ?
   { params: new HttpParams().set('BName', boardName) } : {};
    return this.http.post(this.baseURL,boardName,options);
  }

  getBoards(){
    this.boards$ =  this.http.get<BoardItem[]>(this.baseURL);
  }

  getTodosForBoard(boardId: string){
    return this.http.get<TodoItem[]>(this.baseURL + '/' + boardId + '/todos');
  }

  updateBoard(updatedBoard: BoardItem){
    let boardId:string = updatedBoard.boardId;
    return this.http.put<BoardItem>(this.baseURL + '/' + boardId,updatedBoard);
  }

  deleteBoard(id: string){
    return this.http.delete<BoardItem>(this.baseURL+ '/' + id);
  }
}
