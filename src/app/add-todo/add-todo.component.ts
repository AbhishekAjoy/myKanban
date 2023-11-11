import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoItem } from '../models/todoItem';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrls: ['./add-todo.component.css']
})
export class AddTodoComponent {

  @Output()cancelEvent: EventEmitter<void> = new EventEmitter();

  todo:any = {name:'',estimate:'',timeSpent:'',status:'',boardId:''};

  handleCancel(){
    this.cancelEvent.emit();
  }

  createTodo(createForm:NgForm){

  }

}
