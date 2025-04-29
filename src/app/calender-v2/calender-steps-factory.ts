import {SlotsOverviewComponent} from './slots-overview/slots-overview.component';
import {BookingFormComponent} from './booking-form/booking-form.component';
import {ConfirmationComponent} from './confirmation/confirmation.component';
import {Step} from '../shared/components/stepper/interfaces/step.interface';

export class CalenderStepsFactory {
  static steps(): Step[] {
    return [
      {
        component: SlotsOverviewComponent,
        componentName: 'slot-overview'
      },
      {
        component: BookingFormComponent,
        componentName: 'booking-form',
      },
      {
        component: ConfirmationComponent,
        componentName: 'confirmation',
      },
    ];
  }
}
