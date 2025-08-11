document.addEventListener('DOMContentLoaded', () => {
    const playerName = localStorage.getItem('username');
    document.getElementById('playerName').textContent = playerName || 'Player';

    document.querySelectorAll('.enzyme').forEach(el => {
        el.addEventListener('click', () => {
            addEnzyme(el.getAttribute('data-name'));
        });
    });

    document.getElementById('proceedBtn').addEventListener('click', () => {
        const enzymes = Array.from(document.querySelectorAll('#selectedArea .enzyme'))
            .map(e => e.getAttribute('data-name'));
        localStorage.setItem('selectedEnzymes', JSON.stringify(enzymes));
        window.location.href = 'game.html';
    });
});

function allowDrop(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const enzymeName = event.dataTransfer.getData("text");
    addEnzyme(enzymeName);
}

document.querySelectorAll('.enzyme').forEach(el => {
    el.addEventListener('dragstart', function(event) {
        event.dataTransfer.setData("text", event.target.getAttribute('data-name'));
    });
});

function addEnzyme(name) {
    const selectedArea = document.getElementById('selectedArea');
    if (![...selectedArea.querySelectorAll('.enzyme')].some(e => e.getAttribute('data-name') === name)) {
        const div = document.createElement('div');
        div.className = 'enzyme';
        div.setAttribute('data-name', name);
        div.textContent = name;
        selectedArea.appendChild(div);
    }
}
