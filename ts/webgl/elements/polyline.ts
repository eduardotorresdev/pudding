import Line from './line';
import canvas from '../canvas';
import {degreesToRadians, multiplyVectorByMatrix} from '../../utils';

/**
 * Polyline
 */
class Polyline {
    order: number = 3;
    initialLine: Line;
    currentLine: Line;
    lines: Line[] = [];
    color: Color;
    /**
     *
     * @param {Coordinate} start
     * @param {Color} color
     */
    constructor(
        start: Coordinate,
        color: Color = {red: 50, green: 217, blue: 133},
    ) {
        this.color = color;
        this.currentLine = new Line(
            start,
            {x: start.x + 1, y: start.y + 1},
            this.color,
        );
        this.initialLine = this.currentLine;
        this.lines.push(this.currentLine);
    }

    /**
     * addLine
     *
     * @param {Coordinate} start
     */
    addLine(start: Coordinate) {
        this.currentLine = new Line(
            start,
            {x: start.x + 1, y: start.y + 1},
            this.color,
        );
        this.lines.push(this.currentLine);
    }

    /**
     * changeCurrentLineEnd
     *
     * @param {Coordinates} end
     */
    changeCurrentLineEnd(end: Coordinate) {
        this.currentLine.changeEnd(end);
    }

    /**
     * getLength
     *
     * @return {number} length
     */
    getLength() {
        let length = 0;
        this.lines.forEach(() => {
            length += 2;
        });

        return length;
    }

    /**
     * export
     * @return {Object}
     */
    export() {
        return {
            class: 'Polyline',
            dados: JSON.stringify(this),
        };
    }

    /**
     * getCoords
     * @return {Coordinate[]}
     */
    getCoords() {
        let dados: Coordinate[] = [];
        this.lines.forEach((line) => {
            dados = dados.concat(line.getCoords());
        });
        return dados;
    }

    /**
     * getColors
     * @return {Color[]}
     */
    getColors() {
        let dados: Color[] = [];
        this.lines.forEach((line) => {
            dados = dados.concat(line.getColors());
        });
        return dados;
    }

    /**
     * getIndices
     * @param {number} offset
     * @return {number[]}
     */
    getIndices(offset: number) {
        let increment = -2;
        return this.lines
            .map((line) => {
                increment += 2;
                return line.getIndices(offset + increment);
            })
            .flat();
    }

    /**
     * getArea
     * @return {number}
     */
    getArea() {
        let area = 0;
        let i = 0;
        let j = 0;
        let point1: Coordinate;
        let point2: Coordinate;

        const points = this.lines.map((line) => line.getCoords()).flat();

        for (i = 0, j = points.length - 1; i < points.length; j = i, i++) {
            point1 = points[i];
            point2 = points[j];
            area += point1.x * point2.y;
            area -= point1.y * point2.x;
        }
        area /= 2;

        return area;
    }

    /**
     * getCentroid
     * @return {Coordinate}
     */
    getCentroid() {
        let x = 0;
        let y = 0;
        let i;
        let j;
        let f;
        let point1:Coordinate;
        let point2:Coordinate;

        const points = this.lines.map((line) => line.getCoords()).flat();

        for (i = 0, j = points.length - 1; i < points.length; j = i, i++) {
            point1 = points[i];
            point2 = points[j];
            f = point1.x * point2.y - point2.x * point1.y;
            x += (point1.x + point2.x) * f;
            y += (point1.y + point2.y) * f;
        }

        f = this.getArea() * 6;

        return {x: x / f, y: y / f};
    }

    /**
     * isSelected
     *
     * @param {SelectedArea} area
     * @return {boolean}
     */
    isSelected(area: SelectedArea) {
        for (const line of this.lines) {
            if (line.isSelected(area)) return true;
        }

        return false;
    }

    /**
     * select
     */
    select() {
        this.lines.forEach((line) => {
            line.select();
        });
    }

    /**
     * select
     */
    deselect() {
        this.lines.forEach((line) => {
            line.deselect();
        });
    }

    /**
     * transform
     * @param {Coordinate} translation
     * @param {Coordinate} scaling
     * @param {number} rotation
     */
    transform(translation: Coordinate, scaling: Coordinate, rotation: number) {
        const center = this.getCentroid();
        const translationMatrix = canvas.m3.translation(
            center.x + translation.x,
            center.y + translation.y,
        );
        const rotationMatrix = canvas.m3.rotation(degreesToRadians(rotation));
        const scaleMatrix = canvas.m3.scaling(scaling.x, scaling.y);
        const moveOrigin = canvas.m3.translation(
            -center.x,
            -center.y,
        );

        let matrix = canvas.m3.multiply(translationMatrix, rotationMatrix);
        matrix = canvas.m3.multiply(matrix, scaleMatrix);
        matrix = canvas.m3.multiply(matrix, scaleMatrix);
        matrix = canvas.m3.multiply(matrix, moveOrigin);

        this.lines.forEach((line) => {
            line.coords = line.originalCoords.map((coord) =>
                multiplyVectorByMatrix(coord, matrix),
            );
        });
    }
}

export default Polyline;
