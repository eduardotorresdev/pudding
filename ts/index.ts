import '../sass/main.sass';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './dropdown';
import './transformation';
import './slider';
import './store';
import Drawer from './webgl/canvas';

const canvas:HTMLCanvasElement|null = document.querySelector('.canvas');
if (canvas) {
    const drawer = new Drawer(canvas);

    drawer.draw();
}

