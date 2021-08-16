import Element from './element';

/**
 * Point
 */
class Point extends Element {
    center: Coordinates;
    /**
     *
     * @param {Coordinates} coords
     */
    constructor(coords: Coordinates) {
        super();

        this.center = coords;
        this.setVertices();
    }

    /**
     * setVertices
     */
    setVertices() {
        this.coords.push({
            x: this.center.x - 10,
            y: this.center.y - 10,
        });
        this.coords.push({
            x: this.center.x + 10,
            y: this.center.y - 10,
        });
        this.coords.push({
            x: this.center.x - 10,
            y: this.center.y + 10,
        });
        this.coords.push({
            x: this.center.x + 10,
            y: this.center.y + 10,
        });
    }
}

export default Point;
