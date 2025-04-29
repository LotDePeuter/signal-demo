import { Observable } from 'rxjs';
import { Signal } from '@angular/core';

export interface StepComponent {
  isValid?: Signal<boolean>;

  onNextStep?(): Observable<boolean>;
}
