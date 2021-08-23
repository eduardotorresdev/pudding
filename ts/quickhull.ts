import elements from './webgl/elements/elements';
import quickHull from 'quickhull';
import Polygon from './webgl/elements/polygon';
import {store} from './store';

const fechoPontos = document.querySelector('.fecho__pontos');
const fechoSelecionados = document.querySelector('.fecho__selecionados');

fechoPontos.addEventListener('click', () => {
    const points = elements.points.map((point) => point.coords[0]);

    if (points.length === 0) return;

    const polygonPoints: Coordinate[] = quickHull(points);

    if (
        polygonPoints[0].x === polygonPoints[polygonPoints.length - 1].x &&
        polygonPoints[0].y === polygonPoints[polygonPoints.length - 1].y
    ) {
        polygonPoints.pop();
    }

    const polygon = new Polygon(polygonPoints[0]);
    elements.addElement(polygon);
    polygon.changeCurrentLineEnd(polygonPoints[1]);

    for (let i = 1; i <= polygonPoints.length / 2; i++) {
        polygon.addLine(polygonPoints[i]);
        polygon.changeCurrentLineEnd(polygonPoints[i + 1]);
    }
});

fechoSelecionados.addEventListener('click', () => {
    const selectState = store.getState().select;
    const points = selectState.elements
        .map((point) => point.getCoords())
        .flat();

    if (points.length === 0) return;

    const polygonPoints: Coordinate[] = quickHull(points);

    if (
        polygonPoints[0].x === polygonPoints[polygonPoints.length - 1].x &&
        polygonPoints[0].y === polygonPoints[polygonPoints.length - 1].y
    ) {
        polygonPoints.pop();
    }

    const polygon = new Polygon(polygonPoints[0]);
    elements.addElement(polygon);
    polygon.changeCurrentLineEnd(polygonPoints[1]);

    for (let i = 1; i <= polygonPoints.length / 2; i++) {
        polygon.addLine(polygonPoints[i]);
        polygon.changeCurrentLineEnd(polygonPoints[i + 1]);
    }
});
