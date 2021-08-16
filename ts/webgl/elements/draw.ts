import {store} from '../../store';
import elements from './elements';
import Point from './point';
import Line from './line';

let isDrawing = false;
let currentLine:Line|null = null;
const canvas = document.querySelector('.canvas');

canvas.addEventListener('click', (e: MouseEvent) => {
    const element = store.getState().element;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    switch (element) {
    case 'point':
        elements.addElement(new Point({x, y}));
        break;
    case 'line':
        if (isDrawing) {
            isDrawing = false;
            return;
        }
        currentLine = new Line({x, y});
        elements.addElement(currentLine);
        isDrawing = true;
        break;
    case 'polyline':
        break;
    case 'polygon':
        break;
    }
});

canvas.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDrawing) {
        currentLine.changeEnd({x, y});
    }
});
