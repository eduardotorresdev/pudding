import {selectTypes} from '../redux-types';

interface SelectAction {
    type: string;
    x: number;
    y: number;
    width: number;
    height: number;
}

const initialState: SelectState = {
    active: false,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
};

const selectReducer = (state = initialState, action: SelectAction) => {
    switch (action.type) {
    case selectTypes.ACTIVATE:
        state = {...state, active: true};
        return state;
    case selectTypes.DEACTIVATE:
        state = {...state, active: false};
        return state;
    case selectTypes.TOGGLE:
        state = {...state, active: !state.active};
        return state;
    case selectTypes.SET_AREA:
        state = {
            ...state,
            x: action.x,
            y: action.y,
            width: action.width,
            height: action.height,
        };
        return state;
    default:
        return state;
    }
};

export default selectReducer;
