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
  selector: 'app-calender',
  standalone: true,
  imports: [
    DatePipe,
    FaIconComponent,
    JsonPipe,
    AppointmentComponent
  ],
  templateUrl: './calender.component.html'
})
export class CalenderComponent implements OnInit {
  readonly workHours = ['10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];
  readonly datesToShow = computed(() => {
    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      days.push(moment().year(this.selectedDate().getFullYear()).week(moment(this.selectedDate()).week()).startOf('week').add(i, 'day').toDate());
    }
    return days;
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
