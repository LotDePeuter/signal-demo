import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {FaIconLibrary} from '@fortawesome/angular-fontawesome';
import {fas} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  standalone: true,
})
export class AppComponent {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }

}
