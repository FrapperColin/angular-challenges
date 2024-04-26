import { Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      class="bg-light-red"
      [items]="teachers()"
      (onItemAdded)="onItemAdded()">
      <img image src="assets/img/teacher.png" alt="teacher" width="200px" />

      @for (teacher of teachers(); track teacher.id) {
        <app-list-item
          [name]="teacher.firstName"
          [id]="teacher.id"
          (itemDeleted)="onItemRemoved($event)" />
      } @empty {
        <p>No teacher available, they are not paid enough</p>
      }
    </app-card>
  `,
  styles: [
    `
      .bg-light-red {
        background-color: rgba(250, 0, 0, 0.1);
      }
    `,
  ],
  standalone: true,
  imports: [CardComponent, ListItemComponent],
})
export class TeacherCardComponent implements OnInit {
  #teacherStore: TeacherStore = inject(TeacherStore);
  #fakeHttpService: FakeHttpService = inject(FakeHttpService);

  teachers: Signal<Array<Teacher>> = toSignal(this.#teacherStore.teachers$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.#fakeHttpService.fetchTeachers$.subscribe((t) =>
      this.#teacherStore.addAll(t),
    );
  }

  onItemAdded(): void {
    this.#teacherStore.addOne(randTeacher());
  }

  onItemRemoved(id: number) {
    this.#teacherStore.deleteOne(id);
  }
}
