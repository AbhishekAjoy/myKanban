import { Component, EventEmitter, OnDestroy, Output, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoCreate, TodoItem } from '../models/todoItem';
import { BoardItemService } from '../services/board-item.service';
import { TodoItemService } from '../services/todo-item.service';
import { Subscription, take } from 'rxjs';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent implements OnDestroy {
  ngOnDestroy(): void {
    this.createTodoSubscription$.unsubscribe();
  }

  @Output()cancelEvent: EventEmitter<void> = new EventEmitter();

  todo:TodoCreate = {name:'',estimate:'',timeSpent:'',status:0,boardId:''};
  createTodoSubscription$: Subscription = new Subscription;
  statuses:string[] = ['Todo','In Progress','On Hold', 'Done']
  boardService = inject(BoardItemService);
  todoService = inject(TodoItemService);
  selectedBoardName = '';
  selectedStatus = 0;

  handleCancel(){
    this.cancelEvent.emit();
  }

  createTodo(createForm:NgForm){
    let v = createForm.value;
    
    let estimate = ((v.edays === ''?'0':v.edays)??'0') +'d'
                  +((v.ehours === ''?'0':v.ehours)??'0') +'h' 
                  +((v.eminutes === ''?'0':v.eminutes)??'0') +'m'
                  +((v.eseconds === ''?'0':v.eseconds)??'0') +'s';
    let timeSpent = ((v.tdays === ''?'0':v.tdays)??'0') + 'd'
                  +((v.thours === ''?'0':v.thours)??'0') +'h' 
                  +((v.tminutes === ''?'0':v.tminutes)??'0') +'m' 
                  +((v.tseconds === ''?'0':v.tseconds)??'0') +'s';
    this.todo.estimate = estimate;
    this.todo.timeSpent = timeSpent;
    this.createTodoSubscription$ = this.todoService.createTodoItem(this.todo).pipe(take(1)).subscribe({
      next: () => this.cancelEvent.emit(),
      error: e => console.error(e),
      complete: () => this.boardService.getBoards()
    });
  }

}
