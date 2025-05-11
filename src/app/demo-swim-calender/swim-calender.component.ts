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

  readonly currentDate = signal(new Date());
  readonly timeslots = computed(() => this.slots.value());
  readonly selectedMonth = this.#calenderStore.month
  readonly daySlots = this.#calenderStore.daySlots;

  readonly datesToShow = computed(() => {
    return Array.from({length: moment(this.selectedMonth()).daysInMonth()}, (_, day) => {
      return moment(this.selectedMonth()).startOf('month').add(day, 'days').toDate();
    });

  });

  readonly slots = rxResource({
    request: (): AppointmentRequestV2 => ({currentDate: this.selectedMonth()}),
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

  addMonth() {
    this.#calenderStore.setMonth(moment(this.selectedMonth()).add(1, 'month').toDate());
  }

  subtractMonth() {
    this.#calenderStore.setMonth(moment(this.selectedMonth()).subtract(1, 'month').toDate());
  }

  getTimeSlotByDate(date: string): Timeslot {
    return this.timeslots()?.find((slot: Timeslot) => {
      return slot.date === date;
    })
  }

  updateSelectedDate(date: Date) {
    this.#calenderStore.setDate(date)
    this.#calenderStore.setMonth(date)
  }
}
