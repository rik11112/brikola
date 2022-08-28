import * as util from "./util.js";
import * as importrules from "./importrules.js";

const textContainer = document.getElementById('text-container');
const helpButton = document.getElementById('help-button');
const settings = {
    slokken: document.getElementById('slokken-input'),
    tetten: document.getElementById('tetten-input'),
    duration: document.getElementById('duration-input'),
    edgeCases: document.getElementById('edge-cases-input'),
    toBeContinued: document.getElementById('to-be-continued-input'),
}

const namenContainer = document.getElementById("namen");
let players = [];
let rules;
let count = 0;
//when you go to the game tab
util.addClickListener('nav-game-tab', () => {
    players = Array.from(namenContainer.getElementsByTagName('input')).map(i => i.value).filter(val => val !== '');
    if (rules == undefined) {
        rules = importrules.init();
        next();
    }
}, true);
//when you click on the screen
util.addClickListener('nav-game', () => {
    next();
}, true);

export default class Rule {
    constructor(slides, name, type, help) {
        this.slides = Array.from(slides);
        this.name = name;
        this.current = 0;
        this.help = help;
        this.type = type;
        this.active = false;
        this.skipped = false;
    }

    fill() {
        players = players.sort(() => Math.random() - 0.5);
        let succes = true;
        this.slides = this.slides.map(slide => {
            let i = 0;
            while (slide.includes('%s')) {
                try {
                    slide = slide.replace('%s', players[i++]);
                } catch (e) {
                    //te weinig spelers
                    this.skipped = true;
                    succes = false;
                    break;
                }
            }
            while (slide.includes('$')) {
                slide = slide.replace('$', Math.round(Math.random() * settings.slokken.value));
            }
            return slide;
        });
        return succes;
    }

    get next() {
        if (type === 'to-be-continued') {
            const returningRule = new Rule(this.slides.slice(1), this.name, this.type, this.help);
            rules[count + Math.round(Math.random() * settings.duration)]
        }
        return this.slides(++current);
    }

    get prev() {
        return this.slides(--current);
    }
}



function next() {
    let rule = rules[count++];

    if (!rule.active) {
        rule.active = true;
        let goe = false;
        while (!goe) {
            goe = true;
            if (!settings.edgeCases.value && rule.slides.any(r => r.toLocaleLowerCase().includes("vrouw") || r.type.toLocaleLowerCase().includes('dark'))) {
                goe = false;
            } else if (!settings.toBeContinued.value && rule.type === 'to-be-continued') {
                goe = false;
            }

            if (goe === false) {
                //nie goe, skippe
                rule.skipped = true;
            } else {
                //goe, probere te vullen
                goe = rule.fill();
            }

            if (goe === false) {
                rule = rules[count++];
            }
        }
    } else {
        rule.current++;
        if (rule.type === 'to-be-continued' || rule.slides.count <= rule.current) {
            rule.active = false;    //Zodat prev() werkt
            next(); //Bij to-be-continued wordt de volgende slide later getoond via een andere Rule, als de slides op zijn go next zws.
        }
    }

    textContainer.innerHTML = rule.slides[rule.current];
}

function prev() {
    //todo, remember rule.skipped
}

function skip() {
    //todo, remember rule.skipped
}