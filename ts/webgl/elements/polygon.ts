import Polyline from './polyline';

/**
 * Polyline
 */
class Polygon extends Polyline {
    /**
     *
     * @param {Coordinates} start
     */
    constructor(start: Coordinates) {
        super(start);
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
