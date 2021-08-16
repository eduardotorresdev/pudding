import Element from './element';
import canvas from '../canvas';
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
        this.coords.push(this.start);
        this.coords.push(this.end);
    }

    /**
     * getIndices
     * @param {number} offset
     * @return {number[]}
     */
    getIndices(offset: number) {
        return [0 + offset, 1 + offset];
    }

    /**
     * changeEnd
     *
     * @param {Coordinates} end
     */
    changeEnd(end: Coordinates) {
        this.coords[1] = end;
        canvas.draw();
    }

    /**
     * export
     * @return {Object}
     */
    export() {
        return {
            class: 'Line',
            dados: JSON.stringify(this),
        };
    }
}

export default Line;
