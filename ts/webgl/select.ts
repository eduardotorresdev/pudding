import {selectActions} from '../actions';
import {store} from '../store';
import elements from './elements/elements';

const selectionArea = document.createElement('div');
selectionArea.classList.add('select__area');
const select = document.querySelector('.select');
const canvas = document.querySelector('.canvas');

store.subscribe(() => {
    const selectState = store.getState().select;

    if (selectState.active) {
        canvas.classList.add('canvas--selecting');
        select.classList.add('btn--active');
    } else {
        canvas.classList.remove('canvas--selecting');
        select.classList.remove('btn--active');
    }
});

select.addEventListener('click', () => {
    select.classList.toggle('btn--active');
    store.dispatch(selectActions.toggle());
});

let selecting = false;
let initialArea = {
    x: 0,
    y: 0,
};

canvas.addEventListener('mousedown', (e: MouseEvent) => {
    if (!store.getState().select.active) return;

    initialArea = {
        x: e.pageX,
        y: e.pageY,
    };
    selecting = true;
    selectionArea.style.left = `${initialArea.x}px`;
    selectionArea.style.top = `${initialArea.y}px`;
    selectionArea.style.width = `0px`;
    selectionArea.style.height = `0px`;

    document.body.appendChild(selectionArea);
});

canvas.addEventListener('mousemove', (e: MouseEvent) => {
    if (selecting) {
        const styles = getComputedStyle(selectionArea);
        selectionArea.style.height = `${Math.abs(
            e.pageY - parseInt(styles.top),
        )}px`;
        selectionArea.style.width = `${Math.abs(
            e.pageX - parseInt(styles.left),
        )}px`;

        if (e.pageY < initialArea.y) {
            selectionArea.style.top = `${e.pageY}px`;
            selectionArea.style.height = `${Math.abs(
                e.pageY - initialArea.y,
            )}px`;
        }

        if (e.pageX < initialArea.x) {
            selectionArea.style.left = `${e.pageX}px`;
            selectionArea.style.width = `${Math.abs(
                e.pageX - initialArea.x,
            )}px`;
        }
    }
});

/**
 * clearSelection
 */
function clearSelection() {
    if (!selecting || !document.body.contains(selectionArea)) return;

    const canvasRect = canvas.getBoundingClientRect();
    const areaRect = selectionArea.getBoundingClientRect();
    const xmin = areaRect.left - canvasRect.left;
    const xmax = areaRect.width + xmin;
    const ymin = areaRect.top - canvasRect.top;
    const ymax = areaRect.height + ymin;

    store.dispatch(
        selectActions.setElements(
            elements.getSelecteds({
                xmin,
                xmax,
                ymin,
                ymax,
            }),
        ),
    );

    document.body.removeChild(selectionArea);
}

canvas.addEventListener('mouseup', clearSelection);
canvas.addEventListener('mouseleave', clearSelection);
