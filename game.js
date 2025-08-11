const steps = [
    { name: "Helicase", desc: "Helicase unwinds the DNA double helix.", img: "images/helicase.png" },
    { name: "Primase", desc: "Primase synthesizes RNA primers.", img: "images/primase.png" },
    { name: "DNA Polymerase III", desc: "DNA Polymerase III adds complementary nucleotides.", img: "images/dnapol3.png" },
    { name: "Ligase", desc: "Ligase seals the nicks in the DNA backbone.", img: "images/ligase.png" }
];

let currentStep = 0;
let selectedEnzymes = [];

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('playerName').textContent = localStorage.getItem('username') || 'Player';
    selectedEnzymes = JSON.parse(localStorage.getItem('selectedEnzymes')) || [];

    loadStep();
    renderEnzymeButtons();
});

function loadStep() {
    const step = steps[currentStep];
    document.getElementById('stageImage').src = step.img;
    document.getElementById('stageDescription').textContent = step.desc;
}

function renderEnzymeButtons() {
    const container = document.getElementById('enzymeButtons');
    container.innerHTML = '';

    selectedEnzymes.forEach(enzyme => {
        const btn = document.createElement('button');
        btn.className = 'enzyme-btn';
        btn.textContent = enzyme;
        btn.addEventListener('click', () => handleEnzymeClick(enzyme));
        container.appendChild(btn);
    });
}

function handleEnzymeClick(clickedEnzyme) {
    const step = steps[currentStep];

    if (clickedEnzyme === step.name) {
        if (step.name === "DNA Polymerase III") {
            showBaseInput();
        } else {
            nextStep();
        }
    } else {
        alert("Wrong enzyme! Try again.");
    }
}

function showBaseInput() {
    document.getElementById('inputArea').style.display = 'block';
    const template = randomDNA(5);
    document.getElementById('templateStrand').textContent = template;
    document.getElementById('inputArea').dataset.correct = complementaryDNA(template);

    document.getElementById('submitBase').onclick = checkBaseInput;
}

function checkBaseInput() {
    const correct = document.getElementById('inputArea').dataset.correct;
    const input = document.getElementById('baseInput').value.trim().toUpperCase();
    if (input === correct) {
        alert("Correct! Moving to next step.");
        document.getElementById('inputArea').style.display = 'none';
        nextStep();
    } else {
        alert("Incorrect. Try again.");
    }
}

function nextStep() {
    currentStep++;
    if (currentStep < steps.length) {
        loadStep();
    } else {
        alert("DNA Replication Completed!");
    }
}

function randomDNA(length) {
    const bases = ["A", "T", "C", "G"];
    let strand = "";
    for (let i = 0; i < length; i++) {
        strand += bases[Math.floor(Math.random() * 4)];
    }
    return strand;
}

function complementaryDNA(template) {
    return template.split("").map(base => {
        switch(base) {
            case "A": return "T";
            case "T": return "A";
            case "C": return "G";
            case "G": return "C";
        }
    }).join("");
}
