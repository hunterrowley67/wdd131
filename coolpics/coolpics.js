const menuButton = document.querySelector(".menu-button");
const menu = document.querySelector('nav');
const modal = document.querySelector('dialog');
const modalImage = modal.querySelector('img');
const closeButton = modal.querySelector('.close-button');
const imageTable = document.querySelector('#image-table');

imageTable.addEventListener('click', openModal);
menuButton.addEventListener('click', toggleMenu)

function toggleMenu() {
    menu.classList.toggle('hide');
}

function openModal(e) {
    const img = e.target;
    const src = img.getAttribute('src');
    const alt = img.getAttribute('alt');
    const full = src.replace('sm', 'full');

    modalImage.src = full;
    modalImage.alt = alt;

    modal.showModal();
}

closeButton.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (event) => {
    if (event.target == modal) {
        modal.close();
    }
});