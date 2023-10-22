import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Todo Board';
  items = ['Board 1', 'Board 2', 'Board 3'];
  expandedIndex = 0;
}
