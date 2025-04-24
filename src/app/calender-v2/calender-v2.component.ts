import {Component, computed, inject, OnInit, resource, ResourceRef, signal} from '@angular/core';
import {DatePipe, JsonPipe} from '@angular/common';
import {AppointmentRequest} from '../shared/interfaces/appointment-request.interface';
import moment from 'moment';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {Appointment} from '../shared/interfaces/appointment.interface';
import {Timeslot} from '../shared/interfaces/timeslot.interface';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';
import {AppointmentComponent} from '../appointment/appointment.component';

@Component({
  selector: 'app-calender-v2',
  standalone: true,
  imports: [
    DatePipe,
    FaIconComponent,
    JsonPipe,
    AppointmentComponent
  ],
  templateUrl: './calender-v2.component.html'
})
export class CalenderV2Component implements OnInit {
  readonly datesToShow = computed(() => {
    return Array.from({length: moment(this.selectedDate()).daysInMonth()}, (_, day) => {
      return moment(this.selectedDate()).startOf('month').add(day, 'days').toDate();
    });
  });

  readonly currentDate = signal(new Date());
  readonly selectedDate = signal(new Date());
  readonly appointments = computed(() => this.madeAppointments.value());
  readonly timeslots = computed(() => this.slots.value());


  readonly #httpClient = inject(HttpClient);

  readonly madeAppointments = rxResource({
    request: (): AppointmentRequest => ({currentDate: this.selectedDate().toLocaleDateString()}),
    loader: ({request}) => {
      return this.#httpClient.get<Appointment[]>(`http://localhost:3000/appointments?week=${moment(request.currentDate).week()}`)
    },
  });

  readonly  slots = rxResource({
    request: (): AppointmentRequest => ({currentDate: this.selectedDate().toLocaleDateString()}),
    loader: ({request}) => {
      return this.#httpClient.get<Timeslot[]>(`http://localhost:3000/timeslots?week=${moment(request.currentDate).week()}`)
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
    this.selectedDate.set(moment(this.selectedDate()).add(1, 'week').toDate());
  }

  subtractWeek() {
    this.selectedDate.set(moment(this.selectedDate()).subtract(1, 'week').toDate());
  }

  getTimeSlot(date: string, hour: string): Timeslot {
    return this.timeslots()?.find((slot: Timeslot) => {
      return slot.date === date && slot.time === hour;
    })
  }
}
