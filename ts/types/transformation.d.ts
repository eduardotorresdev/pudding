/* eslint-disable no-unused-vars */
interface TransformationState {
    translation: Point;
    scale: Point;
    rotation: {
        center: boolean;
        coords: Point | null;
        degrees: number;
    };
    mirror: {
        coords: {
            x: number | null;
            y: number | null;
        };
    };
}
