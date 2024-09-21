import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedStateServiceService {

  private jiraDataAvailableSubject = new BehaviorSubject<boolean>(false);
  jiraDataAvailable$ = this.jiraDataAvailableSubject.asObservable();

  setJiraDataAvailable(value: boolean) {
    this.jiraDataAvailableSubject.next(value);
  }

}
