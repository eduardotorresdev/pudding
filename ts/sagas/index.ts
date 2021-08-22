import {spawn} from 'redux-saga/effects';
import modeSaga from './modeSaga';

/**
 * rootSaga
 * Root generator function for redux-saga
 */
export default function* rootSaga() {
    yield spawn(modeSaga);
}
