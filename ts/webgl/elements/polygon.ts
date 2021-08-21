import Polyline from './polyline';

/**
 * Polyline
 */
class Polygon extends Polyline {
    order: number = 4;

    /**
     *
     * @param {Coordinate} start
     * @param {Color} color
     */
    constructor(
        start: Coordinate,
        color: Color = {
            red: 110,
            green: 39,
            blue: 204,
        },
    ) {
        super(start, color);
    }

    /**
     * export
     * @return {Object}
     */
    export() {
        return {
            class: 'Polygon',
            dados: JSON.stringify(this),
        };
    }
}

export default Polygon;
