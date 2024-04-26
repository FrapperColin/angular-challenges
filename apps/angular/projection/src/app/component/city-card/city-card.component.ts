import { Component, inject, OnInit, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';
import { ListItemComponent } from '../../ui/list-item/list-item.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      class="bg-light-blue"
      [items]="cities()"
      (onItemAdded)="onItemAdded()">
      <img image src="assets/img/city.png" alt="city" width="200px" />

      @for (city of cities(); track city.id) {
        <app-list-item
          [name]="city.name"
          [id]="city.id"
          (itemDeleted)="onItemRemoved($event)" />
      } @empty {
        <p>Fallout</p>
      }
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
  imports: [CardComponent, ListItemComponent],
})
export class CityCardComponent implements OnInit {
  #cityStore: CityStore = inject(CityStore);
  #fakeHttpService: FakeHttpService = inject(FakeHttpService);

  cities: Signal<Array<City>> = toSignal(this.#cityStore.cities$, {
    initialValue: [],
  });

  ngOnInit(): void {
    this.#fakeHttpService.fetchCities$.subscribe((s) =>
      this.#cityStore.addAll(s),
    );
  }

  onItemAdded() {
    this.#cityStore.addOne(randomCity());
  }

  onItemRemoved(id: number) {
    this.#cityStore.deleteOne(id);
  }
}
