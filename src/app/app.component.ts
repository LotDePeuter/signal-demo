import {Component, computed, effect, input, output, signal} from '@angular/core';
import {RouterOutlet} from '@angular/router';
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
    effect(() => {
      console.log(`current price is ${this.price()}`)
      console.log(`current quantity is ${this.quantity()}`)
    })

    const options = signal(['apple', 'banana', 'fig']);

// Choice defaults to the first option, but can be changed.
    const choice = linkedSignal(() => options()[0]);
    console.log(choice()); // apple

    choice.set('fig');
    console.log(choice()); // fig

// When options change, choice resets to the new default value.
    options.set(['peach', 'kiwi']);
    console.log(choice()); // peach

  }

  // Create two signals: price and quantity
  price = signal(10);
  quantity = signal(5);

  // Create a computed signal for total cost based on price and quantity
  totalCost = computed(() => (this.price() * this.quantity()));

  //console.log(this.totalCost()); --> Output: 50

  subtract() {
    this.quantity.update((quantity) => quantity - 1);
  }

  //console.log(this.totalCost()); --> Output: 40

  add() {
    this.quantity.update((quantity) => quantity + 1);
  }

  //console.log(this.totalCost()); --> Output: 50
  empty() {
    this.quantity.set(0);
  }

  //console.log(this.totalCost()); --> Output: 0

// Optional - undefined is default value
  name = input<string>();

// Required - value must be provided
  height = input.required<number>();

  nameChange = output<string>();

  setName(name: string) {
    this.nameChange.emit(name);
  }
}

