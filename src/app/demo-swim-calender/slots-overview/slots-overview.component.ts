import {Component, computed, inject, signal} from '@angular/core';
import {CalenderStore} from '../store/calender.store';
import {Appointment} from '../../shared/interfaces/appointment.interface';
import {Timeslot} from '../../shared/interfaces/timeslot.interface';
import {DatePipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-slots-overview',
  imports: [
    DatePipe,
    NgClass
  ],
  standalone: true,
  templateUrl: './slots-overview.component.html'
})
export class SlotsOverviewComponent {
  isValid = signal(true);
  #store = inject(CalenderStore);

  date = this.#store.date;
  daySlots= this.#store.daySlots;
  reservedSpots = this.#store.reservedSpots;

  readonly participants = computed(() => this.#store.participants());

  spotsInSlot(slot: Timeslot) : Appointment[]{
   return  this.reservedSpots()?.filter(spot => {
      return spot.time === slot.time;
    })
  }

  partipantsInSlot(slot: Timeslot) : string[]{
    return this.spotsInSlot(slot).map(spot => spot.customer);
  }
}
