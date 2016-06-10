import 'rxjs/add/observable/fromEvent'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import Component from './component'
import Tile from './tile';

const TILES_GRID_TMPL = `
<div class="tiles-grid">
	<div class="actions">
		<button>Add Tile</button>
	</div>
	<div class="list"></div>
</div>
`;

export default class TilesGrid extends Component {

	private tiles: Tile[] = [];
	private button: HTMLElement;
	private list: HTMLElement;
	private clickSubscription: Subscription;

	constructor(container: HTMLElement) {
		super(container);
		this.buildDOM();
	}

	protected buildDOM(): void {
		this.el = Component.string2Element(TILES_GRID_TMPL);
		this.button = this.findElement('button');
		this.list = this.findElement('.list');

		this.clickSubscription = Observable
			.fromEvent(this.button, 'click')
			.subscribe(this.onbuttonclick);
	}

	// must be set outside
	public onbuttonclick(): void {}

	public destroy(): void {
		for (let tile of this.tiles) {
			tile.destroy();
		}
		this.clickSubscription.unsubscribe();
	}

}