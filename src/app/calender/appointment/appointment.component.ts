import {Component, computed, input} from '@angular/core';
import {Appointment} from '../../shared/interfaces/appointment.interface';
import {Timeslot} from '../../shared/interfaces/timeslot.interface';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [
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
