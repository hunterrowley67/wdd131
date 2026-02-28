const character = {
    name: 'Snortleblat',
    characterClass: 'Swamp Beast Diplomat',
    level: 5,
    health: 100,
    image: 'snortleblat.webp',
    imageAlt: 'A Lizard on two legs wading through water wearing leather rags.',
    attacked: function () {
        if (this.health > 0) {
            this.health -= 20;
            if (this.health == 0) {
                alert('The Character Has Died.')
            }
            updateDisplay(this);
        }
    },
    levelUp: function () {
        this.level++;
        if (this.health < 100) {
            this.health = 100;
        }
        updateDisplay(this);
    }
};

function displayCharacterCard(character) {
    return `<img src="${character.image}" alt="${character.imageAlt}">
        <h1 id="name">Snortleblat</h1>
        <div id="stats">
            <p class="details"><strong>Class:</strong> ${character.characterClass}</p>
            <p class="details"><strong>Level:</strong> ${character.level}</p>
            <p class="details"><strong>Health:</strong> ${character.health}</p>
        </div>`
};

function updateDisplay(character) {
    const html = displayCharacterCard(character);
    document.querySelector("#characterDetails").innerHTML = html;
};

updateDisplay(character);

document.querySelector("#attacked").addEventListener("click", function () {
    character.attacked();
});

document.querySelector("#levelUp").addEventListener("click", function () {
    character.levelUp();
});