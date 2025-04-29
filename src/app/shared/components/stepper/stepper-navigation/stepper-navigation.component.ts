import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {StepperStore} from '../store/stepper.store';

@Component({
  selector: 'ui-stepper-navigation',
  standalone: true,
  templateUrl: 'stepper-navigation.component.html',
  imports: [CommonModule, RouterLink],
})
export class StepperNavigationComponent {
  stepperName = input<string>();

  readonly #store = inject(StepperStore);

  private readonly NEXT_BUTTON_LABEL_KEY = 'enterprise-global.btn.next';
  private readonly PREVIOUS_BUTTON_LABEL_KEY = 'enterprise-global.btn.previous';

  canGoToNextStep = this.#store.canGoToNextStep;
  hasPreviousStep = this.#store.hasPreviousStep;
  hasNextStep = this.#store.hasNextStep;
  current = this.#store.current;
  redirectLink = this.#store.redirectLink;

  hasLabelConfiguration = computed(() => !!this.stepperName() && this.current().step.componentName);

  nextLabel = computed(() => {
    return this.hasLabelConfiguration()
      ? `ng.${this.stepperName()}.step.${this.current().step.componentName}.btn.next`
      : this.NEXT_BUTTON_LABEL_KEY;
  });

  previousLabel = computed(() => {
    return this.hasLabelConfiguration()
      ? `ng.${this.stepperName()}.step.${this.current().step.componentName}.btn.previous`
      : this.PREVIOUS_BUTTON_LABEL_KEY;
  });

  redirectLinkLabel = computed(() => `ng.${this.stepperName()}.step.${this.current().step.componentName}.lnk.redirect`);

  goToNextStep(): void {
    this.#store.goToNextStep();
  }

  goToPreviousStep(): void {
    this.#store.goToPreviousStep();
  }
}
