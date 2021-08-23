import Element from './element';
import canvas from '../canvas';
import {
    degreesToRadians,
    lineIntersectionChecker,
    multiplyVectorByMatrix,
} from '../../utils';
import SelectWatcher from '../../utils/selectWatcher';
/**
 * Line
 */
class Line extends Element {
    center: Coordinate;
    color: Color;
    order: number = 2;
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
        this.color = color;
        this.addCoord(start);
        this.addCoord(end);
        this.colors.push(color, color);

        const watcher = new SelectWatcher();
        watcher.addCallback(() => {
            this.start = this.coords[0];
            this.end = this.coords[1];
        });
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
     * getCenter
     */
    getCenter() {
        this.center = {
            x: (this.coords[0].x + this.coords[1].x) / 2,
            y: (this.coords[0].y + this.coords[1].y) / 2,
        };
    }

    /**
     * changeEnd
     *
     * @param {Coordinates} end
     */
    changeEnd(end: Coordinate) {
        this.end = end;
        this.coords[1] = this.end;
        this.originalCoords[1] = this.end;
        canvas.draw();

        this.getCenter();
    }

    /**
     * export
     * @return {Object}
     */
    export() {
        return {
            class: 'Line',
            dados: JSON.stringify({
                ...this,
                originalCoords: this.coords,
                colors: this.colors.map(() => ({
                    red: 255,
                    green: 0,
                    blue: 100,
                })),
            }),
        };
    }

    /**
     * isSelected
     *
     * @param {SelectedArea} area
     * @return {boolean}
     */
    isSelected(area: SelectedArea) {
        return lineIntersectionChecker(
            this.start.x,
            this.start.y,
            this.end.x,
            this.end.y,
            area,
        );
    }

    /**
     * select
     */
    select() {
        this.colors = this.colors.map(() => {
            return {
                red: 255,
                green: 255,
                blue: 255,
            };
        });
        this.getCenter();
    }

    /**
     * select
     */
    deselect() {
        this.colors = this.colors.map(() => {
            return this.color;
        });
    }

    /**
     * fireTransform
     */
    fireTransform() {
        this.start = this.coords[0];
        this.end = this.coords[1];
    }

    /**
     * transform
     * @param {Coordinate} translation
     * @param {Coordinate} scaling
     * @param {number} rotation
     * @param {Coordinate} center
     */
    transform(
        translation: Coordinate,
        scaling: Coordinate,
        rotation: number,
        center: Coordinate | null = this.center,
    ) {
        if (!center) {
            center = this.center;
        }

        const translationMatrix = canvas.m3.translation(
            center.x + translation.x,
            center.y + translation.y,
        );
        const rotationMatrix = canvas.m3.rotation(degreesToRadians(rotation));
        const scaleMatrix = canvas.m3.scaling(scaling.x, scaling.y);
        const moveOrigin = canvas.m3.translation(
            -center.x,
            -center.y,
        );

        let matrix = canvas.m3.multiply(translationMatrix, rotationMatrix);
        matrix = canvas.m3.multiply(matrix, scaleMatrix);
        matrix = canvas.m3.multiply(matrix, scaleMatrix);
        matrix = canvas.m3.multiply(matrix, moveOrigin);

        this.coords = this.originalCoords.map((coord) =>
            multiplyVectorByMatrix(coord, matrix),
        );
    }
}

export default Line;
