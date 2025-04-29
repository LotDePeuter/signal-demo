import {computed} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import {Timeslot} from '../../shared/interfaces/timeslot.interface';
import {Appointment} from '../../shared/interfaces/appointment.interface';

type CalenderState = {
  date: Date;
  timeSlots: Timeslot[];
  reservedSpots: Appointment[];
};

const initialState: CalenderState = {
  date: new Date(),
  timeSlots: [],
  reservedSpots: [],
};

export const CalenderStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    participants: computed(() => store.reservedSpots().map(spot => spot.customer)),
  })),
  withMethods((store) => ({
    setDate(date: Date): void {
      patchState(store, () => ({ date }));
    },
  }))
);
