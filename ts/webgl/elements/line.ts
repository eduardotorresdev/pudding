import Element from './element';
import canvas from '../canvas';
/**
 * Line
 */
class Line extends Element {
    order:number = 2;
    start: Coordinate;
    end: Coordinate;
    /**
     *
     * @param {Coordinate} start
     * @param {Coordinate} end
     * @param {Color} color
     */
    constructor(
        start: Coordinate,
        end: Coordinate = {x: start.x + 1, y: start.y + 1},
        color: Color = {
            red: 255,
            green: 0,
            blue: 100,
        },
    ) {
        super();

        this.start = start;
        this.end = end;
        this.coords.push(this.start);
        this.coords.push(this.end);
        this.colors.push(color, color);
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
    changeEnd(end: Coordinate) {
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
