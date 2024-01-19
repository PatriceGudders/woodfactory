"use strict"
let bestelGegevens;
leesBestelgegevens();
async function leesBestelgegevens() {
    const response = await fetch("javascript/houtsoorten.json");
    if (response.ok) {
        bestelGegevens = await response.json();
        const houtsoorten = document.getElementById("houtsoorten");
        for (const bestelGegeven of bestelGegevens) {
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
        }
    } else {
        document.getElementById("bestelGegevensFout").hidden = true;
    }
}
