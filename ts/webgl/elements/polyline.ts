import canvas from '../canvas';
import Line from './line';

/**
 * Polyline
 */
class Polyline {
    order: number = 3;
    initialLine: Line;
    currentLine: Line;
    matrix: number[];
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

        const translationMatrix = canvas.m3.translation(100, 100);
        const rotationMatrix = canvas.m3.rotation(canvas.angleInRadians);
        const scaleMatrix = canvas.m3.scaling(
            canvas.scalation.x,
            canvas.scalation.y,
        );
        const moveOriginMatrix = canvas.m3.translation(-75, -75);

        this.matrix = canvas.m3.multiply(translationMatrix, rotationMatrix);
        this.matrix = canvas.m3.multiply(this.matrix, scaleMatrix);
        this.matrix = canvas.m3.multiply(this.matrix, moveOriginMatrix);
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
}

export default Polyline;
