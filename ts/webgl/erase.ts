import elements from './elements/elements';

const eraseAll = document.querySelector('.erase__all');

eraseAll.addEventListener('click', (e) => {
    e.preventDefault();

    elements.clear();
});
