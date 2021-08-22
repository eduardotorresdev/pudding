import {spawn} from 'redux-saga/effects';
import modeSaga from './modeSaga';
import selectSaga from './selectSaga';

/**
 * rootSaga
 * Root generator function for redux-saga
 */
export default function* rootSaga() {
    yield spawn(modeSaga);
    yield spawn(selectSaga);
}
