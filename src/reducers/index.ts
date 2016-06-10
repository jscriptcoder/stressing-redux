import 'es6-shim'
import {
	ACTIONS,
	TilesGridActions,
	TileActions
} from '../actions'
import Tile from '../models/tile'
import * as utils from '../utils'



//////////////
// Reducers //
//////////////

// TilesGrid reducer
export const tilesGrid = (state: Tile[] = [], action: TilesGridActions): Tile[] => {

	switch (action.type) {
		case ACTIONS.ADD_TILE:
			let newState = state.slice();
			newState.push(Object.assign(new Tile(), {
				id: utils.uid(),
				threshold: utils.random(40, 50)
			}));
			return newState;
		
		case ACTIONS.REMOVE_TILE:
			return state.filter((tile: Tile) => tile.id !== action.id);

		default:
			return state;
	}

}

// Tile reducer
export const tile = (state: Tile, action: TileActions): Tile => {

	switch (action.type) {
		case ACTIONS.UPDATE_AMOUNT:
			return Object.assign(new Tile(), {
				id: state.id,
				amount: action.amount,
				threshold: state.threshold
			});
			break;

		case ACTIONS.UPDATE_THRESHOLD:
			return Object.assign(new Tile(), {
				id: state.id,
				amount: state.amount,
				threshold: action.threshold
			});
			break;

		default:
			return state;
	}

}