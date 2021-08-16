import '../sass/main.sass';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import './dropdown';
import './transformation';
import './slider';
import './store';
import './webgl';
import canvas from './webgl/canvas';
import {store} from './store';

canvas.draw();

store.subscribe(() => {
    canvas.draw();
});
