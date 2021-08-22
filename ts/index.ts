import '../sass/main.sass';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import {store} from './store';
import './dropdown';
import './transformation';
import './slider';
import './webgl';
import canvas from './webgl/canvas';

canvas.draw();

store.subscribe(() => {
    canvas.draw();
});
