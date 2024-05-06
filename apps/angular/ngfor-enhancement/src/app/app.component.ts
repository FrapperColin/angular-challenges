import { NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgForEmpty } from './emptyfor.directive';

export interface Person {
  name: string;
}

@Component({
  standalone: true,
  imports: [NgFor, NgForEmpty],
  selector: 'app-root',
  template: `
    <div
      *ngFor="let person of persons; ifEmpty: emptyTemplate; another: another">
      {{ person }}
    </div>
    <ng-template #another>another one !!</ng-template>

    <ng-template #emptyTemplate>The list is empty !!</ng-template>
    <button (click)="clear()">Clear</button>
    <button (click)="add()">Add</button>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  persons?: string[] = undefined;

  clear() {
    this.persons = [];
  }
  add() {
    if (!this.persons) this.persons = [];
    this.persons?.push('sqqs');
  }
}
