/**
 * QuickHull.js
 *
 * Implementation of the QuickHull algorithm
 * for finding convex hull of a set of points
 *
 * @author Clay Gulick
 */

let hull: Coordinate[] = [];

/**
 * Quickhull
 * @param {Coordinate[]} points
 * @return {Coordinate[]}
 */
export function quickHull(points: Coordinate[]) {
    hull = [];
    // if there are only three points, this is a triangle,
    // which by definition is already a hull
    if (points.length == 3) {
        return points;
    }
    const baseline = getMinMaxPoints(points);
    addSegments(baseline, points);
    // reverse line direction to get points on other side
    addSegments([baseline[1], baseline[0]], points);
    return hull;
}

/**
 * Return the min and max points in the set along the X axis
 * Returns [ {x,y}, {x,y} ]
 * @param {Coordinate[]} points - An array of {x,y} objects
 * @return {Coordinate[]}
 */
function getMinMaxPoints(points: Coordinate[]) {
    let i;
    let minPoint;
    let maxPoint;

    minPoint = points[0];
    maxPoint = points[0];

    for (i = 1; i < points.length; i++) {
        if (points[i].x < minPoint.x) {
            minPoint = points[i];
        }
        if (points[i].x > maxPoint.x) {
            maxPoint = points[i];
        }
    }

    return [minPoint, maxPoint];
}

/**
 * Calculates the distance of a point from a line
 * @param {number[]} point - Array [x,y]
 * @param {Array<number[]>} line - Array of two points [ [x1,y1], [x2,y2] ]
 * @return {number}
 */
function distanceFromLine(point: Coordinate, line: Coordinate[]) {
    const vY = line[1].y - line[0].y;
    const vX = line[0].x - line[1].x;
    return vX * (point.y - line[0].y) + vY * (point.x - line[0].x);
}

/**
 * Determines the set of points that lay outside the
 * line (positive), and the most distal point
 * Returns: {points: [ [x1, y1], ... ], max: [x,y] ]
 * @param {Array<number[]>} line
 * @param {number[]} points
 * @return {{points: Array<number[]>}}
 */
function distalPoints(line: Coordinate[], points: Coordinate[]) {
    let i;
    const outerPoints = [];
    let point;
    let distalPoint;
    let distance = 0;
    let maxDistance = 0;

    for (i = 0; i < points.length; i++) {
        point = points[i];
        distance = distanceFromLine(point, line);

        if (distance > 0) outerPoints.push(point);
        else continue; // short circuit

        if (distance > maxDistance) {
            distalPoint = point;
            maxDistance = distance;
        }
    }

    return {points: outerPoints, max: distalPoint};
}

/**
 * Recursively adds hull segments
 * @param {Array<number[]>} line
 * @param {number[]} points
 * @return {Array<number[]>}
 */
function addSegments(line: Coordinate[], points: Coordinate[]) {
    const distal = distalPoints(line, points);
    if (!distal.max) return hull.push(line[0]);
    addSegments([line[0], distal.max], distal.points);
    addSegments([distal.max, line[1]], distal.points);
}
