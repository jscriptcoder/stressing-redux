import './index.scss'
import { appStore, TilesGridState } from './store'
import { TileModel } from './models/tile'
import * as view from './view'

appStore.subscribe((newState: TilesGridState, oldState: TilesGridState) => {

	if (appStore.stateHasChanged()) {

		if (appStore.isNewItem()) {

			const newTile = newState[newState.length - 1];
			view.addTile(newTile);

		} else if (appStore.isItemDeleted()) {

			const oldTile = oldState.find((tile: TileModel) => newState.indexOf(tile) === -1);
			view.removeTile(oldTile);

		} else {

			let oldTile: TileModel;
			const newTile = newState.find((tile: TileModel, index: number) => {
				oldTile = oldState[index];
				return tile !== oldTile;
			});

			view.updateTile(newTile, oldTile);
		}
	}
});