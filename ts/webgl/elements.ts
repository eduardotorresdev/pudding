import Line from './line';
import Polyline from './polyline';

/**
 * Elements
 */
class Elements {
    list: Array<Point | Line | Polyline> = [];

    /**
     * addElement
     * @param {Point|Line|Polyline} element
     */
    addElement(element: Point | Line | Polyline) {
        this.list.push(element);
    }
}

const elements = new Elements();

export default elements;
