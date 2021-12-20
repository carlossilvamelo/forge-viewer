import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'forge-viewer';
  tiles: any[] = [
    { text: 'menu', cols: 1, rows: 1, color: 'lightblue' }
  ];
}
