/**
 * Element
 */
class Element {
    coords: Coordinates[] = [];

    /**
     * addCoord
     * @param {Coordinates} coord
     */
    addCoord(coord: Coordinates) {
        this.coords.push(coord);
    }

    /**
     * getCoords
     * @return {Coordinates[]} coord
     */
    getCoords() {
        return this.coords;
    }
}

export default Element;
