import canvas from '../canvas';

/**
 * Element
 */
class Element {
    coords: Coordinate[] = [];
    colors: Color[] = [];
    matrix: number[];

    /**
     *
     */
    constructor() {
        const projectionMatrix = canvas.m3.projection(
            canvas.canvas.clientWidth,
            canvas.canvas.clientHeight,
        );
        const translationMatrix = canvas.m3.translation(0, 0);
        const rotationMatrix = canvas.m3.rotation(0);
        const scaleMatrix = canvas.m3.scaling(
            1,
            1,
        );

        this.matrix = canvas.m3.multiply(projectionMatrix, translationMatrix);
        this.matrix = canvas.m3.multiply(this.matrix, rotationMatrix);
        this.matrix = canvas.m3.multiply(this.matrix, scaleMatrix);
    }

    /**
     * addCoord
     * @param {Coordinates} coord
     */
    addCoord(coord: Coordinate) {
        this.coords.push(coord);
    }

    /**
     * addColor
     * @param {Color} color
     */
    addColor(color: Color) {
        this.colors.push(color);
    }

    /**
     * getCoords
     * @return {Coordinates[]} coord
     */
    getCoords() {
        return this.coords;
    }

    /**
     * getColors
     * @return {Colors[]} color
     */
    getColors() {
        return this.colors;
    }
}

export default Element;
