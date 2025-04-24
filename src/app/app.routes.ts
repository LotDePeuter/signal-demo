import {Routes} from '@angular/router';
import {CalenderComponent} from './calender/calender.component';
import {CalenderV2Component} from './calender-v2/calender-v2.component';

export const routes: Routes = [
  {
    path: 'v2', component: CalenderV2Component
  },
  {
    path: '**', component: CalenderComponent
  }
];
