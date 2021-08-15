const transformationButton = document.querySelector('.transformation__button');
const transformation = document.querySelector('.transformation');
const translation = document.querySelector('.translation');

transformationButton.addEventListener('click', () => {
    transformationButton.classList.toggle('btn--active');
    transformation.classList.toggle('transformation--show');
    translation.classList.toggle('translation--show');
});
