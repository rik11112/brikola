import * as util from "./util.js";

const namenContainer = document.getElementById("namen");
let naamteller = 0;

function addNameBox() {
    const container = document.createElement('div');
    container.innerHTML = `
    <div class="input-group mb-2 ps-3 pe-3">
    <input type="text" class="form-control" id="input${++naamteller}" placeholder="Erica..." aria-label="Recipient's username" aria-describedby="basic-addon2">
    <span class="input-group-text" id="vuilbak${naamteller}"><i class="bi bi-trash-fill text-danger"></i></span>
    </div>`;
    namenContainer.appendChild(container);
    document.getElementById(`input${naamteller}`).focus();
    util.addClickListener(`vuilbak${naamteller}`, e => {
        e.target.parentElement.parentElement.remove();
    });
}

util.addClickListener("add-name", addNameBox);
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addNameBox();
    }
});
addNameBox();