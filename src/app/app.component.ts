import { AfterContentInit, Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { BoardItemService } from './services/board-item.service';
import { BoardItem } from './models/boardItem';
import { Observable, Subject, Subscription, map, take } from 'rxjs';
import { TodoItemService } from './services/todo-item.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  ngOnDestroy(): void {
    this.updateSubscription$.unsubscribe();
    this.deleteSubscription$.unsubscribe();
  }

  eventsSubject: Subject<string> = new Subject<string>();

  ngOnInit(): void {

    this.boardService.getBoards();
    // this.boardService.boards$.pipe(map(
    //   boards => boards.map(board => this.boardService.todos$ = this.boardService.getTodosForBoard(board.boardId))
    // ));
  }

  public boardService = inject(BoardItemService);
  public todoService = inject(TodoItemService);
  
  title = 'myKanban';
  expandedIndex = 0;
  openBoardId:string = '';
  isEdit:boolean = false;
  isAdd: boolean = false;
  boardName:string = '';
  editBoardId:string = '';
  updateSubscription$:Subscription = new Subscription;
  deleteSubscription$:Subscription = new Subscription;
  createSubscription$:Subscription = new Subscription;
 

  addBoardHandler(){
    this.isAdd = true;
  }
  createBoard(createBoardForm: NgForm){
   
    this.createSubscription$ = this.boardService.createBoard(createBoardForm.value.addBoardName)
                                .pipe(take(1)).subscribe({
                                  error: e => console.error(e.error),
                                  complete: () => this.boardService.getBoards()
                                })
    this.isAdd = false;
  }
  
  deleteBoard(id: string){
    //this.boardService.
    this.deleteSubscription$ = this.boardService.deleteBoard(id).pipe(take(1)).subscribe({
      next: (response) => {this.boardService.getBoards()},
      error: e => console.error(e.error)
    });
  }
  
  editBoardName( id:string, name: string){
    this.isEdit = true;
    this.editBoardId = id;
    this.boardName = name;
  }

  saveChanges(boardForm: NgForm){
    this.boardName = boardForm.value.boardName;
    let updatedBoard:BoardItem = {boardId:this.editBoardId,boardName: this.boardName}
    this.updateSubscription$ = this.boardService.updateBoard(updatedBoard).pipe(take(1)).subscribe({
      error: e => console.error(e.error),
      complete: () => this.boardService.getBoards()
    });
    this.isEdit = false;
    
  }

  handleCancel(mode:string){
    if(mode == "edit"){
      this.isEdit = false;
    }
    else{
      this.isAdd = false;
    }
  }

  handleAccordionToggle(boardId: string){
    if(this.openBoardId === ''){
      this.openBoardId = boardId;
    }
    else if(this.openBoardId === boardId){
      if(this.todoService.updatedTodoItems.length > 0){
        this.todoService.bulkUpdateTodoItems();
      } 
      this.openBoardId = '';
    }
    else{
      if(this.todoService.updatedTodoItems.length > 0){
        this.todoService.bulkUpdateTodoItems();
      } 
      this.openBoardId = boardId;
    }
  }

  identify(index:any, item:any){
    return item.name; 
 }
}
