import {selectActions} from '../actions';
import {store} from '../store';

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
        x: e.clientX,
        y: e.clientY,
    };
    selecting = true;
    selectionArea.style.width = '0px';
    selectionArea.style.height = '0px';
    selectionArea.style.left = `${initialArea.x}px`;
    selectionArea.style.top = `${initialArea.y}px`;
    document.body.appendChild(selectionArea);
});

canvas.addEventListener('mousemove', (e: MouseEvent) => {
    if (selecting) {
        selectionArea.style.width = `${e.clientX - initialArea.x}px`;
        selectionArea.style.height = `${e.clientY - initialArea.y}px`;
    }
});

canvas.addEventListener('mouseup', (e: MouseEvent) => {
    if (!selecting) return;
    document.body.removeChild(selectionArea);
});

canvas.addEventListener('mouseleave', (e: MouseEvent) => {
    if (!selecting) return;
    document.body.removeChild(selectionArea);
});

