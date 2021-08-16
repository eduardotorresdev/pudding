/* eslint-disable no-unused-vars */
interface TransformationAction {
    type: string
}

interface TransformationState {
    translation: Coordinates;
    scale: Coordinates;
    rotation: {
        center: boolean;
        coords: Coordinates | null;
        degrees: number;
    };
    mirror: {
        coords: {
            x: number | null;
            y: number | null;
        };
    };
}
