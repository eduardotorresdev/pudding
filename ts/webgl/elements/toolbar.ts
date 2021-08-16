import {elementActions} from '../../actions';
import {store} from '../../store';

const point = document.querySelector('.point');
const line = document.querySelector('.line');
const polyline = document.querySelector('.polyline');
const polygon = document.querySelector('.polygon');
const buttons = [point, line, polyline, polygon];

/**
 * activateButton
 * @param {Element} element
 * @param {string} elementClass
 */
function activateButton(element: Element, elementClass: string) {
    deactivateButtons(element);
    element.classList.toggle('btn--active');
    store.dispatch(elementActions.setElement(elementClass));
}
/**
 * deactivateButtons
 * @param {Element} exception
 */
function deactivateButtons(exception: Element) {
    buttons.forEach((button) => {
        if (button === exception) return;
        button.classList.remove('btn--active');
    });
}

point.addEventListener('click', (e) =>
    activateButton(e.currentTarget as Element, 'point'),
);
line.addEventListener('click', (e) =>
    activateButton(e.currentTarget as Element, 'line'),
);
polyline.addEventListener('click', (e) =>
    activateButton(e.currentTarget as Element, 'polyline'),
);
polygon.addEventListener('click', (e) =>
    activateButton(e.currentTarget as Element, 'polygon'),
);
