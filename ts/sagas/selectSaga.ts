import {take} from 'redux-saga/effects';
import {store} from '../store';
import {selectTypes} from '../redux-types';
import canvas from '../webgl/canvas';
import elements from '../webgl/elements/elements';

/**
 * modeSaga
 */
function* selectSaga() {
    while (true) {
        yield take([selectTypes.ADD_ELEMENTS, selectTypes.SET_ELEMENTS]);

        const selectedElements = store.getState().select.elements;
        elements.list.forEach((element) => {
            if (selectedElements.indexOf(element) < 0) {
                return element.deselect();
            }

            return element.select();
        });

        canvas.draw();
    }
}

export default selectSaga;
