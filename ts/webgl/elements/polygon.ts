import Line from './line';
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
            red: 177,
            green: 82,
            blue: 255,
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

    /**
     * isSelected
     *
     * @param {SelectedArea} area
     * @return {boolean}
     */
    isSelected(area: SelectedArea) {
        for (const line of this.lines) {
            if (line.isSelected(area)) return true;
        }

        const joiningLine = new Line(
            this.lines[0].start,
            this.lines[this.lines.length - 1].end,
        );
        if (joiningLine.isSelected(area)) return true;

        return false;
    }
}

export default Polygon;
