import 'rxjs/add/observable/fromEvent'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'
import { TileModel } from '../models/tile'
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
	private buttonEl: HTMLElement;
	private listEl: HTMLElement;
	private clickSubscription: Subscription;

	constructor(container: HTMLElement) {
		super(container);
		this.buildDOM();
	}

	protected buildDOM(): void {
		this.el = Component.string2Element(TILES_GRID_TMPL);
		this.buttonEl = this.findElement('button');
		this.listEl = this.findElement('.list');

		this.clickSubscription = Observable
			.fromEvent(this.buttonEl, 'click')
			.subscribe(this.onbuttonclick);

		this.container.appendChild(this.el);
	}

	// must be set outside
	public onbuttonclick(): void {}

	public addTile(tileModel: TileModel): void {
		let tile = new Tile(this.listEl, `${tileModel.id}`);
		tile.amount = `${tileModel.amount}`;
		tile.threshold = `${tileModel.threshold}`;
		this.tiles.push(tile);
	}

	public removeTile(id: string) {
		const tileIdx = this.tiles.findIndex((tile: Tile) => tile.id === id);
		const tile = this.tiles.splice(tileIdx, 1)[0];
		tile.destroy();
	}

	public destroy(): void {
		for (let tile of this.tiles) {
			tile.destroy();
		}
		this.clickSubscription.unsubscribe();
	}

}