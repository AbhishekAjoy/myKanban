import { Component } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-statusbox',
  templateUrl: './statusbox.component.html',
  styleUrls: ['./statusbox.component.css']
})
export class StatusboxComponent {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];
  progress = ['Check e-mail', 'Walk dog'];
  onhold = ['Gym'];
  done = ['Get up', 'Brush teeth', 'Take a shower' ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
