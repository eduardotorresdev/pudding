import Element from './element';

/**
 * Point
 */
class Point extends Element {
    order:number = 1;

    /**
     *
     * @param {Coordinate} coords
     * @param {Color} color
     */
    constructor(coords: Coordinate, color: Color = {
        red: 255,
        green: 213,
        blue: 0,
    }) {
        super();

        this.coords.push(coords);
        this.colors.push(color);
    }

    /**
     * export
     * @return {Object}
     */
    export() {
        return {
            class: 'Point',
            dados: JSON.stringify(this),
        };
    }

    /**
     * getIndices
     * @param {number} offset
     * @return {number[]}
     */
    getIndices(offset: number) {
        return [0 + offset];
    }
}

export default Point;
