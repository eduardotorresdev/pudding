import Element from './element';
import {pointIntersectionChecker} from './utils';

/**
 * Point
 */
class Point extends Element {
    color: Color;
    order: number = 1;

    /**
     *
     * @param {Coordinate} coords
     * @param {Color} color
     */
    constructor(
        coords: Coordinate,
        color: Color = {
            red: 255,
            green: 213,
            blue: 0,
        },
    ) {
        super();

        this.color = color;
        this.coords.push(coords);
        this.colors.push(color);
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
     * isSelected
     *
     * @param {SelectedArea} area
     * @return {boolean}
     */
    isSelected(area: SelectedArea) {
        return pointIntersectionChecker(this.coords[0], area);
    }
}

export default Point;
