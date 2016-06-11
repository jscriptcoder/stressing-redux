import { createStore, combineReducers } from 'redux'
import * as actions from './actions'
import reducers from './reducers';
import TilesGrid from './components/tiles-grid'

const store = createStore(reducers);
const tilesGrid = new TilesGrid(document.getElementById('tiles-grid'));

tilesGrid.onbuttonclick = () => {
	store.dispatch(actions.addTile());
}

store.subscribe(() => {
	const state = store.getState();
	console.log(state);
});