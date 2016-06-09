export enum ACTIONS {
    ADD_TILE,
    REMOVE_TILE,
    UPDATE_AMOUNT,
    UPDATE_THRESHOLD
}

interface Action { type: ACTIONS }

export interface ActionAddTile extends Action {
    id: number;
    threshold: number;
}

export interface ActionRemoveTile extends Action {
    id: number;
}

export interface ActionUpdateAmount extends Action {
    amount: number;    
}

export interface ActionUpdateThreshold extends Action {
    threshold: number;
}
