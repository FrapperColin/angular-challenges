import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { NgForEmpty } from './emptyfor.directive';

export interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgForEmpty],
  selector: 'app-root',
  template: `
    <div *ngFor="let person of persons; ifEmpty: emptyTemplate">
      {{ person }}
    </div>
    <ng-template #emptyTemplate>The list is empty !!</ng-template>
    <button (click)="clear()">Clear</button>
    <button (click)="add()">Add</button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons: string[] = [];

  clear() {
    this.persons = [];
  }
  add() {
    this.persons = [uuidv4(), ...this.persons];
  }
}
