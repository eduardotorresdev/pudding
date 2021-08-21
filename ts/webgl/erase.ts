import {selectActions} from '../actions';
import {store} from '../store';
import canvas from './canvas';
import elements from './elements/elements';

const eraseAll = document.querySelector('.erase__all');
const eraseSelecteds = document.querySelector('.erase__selecteds');

eraseAll.addEventListener('click', (e) => {
    e.preventDefault();

    elements.clear();
});

eraseSelecteds.addEventListener('click', (e) => {
    e.preventDefault();

    removeSelecteds();
});

window.addEventListener('keyup', function(e) {
    if (e.key === 'Delete') {
        const selectState = store.getState().select;

        if (selectState.elements.length === 0) {
            elements.clear();
        } else {
            removeSelecteds();
        }
    }
});

/**
 * removeSelecteds
 */
function removeSelecteds() {
    const selectState = store.getState().select;

    selectState.elements.forEach((element) => {
        elements.remover(element);
    });

    canvas.draw();
    store.dispatch(selectActions.setElements([]));
}
