/**
 * Liang-Barsky function by Daniel White
 *
 * @link http://www.skytopia.com/project/articles/compsci/clipping.html
 *
 * @param  {number}        x0
 * @param  {number}        y0
 * @param  {number}        x1
 * @param  {number}        y1
 * @param  {array<number>} bbox
 * @return {boolean}
 */
export function lineIntersectionChecker(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    bbox: SelectedArea,
) {
    const {xmin, xmax, ymin, ymax} = bbox;
    let t0 = 0;
    let t1 = 1;
    const dx = x1 - x0;
    const dy = y1 - y0;
    let p;
    let q;
    let r;

    for (let edge = 0; edge < 4; edge++) {
        if (edge === 0) {
            p = -dx;
            q = -(xmin - x0);
        }
        if (edge === 1) {
            p = dx;
            q = xmax - x0;
        }
        if (edge === 2) {
            p = -dy;
            q = -(ymin - y0);
        }
        if (edge === 3) {
            p = dy;
            q = ymax - y0;
        }

        r = q / p;

        if (p === 0 && q < 0) return false;

        if (p < 0) {
            if (r > t1) return false;
            else if (r > t0) t0 = r;
        } else if (p > 0) {
            if (r < t0) return false;
            else if (r < t1) t1 = r;
        }
    }

    return true;
}

/**
 * pointIntersectionChecker
 *
 * @param {Coordinate} coord
 * @param {SelectedArea} area
 * @return {boolean}
 */
export function pointIntersectionChecker(
    coord: Coordinate,
    area: SelectedArea,
) {
    return (
        coord.x > area.xmin &&
        coord.x < area.xmax &&
        coord.y > area.ymin &&
        coord.y < area.ymax
    );
}
