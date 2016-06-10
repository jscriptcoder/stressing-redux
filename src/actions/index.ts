export enum ACTIONS {
    ADD_TILE,
    REMOVE_TILE,
    UPDATE_AMOUNT,
    UPDATE_THRESHOLD
}

interface Action { type: ACTIONS }

export interface ActionTilesGrid extends Action {
    id?: number;   
}

export interface ActionTile extends Action {
    amount?: number;
    threshold?: number;
}

export const addTile = (): ActionTilesGrid => {
	return { type: ACTIONS.ADD_TILE };
}

export const removeTile = (id: number): ActionTilesGrid => {
	return { type: ACTIONS.REMOVE_TILE, id };
}

export const updateAmount = (amount: number): ActionTile => {
	return { type: ACTIONS.UPDATE_AMOUNT, amount };
}

export const updateThreshold = (threshold: number): ActionTile => {
	return { type: ACTIONS.UPDATE_THRESHOLD, threshold };
}