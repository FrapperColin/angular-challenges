import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  OnInit,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardRowDirective } from '../../ui/card/card-row.directive';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      class="bg-light-blue"
      [items]="cityStore.cities()"
      (onItemAdded)="onItemAdded()">
      <img image src="assets/img/city.png" alt="city" width="200px" />

      <ng-template [cardRow]="cityStore.cities()" let-city>
        <app-list-item [name]="city.name" (itemDeleted)="removeItem(city.id)" />
      </ng-template>
    </app-card>
  `,
  styles: [
    `
      .bg-light-blue {
        background-color: rgba(0, 191, 255, 0.1);
      }
    `,
  ],

  standalone: true,
  imports: [CardComponent, ListItemComponent, CardRowDirective],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CityCardComponent implements OnInit {
  cityStore: CityStore = inject(CityStore);
  #fakeHttpService: FakeHttpService = inject(FakeHttpService);
  #destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.#fakeHttpService.fetchCities$
      .pipe(takeUntilDestroyed(this.#destroyRef))
      .subscribe((cities: Array<City>) => this.cityStore.addAll(cities));
  }

  onItemAdded() {
    this.cityStore.addOne(randomCity());
  }

  removeItem(id: number) {
    this.cityStore.deleteOne(id);
  }
}
