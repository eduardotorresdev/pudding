import {store} from '../store';

/**
 * SelectWatcher
 */
class SelectWatcher {
    callbacks: Function[] = [];
    previousValue: string = '';

    /**
     *
     */
    constructor() {
        store.subscribe(() => {
            const currentValue = JSON.stringify(store.getState().select);
            if (currentValue !== this.previousValue) {
                this.callbacks.forEach((callback) => callback());
                this.previousValue = currentValue;
            }
        });
    }

    /**
     * addCallback
     * @param {Function} callback
     */
    addCallback(callback: Function) {
        this.callbacks.push(callback);
    }
}

const instance = new SelectWatcher();

export default instance;
