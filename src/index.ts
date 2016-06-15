import './index.scss'
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
const tileId2Subscription: { [tileId: string]: Subscription } = {};

// will be used to keep track of the changes
let currState = store.getState();

store.subscribe(() => {
	const newState = store.getState();

	if (newState !== currState) { // is there any change ?

		if (newState.length > currState.length) { // new tile

			const newTile = newState[newState.length - 1];

			console.log('Added new tile:', newTile);

			tilesGridView.addTile(newTile);
			tileId2Subscription[newTile.id] = serviceAmount.subscribe((amount: number) => {
				store.dispatch(actions.updateTileAmount(newTile.id, amount));
			});

		} else if (newState.length < currState.length) { // tile deleted

			const removedTile = currState.find((tile: TileModel) => newState.indexOf(tile) === -1);

			console.log('Tile removed:', removedTile);			

			tilesGridView.removeTile(removedTile.id);
			tileId2Subscription[removedTile.id].unsubscribe();
			delete tileId2Subscription[removedTile.id];

		} else { // tile updated

			let currTile: TileModel;
			const updatedTile = newState.find((tile: TileModel, index: number) => {
				currTile = currState[index];
				return tile !== currTile;
			});

			if (updatedTile.amount !== currTile.amount) { // amount has changed

				tilesGridView.updateTileAmount(updatedTile.id, updatedTile.amount);

			} else if (updatedTile.threshold !== currTile.threshold) { // threshold has changed

				tilesGridView.updateOtherTilesThreshold(
					updatedTile.id, 
					updatedTile.threshold - currTile.threshold
				);
				
			}
		}

		currState = store.getState();
	}
});
