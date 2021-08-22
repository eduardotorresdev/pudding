import {selectTypes} from '../redux-types';
import Line from '../webgl/elements/line';
import Point from '../webgl/elements/point';
import Polygon from '../webgl/elements/polygon';
import Polyline from '../webgl/elements/polyline';

interface SelectAction {
    type: string;
    xmin?: number;
    ymin?: number;
    xmax?: number;
    ymax?: number;
    elements?: Array<Point | Line | Polyline | Polygon>
}

interface SelectState {
    active: boolean;
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    elements?: Array<Point | Line | Polyline | Polygon>;
}

const initialState: SelectState = {
    active: false,
    xmin: 0,
    ymin: 0,
    xmax: 0,
    ymax: 0,
    elements: [],
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
            xmin: action.xmin,
            ymin: action.ymin,
            xmax: action.xmax,
            ymax: action.ymax,
        };
        return state;
    case selectTypes.SET_ELEMENTS:
        state = {
            ...state,
            elements: action.elements,
        };
        return state;
    default:
        return state;
    }
};

export default selectReducer;
