import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Standing } from '../models/standing';
import { FixtureResult } from '../models/fixture';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  // A HashMap to store the cache. The key is the page and the value is the data.
  private cache = new Map<string, Standing[] | FixtureResult[] | string | number>();
  // BehaviorSubject that will contain the updated cache data.
  public cache$ = new BehaviorSubject<Standing[] | FixtureResult[] | string | number>([]);

  // The 'set' method for storing data in the cache.
  set(key: string, data: Standing[] | FixtureResult[] | string | number): void {
    // We check if data already exists for this key.
    if (this.cache.has(key)) {
      // If it already exists, we throw an exception to prevent overwriting the data.
      throw new Error(`Data already exists for key '${key}'. Use a different key or delete the existing one first.`);
    }
    // If there is no data for this key, we store it in the cache and update the BehaviorSubject.
    this.cache.set(key, data);
    this.cache$.next(this.cache.get(key) as Standing[] | FixtureResult[] | string | number);
  }

  // The 'get' method for retrieving data from the cache.
  get(key: string): Standing[] | FixtureResult[] | string | number {
    // We retrieve the data from the cache and update the BehaviorSubject.
    const data = this.cache.get(key);
    this.cache$.next(data as Standing[] | FixtureResult[] | string | number);
    return data as Standing[] | FixtureResult[] | string | number;
  }

  // The 'clear' method to clear data from the cache.
  clear(key: string): void {
    // We remove the data from the cache and update the BehaviorSubject.
    this.cache.delete(key);
    this.cache$.next([]);
  }
}
