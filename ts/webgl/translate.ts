import canvas from '../webgl/canvas';
import {store} from '../store';
import SelectWatcher from '../utils/selectWatcher';

const translationUp = document.querySelector('.translation__up');
const translationRight = document.querySelector('.translation__right');
const translationBottom = document.querySelector('.translation__bottom');
const translationLeft = document.querySelector('.translation__left');

let animationFrame = 0;
let translating = 0;
let direction = 'up';
let translateX = 0;
let translateY = 0;
let scaleX = 1;
let scaleY = 1;
let rotation = 0;
let rotationCenter = true;
let rotationX = 0;
let rotationY = 0;

const watcher = new SelectWatcher();
watcher.addCallback(() => {
    translateX = 0;
    translateY = 0;
    scaleX = 1;
    scaleY = 1;
    rotation = 0;
});

/**
 * translate
 */
function translate() {
    if (translating <= 0) return;

    switch (direction) {
    case 'up':
        translateY -= 1;
        break;
    case 'right':
        translateX += 1;
        break;
    case 'down':
        translateY += 1;
        break;
    case 'left':
        translateX -= 1;
        break;
    }

    const elements = store.getState().select.elements;
    elements.forEach((element) => {
        element.transform(
            {x: translateX, y: translateY},
            {x: scaleX, y: scaleY},
            rotation,
            !rotationCenter ? {x: rotationX, y: rotationY} : null,
        );
    });

    canvas.draw();
    animationFrame = requestAnimationFrame(translate);
}

translationUp.addEventListener('mousedown', () => {
    translating++;
    direction = 'up';
    animationFrame = requestAnimationFrame(translate);
});

translationUp.addEventListener('mouseup', () => {
    translating--;
    cancelAnimationFrame(animationFrame);
});

translationRight.addEventListener('mousedown', () => {
    translating++;
    direction = 'right';
    animationFrame = requestAnimationFrame(translate);
});

translationRight.addEventListener('mouseup', () => {
    translating--;
    cancelAnimationFrame(animationFrame);
});

translationBottom.addEventListener('mousedown', () => {
    translating++;
    direction = 'down';
    animationFrame = requestAnimationFrame(translate);
});

translationBottom.addEventListener('mouseup', () => {
    translating--;
    cancelAnimationFrame(animationFrame);
});

translationLeft.addEventListener('mousedown', () => {
    translating++;
    direction = 'left';
    animationFrame = requestAnimationFrame(translate);
});

translationLeft.addEventListener('mouseup', () => {
    translating--;
    cancelAnimationFrame(animationFrame);
});

const keyMap: { [name: string]: string } = {
    ArrowUp: 'up',
    ArrowRight: 'right',
    ArrowDown: 'down',
    ArrowLeft: 'left',
};

window.addEventListener('keydown', (e) => {
    if (e.repeat) return;

    if (keyMap[e.key]) {
        direction = keyMap[e.key];
        translating++;
        requestAnimationFrame(translate);
    }
});

window.addEventListener('keyup', (e) => {
    if (e.repeat) return;

    if (keyMap[e.key]) {
        translating--;
        cancelAnimationFrame(animationFrame);
    }
});

const scaleXInput: HTMLInputElement | null = document.querySelector('#scale_x');
const scaleYInput: HTMLInputElement | null = document.querySelector('#scale_y');

/**
 * scaleTo
 */
function toScale() {
    scaleX = parseFloat(scaleXInput.value);
    scaleY = parseFloat(scaleYInput.value);

    const elements = store.getState().select.elements;
    elements.forEach((element) => {
        element.transform(
            {x: translateX, y: translateY},
            {
                x: scaleX,
                y: scaleY,
            },
            rotation,
            !rotationCenter ? {x: rotationX, y: rotationY} : null,
        );
    });

    canvas.draw();
}

scaleXInput.addEventListener('input', toScale);
scaleYInput.addEventListener('input', toScale);

const rotationInput: HTMLInputElement | null =
    document.querySelector('#rotation');

rotationInput.addEventListener('input', () => {
    rotation = parseInt(rotationInput.value);
    const elements = store.getState().select.elements;
    elements.forEach((element) => {
        element.transform(
            {x: translateX, y: translateY},
            {
                x: scaleX,
                y: scaleY,
            },
            rotation,
            !rotationCenter ? {x: rotationX, y: rotationY} : null,
        );
    });

    canvas.draw();
});

const rotationCentral: HTMLInputElement | null =
    document.querySelector('#rotation_central');
const rotationXInput: HTMLInputElement | null =
    document.querySelector('#rotation_x');
const rotationYInput: HTMLInputElement | null =
    document.querySelector('#rotation_y');

rotationCentral.addEventListener('change', () => {
    rotationCenter = rotationCentral.checked;

    if (rotationCenter) {
        rotationXInput.setAttribute('disabled', 'disabled');
        rotationYInput.setAttribute('disabled', 'disabled');
    } else {
        rotationXInput.removeAttribute('disabled');
        rotationYInput.removeAttribute('disabled');
    }
});

rotationXInput.addEventListener('input', () => {
    rotationX = parseFloat(rotationXInput.value);
});

rotationYInput.addEventListener('input', () => {
    rotationY = parseFloat(rotationYInput.value);
});
