import {Component, computed, inject, input, OnInit, resource, ResourceRef, signal} from '@angular/core';
import {DatePipe, JsonPipe} from '@angular/common';
import {AppointmentRequest} from '../shared/interfaces/appointment-request.interface';
import moment from 'moment';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {Appointment} from '../shared/interfaces/appointment.interface';
import {Timeslot} from '../shared/interfaces/timeslot.interface';
import {HttpClient} from '@angular/common/http';
import {lastValueFrom} from 'rxjs';
import {rxResource} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
    DatePipe,
    FaIconComponent,
    JsonPipe
  ],
  templateUrl: './appointment.component.html'
})
export class AppointmentComponent {
  timeslot = input<Timeslot>();
  appointments = input<Appointment[]>();

  reservedSpots = computed(() =>
    this.appointments()?.filter((appointment: Appointment) => {
      return appointment.date === this.timeslot().date && appointment.time === this.timeslot().time;
    })
  )
}
