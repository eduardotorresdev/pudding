import {elementTypes} from '../redux-types';

interface ElementAction {
    type: string;
    element: string | null;
}

const initialState: string | null = null;
const elementReducer = (state = initialState, action: ElementAction) => {
    switch (action.type) {
    case elementTypes.SET_ELEMENT:
        if (state === action.element) return null;

        state = action.element;
        return state;
    default:
        return state;
    }
};

export default elementReducer;
