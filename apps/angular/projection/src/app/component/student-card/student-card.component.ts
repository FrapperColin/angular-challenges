import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FakeHttpService,
  randStudent,
} from '../../data-access/fake-http.service';
import { StudentStore } from '../../data-access/student.store';
import { Student } from '../../model/student.model';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-student-card',
  template: `
    <app-card
      class="bg-light-green"
      [items]="studentStore.students()"
      (onItemAdded)="onItemAdded()">
      <img image src="assets/img/student.webp" alt="student" width="200px" />

      <ng-template [cardRow]="studentStore.students()" let-student>
        <app-list-item
          [name]="student.firstName"
          (itemDeleted)="removeItem(student.id)" />
      </ng-template>
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
  imports: [CardComponent, CardRowDirective, ListItemComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudentCardComponent implements OnInit {
  studentStore: StudentStore = inject(StudentStore);
  #fakeHttpService: FakeHttpService = inject(FakeHttpService);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.#fakeHttpService.fetchStudents$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((students: Student[]) => this.studentStore.addAll(students));
  }

  onItemAdded(): void {
    this.studentStore.addOne(randStudent());
  }

  removeItem(id: number) {
    this.studentStore.deleteOne(id);
  }
}
