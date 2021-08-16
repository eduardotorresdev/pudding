import {elementTypes} from '../redux-types';

/**
 * setElement
 * @param {string} element
 * @return {ElementAction}
 */
export const elementActions = {
    setElement: function(element: string) {
        return {
            type: elementTypes.SET_ELEMENT,
            element: element,
        };
    },
};
