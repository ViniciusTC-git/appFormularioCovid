import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  private show: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private timeout: any;

  get canShow(): Observable<boolean> {
    return this.show.asObservable();
  }

  open(duration?: number) {
    this.show.next(true);

    if (!duration) return;

    this.timeout = setTimeout(() => this.hide(), duration);
  }

  hide() {
    this.show.next(false);

    if (this.timeout) clearTimeout(this.timeout);

    this.timeout = null;
  }

  constructor() { }

}
