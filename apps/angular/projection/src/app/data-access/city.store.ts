import { Injectable, WritableSignal, signal } from '@angular/core';
import { City } from '../model/city.model';

@Injectable({
  providedIn: 'root',
})
export class CityStore {
  cities: WritableSignal<City[]> = signal<City[]>([]);

  addAll(cities: City[]) {
    this.cities.set(cities);
  }

  addOne(city: City) {
    this.cities.update((cities) => [...cities, city]);
  }

  deleteOne(id: number) {
    this.cities.set(this.cities().filter((city: City) => city.id !== id));
  }
}
