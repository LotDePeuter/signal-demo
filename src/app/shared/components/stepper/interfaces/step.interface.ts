
import { Type } from '@angular/core';
import {StepComponent} from './step-component.interface';
export interface Step {
  component: Type<StepComponent>;
  componentName?: string;
  redirectLink?: string;
}
