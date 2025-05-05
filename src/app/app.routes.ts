import {Routes} from '@angular/router';
import {CalenderComponent} from './calender/calender.component';
import {BasicComponent} from './demo-basic-signal/basic-signals.component';
import {SwimCalenderComponent} from './demo-swim-calender/swim-calender.component';

export const routes: Routes = [
  {
    path: 'old', component: CalenderComponent
  },
  {
    path: 'demo', component: BasicComponent
  },
  {
    path: '**', component: SwimCalenderComponent
  }
];
