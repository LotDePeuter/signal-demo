import { ChangeDetectionStrategy, Component, inject, viewChild, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import {StepperStore} from '../store/stepper.store';

@Component({
  selector: 'ui-stepper-view',
  standalone: true,
  template: ` <div class="relative">
    <div class="pb-6">
      <ng-container #viewContainerStepper />
    </div>
  </div>`,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class StepperViewComponent {
  viewContainerRef = viewChild('viewContainerStepper', { read: ViewContainerRef });

  readonly #store = inject(StepperStore);

  readonly watchCurrentStep = toObservable(this.#store.current.step)
    .pipe(
      filter(() => this.#store.current().step !== undefined),
      takeUntilDestroyed()
    )
    .subscribe({
      next: () => {
        this.viewContainerRef().clear();
        console.log('stepper-view', this.#store.current().step.component);
        const componentRef = this.viewContainerRef().createComponent(this.#store.current().step.component);
        componentRef.changeDetectorRef.markForCheck();
        this.#store.setComponentRef(componentRef);
      },
    });
}
