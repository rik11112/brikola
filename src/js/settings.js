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
export default settings;

let settingValues = localStorage.getItem('saved-settings') || {
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
    
});