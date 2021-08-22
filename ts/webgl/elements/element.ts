import {degreesToRadians, multiplyVectorByMatrix} from '../../utils';
import SelectWatcher from '../../utils/selectWatcher';
import canvas from '../canvas';
/**
 * Element
 */
class Element {
    coords: Coordinate[] = [];
    originalCoords: Coordinate[] = [];
    colors: Color[] = [];

    /**
     *
     */
    constructor() {
        const watcher = new SelectWatcher();
        watcher.addCallback(() => {
            this.originalCoords = this.coords;
        });
    }

    /**
     * addCoord
     * @param {Coordinates} coord
     */
    addCoord(coord: Coordinate) {
        this.coords.push(coord);
        this.originalCoords.push(coord);
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

    /**
     * transform
     * @param {Coordinate} translation
     * @param {Coordinate} scaling
     * @param {number} rotation
     */
    transform(translation: Coordinate, scaling: Coordinate, rotation: number) {
        const translationMatrix = canvas.m3.translation(
            this.originalCoords[0].x + translation.x,
            this.originalCoords[0].y + translation.y,
        );
        const rotationMatrix = canvas.m3.rotation(degreesToRadians(rotation));
        const scaleMatrix = canvas.m3.scaling(scaling.x, scaling.y);
        const moveOrigin = canvas.m3.translation(
            -this.originalCoords[0].x,
            -this.originalCoords[0].y,
        );

        let matrix = canvas.m3.multiply(translationMatrix, rotationMatrix);
        matrix = canvas.m3.multiply(matrix, scaleMatrix);
        matrix = canvas.m3.multiply(matrix, scaleMatrix);
        matrix = canvas.m3.multiply(matrix, moveOrigin);

        this.coords = this.originalCoords.map((coord) =>
            multiplyVectorByMatrix(coord, matrix),
        );
        this.fireTransform();
    }

    /**
     * fireTransform
     */
    fireTransform() {}
}

export default Element;
