import 'rxjs/add/observable/fromEvent'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import Component from './component'

const TILE_TMPL = `
<div class="tile">
	<div class="row">
		<div class="amount">
	</div>
	<div class="row">
		<input type="range" min="0" max="100" />
	</div>
</div>
`;

export default class Tile extends Component {

	private amount: HTMLElement;
	private range: HTMLElement;
	private rangeSubscription: Subscription;

	constructor(container: HTMLElement) {
		super(container);
		this.buildDOM();
	}

	protected buildDOM(): void {
		this.el = Component.string2Element(TILE_TMPL);
		this.amount = this.findElement('.amount');
		this.range = this.findElement('input');

		this.rangeSubscription = Observable
			.fromEvent(this.range, 'change')
			.subscribe(this.onrangechange);
	}

	public onrangechange(): void {}

	public destroy(): void {
		this.rangeSubscription.unsubscribe();
	}

}