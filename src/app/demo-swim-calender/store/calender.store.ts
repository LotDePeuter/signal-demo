import {computed, inject, resource} from '@angular/core';
import {patchState, signalStore, withComputed, withMethods, withProps, withState} from '@ngrx/signals';
import {Timeslot} from '../../shared/interfaces/timeslot.interface';
import {CalenderService} from '../services/calender.service';

type CalenderState = {
  date: Date;
  month:Date;
  timeSlots: Timeslot[];
};

const initialState: CalenderState = {
  date: new Date(),
  month:new Date(),
  timeSlots: [],
};

export const CalenderStore = signalStore(
  withState(initialState),
  withProps(() => ({
    _calenderService: inject(CalenderService),
  })),
  withProps((store) => ({
    _timeslotsResource: resource({
      request: store.date,
      loader: (params) => {
        const date = params.request;
        const abortSignal = params.abortSignal;
        return store._calenderService.timeslotsByMonthPromise(date,abortSignal);
      }
    }),
    _daySlotsResource: resource({
      request: store.date,
      loader: (params) => {
        const date = params.request;
        const abortSignal = params.abortSignal;
        return store._calenderService.timeslotsPromise(date,abortSignal);
      }
    }),
    _appointmentsResource: resource({
      request: store.date,
      loader: (params) => {
        const date = params.request;
        const abortSignal = params.abortSignal;
        return store._calenderService.appointmentsPromise(date, abortSignal);
      }
    }),
  })),
  withComputed((store) => ({
      reservedSpots: computed(() => store._appointmentsResource.value()),
  })),
  withComputed((store) => ({
    participants: computed(() => store.reservedSpots().map(spot => spot.customer)),
    timeslots: computed(() =>
      store._timeslotsResource.value()
    ),
    daySlots: computed(() =>
      store._daySlotsResource.value()
    ),
  })),
  withMethods((store) => ({
    setDate(date: Date): void {
      patchState(store, () => ({ date }));
    },
    setMonth(month:Date):void{
      patchState(store, () => ({ month }));
    }
  }))
);
