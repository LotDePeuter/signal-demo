import {Routes} from '@angular/router';
import {CalenderComponent} from './calender/calender.component';

export const routes: Routes = [
  {
    path: '**', component: CalenderComponent
  }
];
