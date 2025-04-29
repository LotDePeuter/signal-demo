import { Component } from '@angular/core';
import {StepComponent} from '../../shared/components/stepper/interfaces/step-component.interface';

@Component({
  selector: 'app-confirmation',
  imports: [],
  templateUrl: './confirmation.component.html',
  standalone: true
})
export class ConfirmationComponent implements StepComponent{

}
