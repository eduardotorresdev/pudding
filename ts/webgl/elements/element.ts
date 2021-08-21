/**
 * Element
 */
class Element {
    coords: Coordinate[] = [];
    colors: Color[] = [];

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
