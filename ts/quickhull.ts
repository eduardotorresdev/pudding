import elements from './webgl/elements/elements';
import {quickHull} from './utils';
import Polygon from './webgl/elements/polygon';
import {store} from './store';

const fechoPontos = document.querySelector('.fecho__pontos');
const fechoSelecionados = document.querySelector('.fecho__selecionados');

fechoPontos.addEventListener('click', () => {
    const points = elements.points.map((point) => point.getCoords()[0]);

    if (points.length === 0) return;

    const polygonPoints: Coordinate[] = quickHull(points);

    const polygon = new Polygon(polygonPoints[0]);

    for (let i = 1; i < polygonPoints.length; i++) {
        polygon.addLine(polygonPoints[i - 1]);
        polygon.changeCurrentLineEnd(polygonPoints[i]);
    }

    elements.addElement(polygon);
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

    for (let i = 1; i < polygonPoints.length; i++) {
        polygon.addLine(polygonPoints[i - 1]);
        polygon.changeCurrentLineEnd(polygonPoints[i]);
    }

    elements.addElement(polygon);
});
