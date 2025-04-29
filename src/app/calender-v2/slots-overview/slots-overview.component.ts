import {Component, computed, inject, signal} from '@angular/core';
import {StepComponent} from '../../shared/components/stepper/interfaces/step-component.interface';
import {CalenderStore} from '../store/calender.store';
import {rxResource} from '@angular/core/rxjs-interop';
import {AppointmentRequestV2} from '../../shared/interfaces/appointment-request.interface';
import moment from 'moment/moment';
import {Appointment} from '../../shared/interfaces/appointment.interface';
import {Timeslot} from '../../shared/interfaces/timeslot.interface';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-slots-overview',
  imports: [],
  standalone: true,
  templateUrl: './slots-overview.component.html'
})
export class SlotsOverviewComponent implements StepComponent {
  isValid = signal(true);
  #store = inject(CalenderStore);

  date = this.#store.date;
  readonly #httpClient = inject(HttpClient);


  readonly appointments = computed(() => this.madeAppointments.value());
  readonly timeslots = computed(() => this.slots.value());
  readonly participants = computed(() => this.#store.participants());
  readonly reservedSpots = computed(() => this.#store.reservedSpots());


  readonly madeAppointments = rxResource({
    request: (): AppointmentRequestV2 => ({currentDate: this.date()}),
    loader: ({request}) => {
      return this.#httpClient.get<Appointment[]>(`http://localhost:3000/appointments?month=${moment(request.currentDate).format('MM')}`)
    },
  });

  readonly slots = rxResource({
    request: (): AppointmentRequestV2 => ({currentDate: this.date()}),
    loader: ({request}) => {
      return this.#httpClient.get<Timeslot[]>(`http://localhost:3000/timeslots?month=${moment(request.currentDate).format('MM')}`)
    },
  });
}
