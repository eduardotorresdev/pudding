import Line from './line';
import Point from './point';
import Polyline from './polyline';
import Polygon from './polygon';
import canvas from '../canvas';

interface ElementsImport {
    class: string;
    dados: any;
}

/**
 * Elements
 */
class Elements {
    list: Array<Point | Line | Polyline | Polygon> = [];
    points: Array<Point> = [];
    lines: Array<Line> = [];
    polylines: Array<Polyline> = [];
    polygons: Array<Polygon> = [];

    /**
     * addElement
     * @param {Point|Line|Polyline|Polygon} element
     */
    addElement(element: Point | Line | Polyline | Polygon) {
        this.list.push(element);
        if (element instanceof Point) {
            this.points.push(element);
        } else if (element instanceof Line) {
            this.lines.push(element);
        } else if (element instanceof Polygon) {
            this.polygons.push(element);
        } else if (element instanceof Polyline) {
            this.polylines.push(element);
        }
        this.changeList();
    }

    /**
     * changeList
     */
    changeList() {
        const content = document.querySelector('.content');
        if (this.list.length === 0) {
            content.classList.add('content--empty');
        } else {
            content.classList.remove('content--empty');
        }
        canvas.draw();
    }

    /**
     * getData
     * @return {number[]}
     */
    getData() {
        let data: number[] = [];
        [this.points, this.lines, this.polylines, this.polygons]
            .flat()
            .forEach((element) => {
                data = data.concat(
                    element
                        .getCoords()
                        .map((coords) => {
                            return Object.values(coords);
                        })
                        .flat(),
                );
            });

        return data;
    }

    /**
     * getIndices
     * @return {number[]}
     */
    getIndices() {
        let offset = 0;
        let indices: number[] = [];

        this.points.forEach((point) => {
            indices = indices.concat(point.getIndices(offset));
            offset = offset + 1;
        });

        this.lines.forEach((line) => {
            indices = indices.concat(line.getIndices(offset));
            offset = offset + 2;
        });
        this.polylines.forEach((polyline) => {
            indices = indices.concat(polyline.getIndices(offset));
            offset = offset + polyline.getIndices(offset).length;
        });
        this.polygons.forEach((polygon) => {
            indices = indices.concat(polygon.getIndices(offset));
            offset = offset + polygon.getIndices(offset).length;
        });

        return indices;
    }

    /**
     * getColors
     * @return {number[]}
     */
    getColors() {
        let data: number[] = [];
        this.list
            .sort((a, b) => {
                return a.order - b.order;
            })
            .forEach((element) => {
                data = data.concat(
                    element
                        .getColors()
                        .map((colors) => {
                            return Object.values(colors).map(
                                (color) => color / 255,
                            );
                        })
                        .flat(),
                );
            });
        return data;
    }

    /**
     *  getSelecteds
     * @param {SelectedArea} area
     * @return {Array<Point | Line | Polyline | Polygon>}
     */
    getSelecteds(area: SelectedArea) {
        const selecteds = this.list.filter((element) => {
            return element.isSelected(area);
        });

        return selecteds;
    }

    /**
     *  getMatrices
     * @return {number}
     */
    getMatrices() {
        let data:number[] = [];
        [this.points, this.lines, this.polylines, this.polygons]
            .flat()
            .forEach((element) => {
                data = data.concat(
                    element
                        .getCoords()
                        .map(() => {
                            return element.matrix;
                        })
                        .flat(),
                );
            });
        return data;
    }

    /**
     * export
     * @return {Object}
     */
    export() {
        const data = this.list.map((value) => {
            return value.export();
        });

        return JSON.stringify(data);
    }

    /**
     * import
     *
     * @param {string} data
     */
    import(data: string) {
        this.clear(false);

        const classes: { [key: string]: any } = {
            Point: Point,
            Line: Line,
            Polyline: Polyline,
            Polygon: Polygon,
        };
        const elements: ElementsImport[] = JSON.parse(data);
        elements.forEach((element) => {
            element.dados = JSON.parse(element.dados);
            if (element.class === 'Polyline' || element.class === 'Polygon') {
                element.dados.lines = element.dados.lines.map((line: any) => {
                    return Object.setPrototypeOf(line, Line.prototype);
                });
            }
            Object.setPrototypeOf(
                element.dados,
                classes[element.class].prototype,
            );

            this.addElement(element.dados);
        });
    }

    /**
     * remover
     * @param {Point | Line | Polyline | Polygon} element
     */
    remover(element: Point | Line | Polyline | Polygon) {
        this.list = this.list.filter((item) => item !== element);
        this.points = this.points.filter((item) => item !== element);
        this.lines = this.lines.filter((item) => item !== element);
        this.polylines = this.polylines.filter((item) => item !== element);
        this.polygons = this.polygons.filter((item) => item !== element);
    }

    /**
     * clear
     *
     * @param {boolean} trigger
     */
    clear(trigger: boolean = true) {
        while (this.list.length > 0) {
            this.list.pop();
        }
        while (this.points.length > 0) {
            this.points.pop();
        }
        while (this.lines.length > 0) {
            this.lines.pop();
        }
        while (this.polylines.length > 0) {
            this.polylines.pop();
        }
        while (this.polygons.length > 0) {
            this.polygons.pop();
        }

        if (trigger) this.changeList();
    }
}

const elements = new Elements();

export default elements;
