import {Component, model} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-name-component',
  imports: [
    FormsModule
  ],
  standalone: true,
  template: `
    <div class="my-4 p-2">
      <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
      <input
        type="text"
        [(ngModel)]="nameModel"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="John" required/>
    </div>
  `
})
export class NameComponentComponent {
  nameModel = model<string>()
}

