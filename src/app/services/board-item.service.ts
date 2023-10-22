import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { BoardItem } from '../models/boardItem';

@Injectable({
  providedIn: 'root'
})
export class BoardItemService {

  private http = inject(HttpClient);
  private baseURL = environment.apiUrl + "boardItems";

  createBoard(boardName: string){
    return this.http.post<BoardItem>(this.baseURL,boardName);
  }

  getBoards(){
    return this.http.get<BoardItem[]>(this.baseURL);
  }

  updateBoard(updatedBoard: BoardItem){
    let boardId:string = updatedBoard.boardId;
    return this.http.put<BoardItem>(this.baseURL + '/' + boardId.toString(),{id: boardId,boardItem: updatedBoard});
  }
}
