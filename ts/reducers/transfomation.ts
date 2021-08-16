import {transformationTypes} from '../redux-types';

const initialState: TransformationState = {
    translation: {
        x: 0,
        y: 0,
    },
    scale: {
        x: 1,
        y: 1,
    },
    rotation: {
        center: true,
        coords: null,
        degrees: 0,
    },
    mirror: {
        coords: {
            x: 1,
            y: null,
        },
    },
};

interface TransformationAction {
    type: string;
}

const transformationReducer = (
    state = initialState,
    action: TransformationAction,
) => {
    switch (action.type) {
    case transformationTypes.ADD:
        return state;
    default:
        return state;
    }
};

export default transformationReducer;
