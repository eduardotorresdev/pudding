import Element from './element';
import canvas from '../canvas';
import selectWatcher from '../../utils/selectWatcher';
import {lineIntersectionChecker} from '../../utils';
/**
 * Line
 */
class Line extends Element {
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

        selectWatcher.addCallback(() => {
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
     * changeEnd
     *
     * @param {Coordinates} end
     */
    changeEnd(end: Coordinate) {
        this.end = end;
        this.coords[1] = this.end;
        this.originalCoords[1] = this.end;
        canvas.draw();
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
}

export default Line;
