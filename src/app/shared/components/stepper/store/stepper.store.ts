import {ComponentRef, computed, InjectionToken} from '@angular/core';
import { Step } from '../interfaces/step.interface';
import {patchState, signalStore, withComputed, withMethods, withState} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { filter, Observable, of, pipe, switchMap, tap } from 'rxjs';
import {CurrentStep} from '../interfaces/current-step.type';
import {StepComponent} from '../interfaces/step-component.interface';
import {tapResponse} from '@ngrx/operators';

type StepperState = {
  steps: Step[];
  current: CurrentStep;
};

const initialState: StepperState = {
  steps: [],
  current: { index: 0, componentRef: null, step: {} as Step }
};

const STEPPER_STATE = new InjectionToken<StepperState>('StepperState', {
  factory: () => initialState,
});


export const StepperStore = signalStore(
  withState(initialState),
  withComputed(({ current, steps }) => ({
    hasPreviousStep: computed(() => current().index > 0),
    hasNextStep: computed(() => current().index < steps().length - 1),
    canGoToNextStep: computed(
      () =>
        current().index < steps().length &&
        (componentHasIsValidDefined(current().componentRef) ? current().componentRef.instance.isValid() : true)
    ),
    redirectLink: computed(() => current().step.redirectLink),
  })),
  withMethods((store) => ({
    setSteps(steps: Step[]): void {
      patchState(store, (state) => ({ steps: steps, current: { ...state.current, step: steps[0] } }));
    },
    setComponentRef(componentRef: ComponentRef<StepComponent>): void {
      patchState(store, (state) => ({ current: { ...state.current, componentRef: componentRef } }));
    },
    goToPreviousStep(): void {
      patchState(store, (state) => ({
        current: {
          ...state.current,
          index: --state.current.index,
          step: state.steps[state.current.index],
        },
      }));
    },
    goToNextStep: rxMethod<void>(
      pipe(
        switchMap(() => {
          return componentOnNextStep(store.current().componentRef).pipe(
            filter((nextStepHookIsValid) => nextStepHookIsValid && store.canGoToNextStep()),
            tapResponse({
              next: () => {
                patchState(store, (state) => ({
                  current: {
                    ...state.current,
                    index: ++state.current.index,
                    step: state.steps[state.current.index],
                  },
                }));
              },
              error: (error) => console.error('Stepper::an unexpected error occurred: ', { error }),
            })
          );
        })
      )
    ),
  }))
);

function componentHasIsValidDefined(componentRef: ComponentRef<StepComponent>): boolean {
  return componentRef?.instance.isValid !== undefined;
}

function componentOnNextStep(componentRef: ComponentRef<StepComponent>): Observable<boolean> {
  return componentRef?.instance.onNextStep !== undefined ? componentRef.instance.onNextStep() : of(true);
}
