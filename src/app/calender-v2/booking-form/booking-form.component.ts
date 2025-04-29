import { Component } from '@angular/core';
import {StepComponent} from '../../shared/components/stepper/interfaces/step-component.interface';

@Component({
  selector: 'app-booking-form',
  imports: [],
  templateUrl: './booking-form.component.html',
  standalone: true,
})
export class BookingFormComponent implements StepComponent{

}
