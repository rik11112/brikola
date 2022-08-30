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

const savedSettingsKey = 'saved-settings';
let settingValues = localStorage.getItem(savedSettingsKey) || {
    slokken: 6,
    tetten: 0,
    duration: 10,
    edgeCases: false,
    toBeContinued: true,
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
        
        settingValues[key] = newValue;
        localStorage.setItem(savedSettingsKey, settingValues);
    });
});