import Line from './line';

/**
 * Polyline
 */
class Polyline {
    initialLine: Line;
    currentLine: Line;
    lines: Line[] = [];
    /**
     *
     * @param {Coordinates} start
     */
    constructor(start: Coordinates) {
        this.currentLine = new Line(start, {x: start.x + 1, y: start.y + 1});
        this.initialLine = this.currentLine;
        this.lines.push(this.currentLine);
    }

    /**
     * addLine
     *
     * @param {Coordinates} start
     */
    addLine(start: Coordinates) {
        this.currentLine = new Line(start, {x: start.x + 1, y: start.y + 1});
        this.lines.push(this.currentLine);
    }

    /**
     * changeCurrentLineEnd
     *
     * @param {Coordinates} end
     */
    changeCurrentLineEnd(end: Coordinates) {
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
     * @return {Coordinates[]}
     */
    getCoords() {
        let dados: Coordinates[] = [];
        this.lines.forEach((line) => {
            dados = dados.concat(line.getCoords());
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
}

export default Polyline;
