export enum ACTIONS {
    ADD_TILE,
    REMOVE_TILE,
    UPDATE_AMOUNT,
    UPDATE_THRESHOLD
}



//////////////////
// Action Types //
//////////////////

interface Action { type: ACTIONS }

interface ActionAddTile extends Action {}

interface ActionRemoveTile extends Action {
    id: number;
}

export type TilesGridActions = ActionAddTile | ActionRemoveTile;

interface ActionUpdateAmount extends Action {
    amount: number;
}

interface ActionUpdateThreshold extends Action {
    threshold: number;
}

export type TileActions = ActionUpdateAmount | ActionUpdateThreshold;



/////////////////////
// Action Creators //
/////////////////////

// TilesGrid action creators
export const addTile = (): ActionAddTile => {
	return { type: ACTIONS.ADD_TILE };
}

export const removeTile = (id: number): ActionRemoveTile => {
	return { type: ACTIONS.REMOVE_TILE, id };
}



// Tile action creators
export const updateAmount = (amount: number): ActionUpdateAmount => {
	return { type: ACTIONS.UPDATE_AMOUNT, amount };
}

export const updateThreshold = (threshold: number): ActionUpdateThreshold => {
	return { type: ACTIONS.UPDATE_THRESHOLD, threshold };
}