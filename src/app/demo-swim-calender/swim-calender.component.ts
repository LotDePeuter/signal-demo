import {Component, computed, inject, OnInit, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import {AppointmentRequestV2} from '../shared/interfaces/appointment-request.interface';
import moment from 'moment';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {Timeslot} from '../shared/interfaces/timeslot.interface';
import {HttpClient} from '@angular/common/http';
import {rxResource} from '@angular/core/rxjs-interop';
import {CalenderStore} from './store/calender.store';
import {SlotsOverviewComponent} from './slots-overview/slots-overview.component';

@Component({
  selector: 'app-swim-calender',
  standalone: true,
  imports: [
    DatePipe,
    FaIconComponent,
    SlotsOverviewComponent
  ],
  providers: [CalenderStore],
  templateUrl: './swim-calender.component.html'
})
export class SwimCalenderComponent implements OnInit {
  readonly #httpClient = inject(HttpClient);
  readonly #calenderStore = inject(CalenderStore);

  readonly datesToShow = computed(() => {
    return Array.from({length: moment(this.selectedDate()).daysInMonth()}, (_, day) => {
      return moment(this.selectedDate()).startOf('month').add(day, 'days').toDate();
    });

  });

  readonly currentDate = signal(new Date());
  readonly selectedDate = this.#calenderStore.date;
  readonly timeslots = computed(() => this.slots.value());
  readonly storeSlots = this.#calenderStore.timeslots;


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
    this.#calenderStore.setDate(moment(this.selectedDate()).add(1, 'week').toDate());
  }

  subtractWeek() {
    this.#calenderStore.setDate(moment(this.selectedDate()).subtract(1, 'week').toDate());
  }

  getTimeSlotByDate(date: string): Timeslot {
    return this.timeslots()?.find((slot: Timeslot) => {
      return slot.date === date;
    })
  }

  updateSelectedDate(date: Date) {
    this.#calenderStore.setDate(date)
  }
}
