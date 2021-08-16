import {elementActions, selectActions} from '../actions';
import {call, take} from 'redux-saga/effects';
import {elementTypes} from '../redux-types';
import {selectTypes} from '../redux-types';
import {store} from '../store';

/**
 * disableDraw
 */
function* disableDraw() {
    if (store.getState().select.active === true) {
        store.dispatch(elementActions.setElement(null));
    }
}

/**
 * disableSelect
 * @param {any} element
 */
function* disableSelect(element:any) {
    if (element !== null) {
        store.dispatch(selectActions.deactivate());
    }
}

/**
 * modeSaga
 */
function* modeSaga() {
    while (true) {
        const action = yield take([
            selectTypes.TOGGLE,
            selectTypes.ACTIVATE,
            elementTypes.SET_ELEMENT,
        ]);

        if (action.type === elementTypes.SET_ELEMENT) {
            yield call(disableSelect, action.element);
        } else {
            yield call(disableDraw);
        }
    }
}

export default modeSaga;
