import {Component, computed, effect, input, linkedSignal, output, signal} from '@angular/core';
import {NameComponentComponent} from './name-component/name-component.component';

@Component({
  selector: 'app-basic-signal',
  imports: [
    NameComponentComponent
  ],
  standalone: true,
  template: `
    <button (click)="add()" type="button"
            class="text-white bg-blue-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  focus:outline-none">
      Add Q
    </button>
    <button (click)="subtract()" type="button"
            class="text-white bg-fuchsia-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
      Subtract Q
    </button>
    <button (click)="empty()" type="button"
            class="text-white bg-emerald-700 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none">
      Empty Q
    </button>

    <app-name-component [(nameModel)]="nameModel" ></app-name-component>

    <div class="flex flex-col">
      <span class="font-bold">Angular 16:</span>
      <div class="flex flex-col">
        <p>Price: {{ price() }}</p>
        <p> Quantity: {{ quantity() }}</p>
        <p>Total Cost: {{ totalCost() }}</p>
        <p>Name: {{nameModel()}}</p>
      </div>
    </div>
  `
})
export class BasicComponent {
  constructor() {
    effect(() => {
      console.log(`current price is ${this.price()}`)
      console.log(`current quantity is ${this.quantity()}`)
    })
  }

  //Angular 16
  price = signal(10);
  quantity = signal(5);

  totalCost = computed(() => (this.price() * this.quantity()));

  subtract() {
    this.quantity.update((quantity) => quantity - 1);
  }

  add() {
    this.quantity.update((quantity) => quantity + 1);
  }

  empty() {
    this.quantity.set(0);
  }

  //Angular 17-18

  name = input<string>();
  nameModel= signal<string>('');
  height = input.required<number>();

  nameChange = output<string>();

  setName(name: string) {
    this.nameChange.emit(name);
  }

//Angular 19
  options = signal(['apple', 'banana', 'fig']);

  choice = linkedSignal(() => this.options()[0]);
  updateChoice() {
    this.choice.set('fig');
    // console.log(choice()); // fig
  }

  updateOptions() {
    this.options.set(['peach', 'kiwi']);
    // console.log(choice()); // peach
  }

}

