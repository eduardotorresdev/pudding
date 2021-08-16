import Element from './element';

/**
 * Point
 */
class Point extends Element {
    /**
     *
     * @param {Coordinates} coords
     */
    constructor(coords: Coordinates) {
        super();

        this.coords.push(coords);
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
