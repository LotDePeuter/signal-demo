import { ChangeDetectionStrategy, Component, inject, input, OnInit } from '@angular/core';
import {StepperStore} from './store/stepper.store';
import {StepperViewComponent} from './stepper-view/stepper-view.component';
import {StepperNavigationComponent} from './stepper-navigation/stepper-navigation.component';
import {Step} from './interfaces/step.interface';

@Component({
  selector: 'app-stepper',
  standalone: true,
  templateUrl: 'stepper.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [StepperViewComponent, StepperNavigationComponent],
})
export class StepperComponent implements OnInit {
  steps = input.required<Step[]>();
  stepperName = input<string>();

  readonly #store = inject(StepperStore);

  ngOnInit(): void {
    this.#store.setSteps(this.steps());
  }
}
