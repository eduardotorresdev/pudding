import Point from '../webgl/elements/point';
import Line from '../webgl/elements/line';
import Polyline from '../webgl/elements/polyline';
import Polygon from '../webgl/elements/polygon';
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
    setArea: function(xmin: number, ymin: number, xmax: number, ymax: number) {
        return {
            type: selectTypes.SET_AREA,
            xmin: xmin,
            ymin: ymin,
            xmax: xmax,
            ymax: ymax,
        };
    },
    setElements: function(elements: Array<Point | Line | Polyline | Polygon>) {
        return {
            type: selectTypes.SET_ELEMENTS,
            elements,
        };
    },
};
