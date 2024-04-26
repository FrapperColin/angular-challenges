import { NgTemplateOutlet } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      class="bg-light-green"
      [items]="students()"
      (onItemAdded)="onItemAdded()">
      <img image src="assets/img/student.webp" alt="student" width="200px" />

      @for (student of students(); track student.id) {
        <app-list-item
          [name]="student.firstName"
          [id]="student.id"
          (itemDeleted)="onItemRemoved($event)" />
      } @empty {
        <p>No students available, it's friday morning</p>
      }
    </app-card>
  `,
  standalone: true,
  styles: [
    `
      .bg-light-green {
        background-color: rgba(0, 250, 0, 0.1);
      }
    `,
  ],
  imports: [CardComponent, NgTemplateOutlet, ListItemComponent],
})
export class StudentCardComponent implements OnInit {
  #studentStore: StudentStore = inject(StudentStore);
  #fakeHttpService: FakeHttpService = inject(FakeHttpService);

  students: Signal<Array<Student>> = toSignal(this.#studentStore.students$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.#fakeHttpService.fetchStudents$.subscribe((s) =>
      this.#studentStore.addAll(s),
    );
  }

  onItemAdded(): void {
    this.#studentStore.addOne(randStudent());
  }

  onItemRemoved(id: number) {
    this.#studentStore.deleteOne(id);
  }
}
