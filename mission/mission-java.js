let modeSelector = document.querySelector('#light-selector');
modeSelector.addEventListener('change', changeScheme);

function changeScheme() {
    let current = modeSelector.value;
    let content = document.querySelector('#content');
    let logo = document.querySelector('img');
    let body = document.querySelector('body');
    if (current == "light") {
        content.classList.remove('dark-mode');
        body.classList.remove('dark-mode-body');
        logo.setAttribute('src', 'byui-logo-blue.webp');
    } else if (current == "dark") {
        content.classList.add('dark-mode');
        body.classList.add('dark-mode-body');
        logo.setAttribute('src', 'byui-logo-white.png');
    } else {
        content.classList.remove('dark-mode');
        body.classList.remove('dark-mode-body');
        logo.setAttribute('src', 'byui-logo-blue.webp');
    }
}

