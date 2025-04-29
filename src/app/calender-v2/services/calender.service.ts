import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Timeslot} from '../../shared/interfaces/timeslot.interface';
import moment from 'moment/moment';
import {toPromise} from '../../shared/util/to-promise';
import {Observable} from 'rxjs';
import {Appointment} from '../../shared/interfaces/appointment.interface';

@Injectable({
  providedIn: 'root',
})
export class CalenderService {
  readonly #httpClient = inject(HttpClient);

  getTimeslots(date: Date): Observable<Timeslot[]> {
   return  this.#httpClient.get<Timeslot[]>(`http://localhost:3000/timeslots?date=${moment(date).format('yyyy-MM-DD')}`)
  }

  getTimeSlotsByMonth(date: Date): Observable<Timeslot[]> {
    return  this.#httpClient.get<Timeslot[]>(`http://localhost:3000/timeslots?month=${moment(date).format('MM')}`)

  }

  getAppointments(date:Date): Observable<Appointment[]> {
    return  this.#httpClient.get<Appointment[]>(`http://localhost:3000/appointments?date=${moment(date).format('yyyy-MM-DD')}`)
  }
  timeslotsPromise(date: Date, abortSignal?: AbortSignal): Promise<Timeslot[]> {
    return toPromise(this.getTimeslots(date), abortSignal);
  }

  timeslotsByMonthPromise(date: Date, abortSignal?: AbortSignal): Promise<Timeslot[]> {
    return toPromise(this.getTimeSlotsByMonth(date), abortSignal);
  }

  appointmentsPromise(date: Date, abortSignal?: AbortSignal): Promise<Appointment[]> {
    return toPromise(this.getAppointments(date), abortSignal);
  }
}
