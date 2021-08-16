import elements from './elements/elements';

const exportar = document.querySelector('.exportar');
const importar = document.querySelector('.importar');
const importarFile: HTMLInputElement | null =
    document.querySelector('.importar__file');

exportar.addEventListener('click', (e) => {
    e.preventDefault();

    if (elements.list.length === 0) return;

    const data = elements.export();
    const blob = new Blob([data], {type: 'application/json'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'dados.json';
    a.textContent = 'Download dados.json';

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

importar.addEventListener('click', () => {
    importarFile.click();
});

importarFile.addEventListener('change', (e) => {
    const reader = new FileReader();

    reader.onload = function(event) {
        if (typeof event.target.result === 'string') {
            elements.import(event.target.result);
        }
    };

    reader.readAsText((e.target as HTMLInputElement).files[0]);
});
