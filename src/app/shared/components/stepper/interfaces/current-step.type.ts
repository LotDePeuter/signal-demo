import { ComponentRef } from '@angular/core';
import {StepComponent} from './step-component.interface';
import {Step} from './step.interface';

export type CurrentStep = {
  index: number;
  componentRef: ComponentRef<StepComponent>;
  step: Step;
};
