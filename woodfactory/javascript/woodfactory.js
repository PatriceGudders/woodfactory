"use strict";
let bestelGegevens;
leesCursussen();
leesBestelgegevens();

async function leesCursussen() {
    const response = await fetch("javascript/cursussen.json");
    const cursussen = await response.json();
    vulSelectMetCursussen(cursussen);
}

function vulSelectMetCursussen(cursussen) {
    const select = document.getElementById("cursus");
    for (const cursus of cursussen) {
        const option = document.createElement("option");
        option.innerText = cursus.naam;
        option.value = cursus.naam;
        option.dataset.duurtijd = cursus.duurtijd;
        option.dataset.prijs = cursus.prijs;
        select.appendChild(option);
    }
}

document.getElementById("cursus").onchange = function () {
    if (this.value === "") {
        document.getElementById("cursusDetail").hidden = true;
    }
    else {
        const duurtijd = this.options[this.selectedIndex].dataset.duurtijd;
        const prijs = this.options[this.selectedIndex].dataset.prijs;
        document.getElementById("cursusDetail").hidden = false;
        document.getElementById("cursusDetail").innerText = `duurtijd: ${duurtijd}, prijs: € ${prijs}`;
    }
}

async function leesBestelgegevens() {
    const response = await fetch("houtsoorten.json");
    if(response.ok) {
        bestelGegevens = await response.json();
        const houtsoorten = document.getElementById("houtsoorten");
        for(const bestelGegeven of bestelGegevens) {
            const divControlGroup = document.createElement("div");
            divControlGroup.className = "control-group";
            const divControls = document.createElement("div");
            divControls.className = "controls";
            const label = document.createElement("label");
            label.className = "control-label";
            label.innerText = `${bestelGegeven.naam} `;
            const input = document.createElement("input");
            label.appendChild(input);
            input.type = "checkbox";
            input.id = `chk_${bestelGegeven.naam}`;
            divControlGroup.appendChild(label);
            houtsoorten.appendChild(divControlGroup);
            const divInputAppend = document.createElement("div");
            divInputAppend.className = "input-append";
            const inputInpubox = document.createElement("input");
            inputInpubox.className = "inpbox input-mini";
            inputInpubox.setAttribute("required", "");
            inputInpubox.type = "number";
            inputInpubox.min = "1";
            inputInpubox.id = bestelGegeven.naam;
            inputInpubox.name = bestelGegeven.naam;
            inputInpubox.setAttribute("disabled", "");
            const span = document.createElement("span");
            span.className = "add-on";
            span.innerText = bestelGegeven.eenheid;
            divInputAppend.appendChild(inputInpubox);
            divInputAppend.appendChild(span);
            divControls.appendChild(divInputAppend);
            divControlGroup.appendChild(divControls);
            document.getElementById(`chk_${bestelGegeven.naam}`).oninput = function () {
                if (this.checked) {
                    document.getElementById(bestelGegeven.naam).disabled = false;
                }
                else {
                    document.getElementById(bestelGegeven.naam).disabled = true;
                    document.getElementById(bestelGegeven.naam).value = "";
                }
            }
        }
    } else {
        document.getElementById("bestelGegevensFout").hidden = true;
    }
}
    
document.getElementById("verzenden").onclick = function() {
    const bestelLijst = "bestelBoodschappenLijst";
    const persoonLijst = "persoonBoodschappenLijst";
    valideerBestelgegevens(bestelLijst);
    valideerPersoonlijkeGegevens(persoonLijst);
}
function valideerPersoonlijkeGegevens(bronId) {
    const persoonlijkInput = document.getElementById("persoonlijk");
    const verkeerdeElementen = persoonlijkInput.querySelectorAll("input:invalid,select:invalid");
    const boodschap = ": verplicht veld";
    for (const element of verkeerdeElementen) {
        document.getElementById("persoonBoodschappen").hidden = false;
        voegElementToe(element, boodschap, bronId);
    }
    const correcteElementen = persoonlijkInput.querySelectorAll("input:valid,select:valid");
    for (const element of correcteElementen) {
        verwijderElement(element,boodschap, bronId);
    }
    if(verkeerdeElementen.length === 0) {
        document.getElementById("persoonBoodschappen").hidden = true;
    }
}

function valideerBestelgegevens(bronId) {
    const bestellingInput = document.getElementById("bestelling");
    const verkeerdeElementen = bestellingInput.querySelectorAll("input:invalid");
    const boodschap = ": tik een positief getal";
    for (const element of verkeerdeElementen) {
        document.getElementById("bestelBoodschappen").hidden = false;
        voegElementToe(element, boodschap, bronId);
    }
    const correcteElementen = bestellingInput.querySelectorAll("input:valid");
    for (const element of correcteElementen) {
        verwijderElement(element,boodschap, bronId);
    }
    if(verkeerdeElementen.length === 0) {
        document.getElementById("bestelBoodschappen").hidden = true;
    }
}
function voegElementToe(element, boodschap, id) {
    const ul = document.getElementById(id);
    for(const child of ul.childNodes) {
        if(child.innerText === `${element.id} ${boodschap}`) {
            return;
        }
    }
    const li = document.createElement("li");
    li.innerText = `${element.id} ${boodschap}`;
    ul.appendChild(li);
}
function verwijderElement(element,boodschap, bron) {
    const ul = document.getElementById(bron).childNodes;
    for(const child of ul) {
        if(child.innerText === `${element.id} ${boodschap}`) {
            child.remove();
        }
    }
}