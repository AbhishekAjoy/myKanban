import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, inject } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { BoardItemService } from '../services/board-item.service';
import { TodoItem } from '../models/todoItem';
import { Observable, Subscription, map, take } from 'rxjs';
import { TodoItemService } from '../services/todo-item.service';


@Component({
  selector: 'app-statusbox',
  templateUrl: './statusbox.component.html',
  styleUrls: ['./statusbox.component.css']
})
export class StatusboxComponent implements OnChanges,OnDestroy{
  ngOnDestroy(): void {
    this.deleteTodoSubscription$.unsubscribe();
    this.fetchTodoSubscription$.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges): void {

    if (changes['boardId'] && changes['boardId'].currentValue) {
      this.fetchTodosForBoard();
    }
  }


  @Input() boardId:string = '';
  public boardService = inject(BoardItemService);
  public todoService = inject(TodoItemService);

  todoItems: TodoItem[] =[];
  todos:TodoItem[] = [];
  progress:TodoItem[] = [];
  onhold:TodoItem[] = [];
  done:TodoItem[] = [];
  deleteTodoSubscription$: Subscription = new Subscription;
  fetchTodoSubscription$: Subscription = new Subscription;


  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      let item = this.todoItems.find(t => t.name === event.previousContainer.data[0].name);
      if(item !== undefined){
        let status = event.container.id.split('-').pop();
        if(status !== undefined){
          item.status = parseInt(status) % 4;
          // console.log('prev: '+event.previousContainer.data[0]+',status: '+item.status);
          let isReUpdatedItem = this.todoService.updatedTodoItems.map(t => t.id).indexOf(item.id);
          if(isReUpdatedItem !== undefined){
            this.todoService.updatedTodoItems.splice(isReUpdatedItem,1);
          }
          this.todoService.updatedTodoItems.push(item);
        }
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  deleteTodo(id: string){
    this.deleteTodoSubscription$ = this.todoService.deleteTodoItem(id).pipe(take(1)).subscribe({
      error: e => console.error(e),
      complete: () => this.fetchTodosForBoard()
    })
  }

  fetchTodosForBoard(){
    this.fetchTodoSubscription$ = this.boardService.getTodosForBoard(this.boardId).subscribe({
      next: response => {
        if(response !== null){
          this.todoItems = response;
          this.todos = response.filter(t => t.status == 0);
          this.progress = response.filter(t => t.status == 1);
          this.onhold = response.filter(t => t.status == 2);
          this.done = response.filter(t => t.status == 3);
        }
        
      },
      error: e => {
        console.error(e.error);
      }
    });
  }
  saveBoard(boardId: string){
    console.log('Save todos '+boardId);
  }
}
