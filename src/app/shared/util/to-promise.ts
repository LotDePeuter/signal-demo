import {firstValueFrom, Observable, ReplaySubject, takeUntil} from 'rxjs';

export async function toPromise<T>(
  observable: Observable<T>,
  signal: AbortSignal | undefined = undefined,
): Promise<T> {
  const abortSubject = new ReplaySubject<void>(1);
  if (signal) {
    signal.addEventListener('abort', () => abortSubject.next());
  }
  return await firstValueFrom(observable.pipe(takeUntil(abortSubject)));
}
