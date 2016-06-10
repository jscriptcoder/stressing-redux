import { Observable } from 'rxjs/Observable'
import { Observer } from  'rxjs/Observer'
import { Subscription } from 'rxjs/Subscription'
import { random } from '../utils'

class ServiceAmount {

	private createObservable(): Observable<number> {
		return Observable.create((observer: Observer<number>) => {
			const interval = random(200, 2000);
			const timerId = setInterval(() => observer.next(random(1, 100)), interval);
			return () => clearInterval(timerId);
		});
	}

	public subscribe(callback: {(amount: number): void}): Subscription {
		// one observable per subscription
		const observable = this.createObservable();
		return observable.subscribe(callback);
	}

}