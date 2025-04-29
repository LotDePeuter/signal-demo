import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AppointmentRequestV2} from '../shared/interfaces/appointment-request.interface';
import moment from 'moment';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {Appointment} from '../shared/interfaces/appointment.interface';
import {Timeslot} from '../shared/interfaces/timeslot.interface';
import {HttpClient} from '@angular/common/http';
import {rxResource} from '@angular/core/rxjs-interop';
import {AppointmentComponent} from '../appointment/appointment.component';
import {CalenderStepsFactory} from './calender-steps-factory';
import {CalenderStore} from './store/calender.store';
import {SlotsOverviewComponent} from './slots-overview/slots-overview.component';

@Component({
  selector: 'app-calender-v2',
  standalone: true,
  imports: [
    DatePipe,
    FaIconComponent,
    AppointmentComponent,
    SlotsOverviewComponent
  ],
  providers:[CalenderStore],
  templateUrl: './calender-v2.component.html'
})
export class CalenderV2Component implements OnInit {
  readonly #httpClient = inject(HttpClient);
  readonly #calenderStore = inject(CalenderStore);

  steps = CalenderStepsFactory.steps();
  readonly datesToShow = computed(() => {
    return Array.from({length: moment(this.selectedDate()).daysInMonth()}, (_, day) => {
      return moment(this.selectedDate()).startOf('month').add(day, 'days').toDate();
    });

  });

  readonly currentDate = signal(new Date());
  readonly selectedDate = this.#calenderStore.date;
  readonly appointments = computed(() => this.madeAppointments.value());
  readonly timeslots = computed(() => this.slots.value());
  readonly storeSlots = this.#calenderStore.timeslots;


  readonly madeAppointments = rxResource({
    request: (): AppointmentRequestV2 => ({currentDate: this.selectedDate()}),
    loader: ({request}) => {
      return this.#httpClient.get<Appointment[]>(`http://localhost:3000/appointments?month=${moment(request.currentDate).format('MM')}`)
    },
  });

  readonly slots = rxResource({
    request: (): AppointmentRequestV2 => ({currentDate: this.selectedDate()}),
    loader: ({request}) => {
      return this.#httpClient.get<Timeslot[]>(`http://localhost:3000/timeslots?month=${moment(request.currentDate).format('MM')}`)
    },
  });

  ngOnInit() {
    moment.updateLocale('en', {
      week: {
        dow: 1,
      }
    });
  }

  addWeek() {
    // this.selectedDate.set(moment(this.selectedDate()).add(1, 'week').toDate());
    this.#calenderStore.setDate(moment(this.selectedDate()).add(1, 'week').toDate());
  }

  subtractWeek() {
    // this.selectedDate.set(moment(this.selectedDate()).subtract(1, 'week').toDate());

    this.#calenderStore.setDate(moment(this.selectedDate()).subtract(1, 'week').toDate());
  }

  getTimeSlot(date: string, hour: string): Timeslot {
    return this.timeslots()?.find((slot: Timeslot) => {
      return slot.date === date && slot.time === hour;
    })
  }

  getTimeSlotByDate(date: string): Timeslot {
    return this.timeslots()?.find((slot: Timeslot) => {
      return slot.date === date;
    })
  }

  updateSelectedDate(date: Date) {
    console.log('updateSelectedDate', date, this.selectedDate(), this.#calenderStore.date())
    this.#calenderStore.setDate(date)
  }
}
