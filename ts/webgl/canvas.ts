/* eslint-disable require-jsdoc */
import elements from './elements/elements';

interface Square {
    topLeft: PointData;
    topRight: PointData;
    bottomRight: PointData;
    bottomLeft: PointData;
}

interface PointData {
    coords: Array<number>;
    colors: Array<number>;
}

/**
 * Drawer
 */
class Drawer {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
    points: Square;
    colors: number[];
    indices = [0, 1, 2, 0, 3, 2];
    vertexBuffer: WebGLBuffer;
    indexBuffer: WebGLBuffer;
    colorBuffer: WebGLBuffer;
    vertShader: WebGLShader;
    fragShader: WebGLShader;
    shaderProgram: WebGLProgram;
    matrixLocation: WebGLUniformLocation;
    coord: number;
    translation = {
        x: 0,
        y: 0,
    };
    scalation = {
        x: 1,
        y: 1,
    };
    angleInRadians: number = 0;
    m3 = {
        projection: function(width: number, height: number) {
            return [2 / width, 0, 0, 0, -2 / height, 0, -1, 1, 1];
        },
        identity: function() {
            return [1, 0, 0, 0, 1, 0, 0, 0, 1];
        },

        translation: function(tx: number, ty: number) {
            return [1, 0, 0, 0, 1, 0, tx, ty, 1];
        },

        rotation: function(angleInRadians: number) {
            const c = Math.cos(angleInRadians);
            const s = Math.sin(angleInRadians);
            return [c, -s, 0, s, c, 0, 0, 0, 1];
        },

        scaling: function(sx: number, sy: number) {
            return [sx, 0, 0, 0, sy, 0, 0, 0, 1];
        },

        multiply: function(a: number[], b: number[]) {
            const a00 = a[0 * 3 + 0];
            const a01 = a[0 * 3 + 1];
            const a02 = a[0 * 3 + 2];
            const a10 = a[1 * 3 + 0];
            const a11 = a[1 * 3 + 1];
            const a12 = a[1 * 3 + 2];
            const a20 = a[2 * 3 + 0];
            const a21 = a[2 * 3 + 1];
            const a22 = a[2 * 3 + 2];
            const b00 = b[0 * 3 + 0];
            const b01 = b[0 * 3 + 1];
            const b02 = b[0 * 3 + 2];
            const b10 = b[1 * 3 + 0];
            const b11 = b[1 * 3 + 1];
            const b12 = b[1 * 3 + 2];
            const b20 = b[2 * 3 + 0];
            const b21 = b[2 * 3 + 1];
            const b22 = b[2 * 3 + 2];
            return [
                b00 * a00 + b01 * a10 + b02 * a20,
                b00 * a01 + b01 * a11 + b02 * a21,
                b00 * a02 + b01 * a12 + b02 * a22,
                b10 * a00 + b11 * a10 + b12 * a20,
                b10 * a01 + b11 * a11 + b12 * a21,
                b10 * a02 + b11 * a12 + b12 * a22,
                b20 * a00 + b21 * a10 + b22 * a20,
                b20 * a01 + b21 * a11 + b22 * a21,
                b20 * a02 + b21 * a12 + b22 * a22,
            ];
        },
    };
    /**
     * Drawer
     * @param {HTMLCanvasElement} canvas
     */
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.gl = canvas.getContext('webgl');
        this.points = this.getPoints();
        this.colors = this.createColors();
        this.gl.lineWidth(10);
    }

    translate(x: number, y: number) {
        this.translation = {
            x: x * 100,
            y: y * 100,
        };
        this.draw();
    }

    scale(x: number, y: number) {
        this.scalation = {
            x,
            y,
        };
        this.draw();
    }
    rotate(angleInRadians: number) {
        this.angleInRadians = angleInRadians;
        this.draw();
    }

    draw() {
        this.bindSquare();
        this.bindColors();
        this.bindIndices();
        this.createVertexShader();
        this.createFragShader();

        this.shaderProgram = this.gl.createProgram();
        this.gl.attachShader(this.shaderProgram, this.vertShader);
        this.gl.attachShader(this.shaderProgram, this.fragShader);
        this.gl.linkProgram(this.shaderProgram);

        const indices = elements.getIndices();
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.bufferData(
            this.gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(indices),
            this.gl.DYNAMIC_DRAW,
        );
        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(elements.getData()),
            this.gl.DYNAMIC_DRAW,
        );
        this.coord = this.gl.getAttribLocation(
            this.shaderProgram,
            'coordinates',
        );
        this.gl.vertexAttribPointer(this.coord, 2, this.gl.FLOAT, false, 0, 0);

        this.matrixLocation = this.gl.getUniformLocation(
            this.shaderProgram,
            'u_matrix',
        );

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        const color = this.gl.getAttribLocation(this.shaderProgram, 'color');
        this.gl.vertexAttribPointer(color, 3, this.gl.FLOAT, false, 0, 0);
        this.gl.enableVertexAttribArray(color);

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
        this.gl.clearColor(0, 0, 0, 0);
        this.gl.viewport(
            0,
            0,
            this.canvas.clientWidth,
            this.canvas.clientHeight,
        );
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(this.shaderProgram);

        this.gl.enableVertexAttribArray(this.coord);

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
        const projectionMatrix = this.m3.projection(
            this.canvas.clientWidth,
            this.canvas.clientHeight,
        );
        const translationMatrix = this.m3.translation(
            this.translation.x + 75,
            this.translation.y + 75,
        );
        const rotationMatrix = this.m3.rotation(this.angleInRadians);
        const scaleMatrix = this.m3.scaling(this.scalation.x, this.scalation.y);
        const moveOriginMatrix = this.m3.translation(-75, -75);

        // Multiply the matrices.
        let matrix = this.m3.multiply(projectionMatrix, translationMatrix);
        matrix = this.m3.multiply(matrix, rotationMatrix);
        matrix = this.m3.multiply(matrix, scaleMatrix);
        matrix = this.m3.multiply(matrix, moveOriginMatrix);
        // Set the matrix.
        this.gl.uniformMatrix3fv(this.matrixLocation, false, matrix);

        if (elements.points.length > 0) {
            this.gl.drawElements(
                this.gl.POINTS,
                elements.points.length,
                this.gl.UNSIGNED_SHORT,
                0,
            );
        }

        if (elements.lines.length > 0) {
            this.gl.drawElements(
                this.gl.LINES,
                elements.lines.length * 2,
                this.gl.UNSIGNED_SHORT,
                elements.points.length * 2,
            );
        }

        let polylineLength = 0;
        if (elements.polylines.length > 0) {
            elements.polylines.forEach((polyline) => {
                const length = polyline.getIndices(0).length;

                this.gl.drawElements(
                    this.gl.LINE_STRIP,
                    length,
                    this.gl.UNSIGNED_SHORT,
                    (elements.points.length +
                        elements.lines.length * 2 +
                        polylineLength) * 2,
                );
                polylineLength += length;
            });
        }

        if (elements.polygons.length > 0) {
            let lastLength = 0;
            elements.polygons.forEach((polygon, i) => {
                const length = polygon.getIndices(0).length;

                this.gl.drawElements(
                    this.gl.LINE_LOOP,
                    length,
                    this.gl.UNSIGNED_SHORT,
                    (elements.points.length +
                        elements.lines.length * 2 +
                        polylineLength + lastLength) * 2,
                );
                lastLength += length;
            });
        }
    }

    /**
     * createFragShader
     */
    createFragShader() {
        const fragCode =
            'precision mediump float;' +
            'varying vec3 vColor;' +
            'void main(void) {' +
            'gl_FragColor = vec4(vColor, 1.);' +
            '}';

        this.fragShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);

        this.gl.shaderSource(this.fragShader, fragCode);
        this.gl.compileShader(this.fragShader);
    }

    /**
     * createVertexShader
     */
    createVertexShader() {
        const vertCode =
            'attribute vec2 coordinates;' +
            'uniform mat3 u_matrix;' +
            'attribute vec3 color;' +
            'varying vec3 vColor;' +
            'void main(void) {' +
            'gl_Position = vec4(u_matrix * vec3(coordinates, 1), 1);' +
            'gl_PointSize = 10.0;' +
            'vColor = color;' +
            '}';

        this.vertShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(this.vertShader, vertCode);
        this.gl.compileShader(this.vertShader);
    }

    /**
     * createSquareVertex
     */
    bindSquare() {
        this.vertexBuffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);

        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(elements.getData()),
            this.gl.DYNAMIC_DRAW,
        );

        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, null);
    }

    /**
     * bindIndicesVertex
     */
    bindIndices() {
        this.indexBuffer = this.gl.createBuffer();

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

        this.gl.bufferData(
            this.gl.ELEMENT_ARRAY_BUFFER,
            new Uint16Array(this.indices),
            this.gl.STATIC_DRAW,
        );

        this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, null);
    }

    /**
     * bindColors
     */
    bindColors() {
        this.colorBuffer = this.gl.createBuffer();
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.colorBuffer);
        this.gl.bufferData(
            this.gl.ARRAY_BUFFER,
            new Float32Array(this.colors),
            this.gl.STATIC_DRAW,
        );
    }

    /**
     * createVertices
     * @return {number[]}
     */
    createVertices() {
        let vertices: number[] = [];

        Object.entries(this.points).forEach((point) => {
            const data: PointData = point[1];
            vertices = vertices.concat(
                data.coords.map((coord) => {
                    return coord;
                }),
            );
        });

        return vertices;
    }

    /**
     * createVertices
     * @return {number[]}
     */
    createColors() {
        let colors: number[] = [];

        Object.entries(this.points).forEach((point) => {
            const data: PointData = point[1];
            colors = colors.concat(
                data.colors.map((color) => {
                    return color / 100;
                }),
            );
        });

        return colors;
    }

    /**
     * getPoints
     * @return {Square}
     */
    getPoints() {
        return {
            topLeft: {
                coords: [0, 0],
                colors: [38, 100, 66],
            },
            topRight: {
                coords: [150, 0],
                colors: [18, 73, 36],
            },
            bottomRight: {
                coords: [150, 150],
                colors: [100, 73, 36],
            },
            bottomLeft: {
                coords: [0, 150],
                colors: [38, 50, 100],
            },
        };
    }
}

const element: HTMLCanvasElement = document.querySelector('.canvas');

const instance = new Drawer(element);
export default instance;
