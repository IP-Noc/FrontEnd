import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor() { }

  private itemSource = new BehaviorSubject<{ apLink?: string, number?: number }>({});
  item = this.itemSource.asObservable();

  private typeGraphSource = new BehaviorSubject<string>('');
  typeGraph = this.typeGraphSource.asObservable();

  private valuesSource = new BehaviorSubject<number>(0);
  values = this.valuesSource.asObservable();

  updateItem(item: { apLink?: string, number?: number }) {
    this.itemSource.next(item);
  }

  updateTypeGraph(type: string) {
    this.typeGraphSource.next(type);
  }

  updateValues(values: number) {
    this.valuesSource.next(values);
  }}
