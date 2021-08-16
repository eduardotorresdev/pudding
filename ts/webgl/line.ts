import Element from './element';

/**
 * Line
 */
class Line extends Element {
    start: Coordinates;
    end: Coordinates;
    /**
     *
     * @param {Coordinates} start
     * @param {Coordinates} end
     */
    constructor(
        start: Coordinates,
        end: Coordinates = {x: start.x + 1, y: start.y + 1},
    ) {
        super();

        this.start = start;
        this.end = end;
        this.setVertices();
    }

    /**
     * setVertices
     */
    setVertices() {
        this.coords.push({
            x: this.start.x - 10,
            y: this.start.y - 10,
        });
        this.coords.push({
            x: this.end.x + 10,
            y: this.end.y - 10,
        });
        this.coords.push({
            x: this.end.x - 10,
            y: this.end.y + 10,
        });
        this.coords.push({
            x: this.start.x + 10,
            y: this.start.y + 10,
        });
    }

    /**
     * changeEnd
     *
     * @param {Coordinates} end
     */
    changeEnd(end: Coordinates) {
        this.end = end;
        this.coords[1] = {
            x: this.end.x + 10,
            y: this.end.y - 10,
        };
        this.coords[2] = {
            x: this.end.x - 10,
            y: this.end.y + 10,
        };
    }
}

export default Line;
