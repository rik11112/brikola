import * as util from "./util.js";

const settings = {
    slokken: util.getById('slokken-input'),
    tetten: util.getById('tetten-input'),
    duration: util.getById('duration-input'),
    edgeCases: util.getById('edge-cases-input'),
    toBeContinued: util.getById('to-be-continued-input'),
}
const labels = {
    slokken: util.getById('slokken-label'),
    tetten: util.getById('tetten-label'),
    duration: util.getById('duration-label'),
}
const labelsValues = {
    slokken: 'Max slokken',
    tetten: 'Tette',
    duration: 'Max duratie regel',
}
export default settings;

let settingValues = {
    slokken: localStorage.getItem('slokken') || 6,
    tetten: localStorage.getItem('tetten') || 0,
    duration: localStorage.getItem('duration') || 10,
    edgeCases: localStorage.getItem('edgeCases') || false,
    toBeContinued: localStorage.getItem('toBeContinued') || true,
}

Object.entries(settings).forEach(pair => {
    const [key, elem] = pair;
    elem.value = settingValues[key];    //instellen van opgeslagen || default values

    //listeners plaatsen om labels en localStorage te updaten
    elem.addEventListener('input', e => {
        let newValue = elem.value;
        if (elem.type === 'range') {
            //label update alleen bij ranges
            let normalText = labelsValues[key];
            let newText = `${normalText}: ${newValue}`;
            labels[key].innerText = newText;
            setTimeout(() => {
                if (labels[key].innerText === newText) {
                    labels[key].innerText = normalText;
                }
            }, 1000);
        }

        settingValues[key] = parseInt(newValue);
        localStorage.setItem(key, settingValues[key]);
    });
});


//secret settings
const settingsTab = util.getById('nav-settings-tab');
let timePressDown;
settingsTab.onpointerdown = function () {
    timePressDown = Date.now();
}
settingsTab.onpointerup = function () {
    let downHoldingTime = Date.now() - timePressDown;
    if (downHoldingTime > 1000) {
        util.getById('tetten-setting-container').classList.toggle('d-none');
    }
}