import {store} from '../../store';
import elements from './elements';
import Point from './point';
import Line from './line';
import Polyline from './polyline';
import Polygon from './polygon';

let isDrawing = false;
let currentLine: Line | null = null;
let currentPolyline: Polyline | null = null;
let currentPolygon: Polygon | null = null;
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
            currentLine = null;
            return;
        }
        currentLine = new Line({x, y});
        elements.addElement(currentLine);
        isDrawing = true;
        break;
    case 'polyline':
        if (isDrawing) {
            currentPolyline?.addLine({x, y});
            return;
        }
        currentPolyline = new Polyline({x, y});
        elements.addElement(currentPolyline);
        isDrawing = true;
        break;
    case 'polygon':
        if (isDrawing) {
            currentPolygon?.addLine({x, y});
            return;
        }
        currentPolygon = new Polygon({x, y});
        elements.addElement(currentPolygon);
        isDrawing = true;
        break;
    }
});

canvas.addEventListener('mousemove', (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDrawing) {
        currentLine?.changeEnd({x, y});
        currentPolyline?.changeCurrentLineEnd({x, y});
        currentPolygon?.changeCurrentLineEnd({x, y});
    }
});

canvas.addEventListener('contextmenu', (e: MouseEvent) => {
    e.preventDefault();

    isDrawing = false;
    currentLine = null;
    currentPolyline = null;
    currentPolygon = null;
});
