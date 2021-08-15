const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector('.btn');
    const dropdownList = dropdown.querySelector('.dropdown__list');

    button.addEventListener('click', () => {
        dropdownList.classList.toggle('dropdown__list--open');
    });

    let timeout:ReturnType<typeof setTimeout>;
    [dropdownList, button].forEach((element) => {
        element.addEventListener('mouseenter', () => {
            if (dropdownList.classList.contains('dropdown__list--open')) {
                clearTimeout(timeout);
            }
        });

        element.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                if (!dropdownList.classList.contains('dropdown__list--open')) {
                    return;
                }

                dropdownList.classList.toggle('dropdown__list--open');
            }, 100);
        });
    });
});
