import {selectTypes} from '../redux-types';

/**
 * setElement
 * @param {string} element
 * @return {ElementAction}
 */
export const selectActions = {
    activate: function() {
        return {
            type: selectTypes.ACTIVATE,
        };
    },
    deactivate: function() {
        return {
            type: selectTypes.DEACTIVATE,
        };
    },
    toggle: function() {
        return {
            type: selectTypes.TOGGLE,
        };
    },
    setArea: function(x: number, y: number, width: number, height: number) {
        return {
            type: selectTypes.SET_AREA,
            x: x,
            y: y,
            width: width,
            height: height,
        };
    },
};
