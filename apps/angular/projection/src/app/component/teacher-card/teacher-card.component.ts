import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { Teacher } from '../../model/teacher.model';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      class="bg-light-red"
      [items]="teacherStore.teachers()"
      (onItemAdded)="onItemAdded()">
      <img image src="assets/img/teacher.png" alt="teacher" width="200px" />

      <ng-template [cardRow]="teacherStore.teachers()" let-teacher>
        <app-list-item
          [name]="teacher.firstName"
          (itemDeleted)="removeItem(teacher.id)" />
      </ng-template>
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
  imports: [CardComponent, ListItemComponent, CardRowDirective],
})
export class TeacherCardComponent implements OnInit {
  teacherStore: TeacherStore = inject(TeacherStore);
  #fakeHttpService: FakeHttpService = inject(FakeHttpService);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.#fakeHttpService.fetchTeachers$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((teachers: Array<Teacher>) =>
        this.teacherStore.addAll(teachers),
      );
  }

  onItemAdded(): void {
    this.teacherStore.addOne(randTeacher());
  }

  removeItem(id: number) {
    this.teacherStore.deleteOne(id);
  }
}
