import { createStore, combineReducers } from 'redux'
import { Subscription } from 'rxjs/Subscription';
import { serviceAmount } from './backend'
import * as actions from './actions'
import tilesGridReducer from './reducers';
import TileModel from './models/tile'
import TilesGrid from './components/tiles-grid'

const store = createStore(tilesGridReducer);
const tilesGridView = new TilesGrid(document.getElementById('tiles-grid'));



tilesGridView.onbuttonclick = () => {
	store.dispatch(actions.addTile());
}

tilesGridView.ontilecloseclick = (tileId: number) => {
	store.dispatch(actions.removeTile(tileId));
}

tilesGridView.ontilerangechange = (tileId: number, threshold: number) => {
	store.dispatch(actions.updateTileThreshold(tileId, threshold));
}


// will keep track of subscription to the backend
const tileId2Subscription: { [tileId: number]: Subscription } = [];

// will be used to keep track of the changes
let oldState = store.getState();

store.subscribe(() => {
	const state = store.getState();
	//console.log(state);

	if (state !== oldState) { // is there any change ?

		if (state.length > oldState.length) {
			// new tile added
			const newTile = state[state.length - 1];
			tilesGridView.addTile(newTile);

			tileId2Subscription[newTile.id] = serviceAmount.subscribe((amount: number) => {
				store.dispatch(actions.updateTileAmount(newTile.id, amount));
			});

		} else if (state.length < oldState.length) {
			// tile removed
			const removedTile = oldState.find((tile: TileModel) => state.indexOf(tile) === -1)
			tilesGridView.removeTile(removedTile.id);

			tileId2Subscription[removedTile.id].unsubscribe();
		} else {
			// tile updated
			let oldTile: TileModel;
			const updatedTile = state.find((tile: TileModel, index: number) => {
				oldTile = oldState[index];
				return tile !== oldTile
			});

			if (updatedTile.amount !== oldTile.amount) {
				// amount has changed
				tilesGridView.updateTileAmount(updatedTile.id, updatedTile.amount);
			} else if (updatedTile.threshold !== oldTile.threshold) {
				// threshold has changed

			}
		}

		oldState = store.getState();
	}
});