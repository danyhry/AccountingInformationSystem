import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export abstract class Base implements OnDestroy {

  protected destroy$: Subject<any>;

  constructor() {
    this.destroy$ = new Subject<void>();

    const destroyFunc = this.ngOnDestroy;
    this.ngOnDestroy = () => {
      destroyFunc.bind(this)();
      this.destroy$.next(true);
      this.destroy$.complete();
    };
  }

  ngOnDestroy() {
  }

}
