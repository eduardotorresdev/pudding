import Element from './element';
import Line from './line';

/**
 * Polyline
 */
class Polyline extends Element {
    initialLine: Line;
    currentLine: Line;
    lines: Line[];
    /**
     *
     * @param {Coordinates} start
     */
    constructor(start: Coordinates) {
        super();

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
}

export default Polyline;