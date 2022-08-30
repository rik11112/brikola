import * as util from "./util.js";
import * as importrules from "./importrules.js";
import settings from "./settings.js";

const textContainer = document.getElementById('text-container');
const helpButton = document.getElementById('help-button');

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
        this.current = -1;
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
                let sips = Math.round(Math.random() * settings.slokken.value);
                sips = sips > 0 ? sips : 1;
                slide = slide.replace('$', sips);
            }
            //finishing touches
            slide = slide.replace('1 slokken', '1 slok');
            slide = slide.replace('1 times', '1 time');
            slide = slide.replace('1 sips', '1 sip');
            return slide;
        });
        return succes;
    }

    next() {
        if (this.type === 'to-be-continued') {
            if (this.slides.length > 1) {
                //eerste keer
                const minDuration = 5;  //todo, regelen da da rekening houdt met skips. Das wel wa werk.
                const returningRule = new Rule(this.slides.slice(1), this.name, 'returning', this.help);
                const returningIndex = count + Math.round(minDuration + Math.random() * (settings.duration.value - minDuration));
                rules = Array.from(rules);  //Making sure
    
                //Array.splice returns the deleted elements (0 in this case). But also inserts returningRule at returningIndex in the existing array.
                rules.splice(returningIndex, 0, returningRule);
                console.log(`to-be-continued return set at ${returningIndex}`);
                console.log(rules);
    
                //Now we delete the second slide in this rule so the prev button doesn't show it in the wrong place.
                this.slides = [this.slides[0]];
    
                return this.slides[++this.current]; //++current zodat deze slide niet nog eens wordt afgespeeld.
            } else {
                return null;
            }
            
        } else if (this.slides.length > ++this.current) {
            return this.slides[this.current];
        }
        return null;    //null = volgende rule
    }

    prev() {
        return this.slides(--current);
    }
}

function next() {
    //Huidige rule ophalen
    let rule = rules[count];

    //Fill als dat nog niet gebeurd is (bv bij de eerste keer)
    rule.fill()

    //kijken of de huidige rule nog slides heeft
    let slide = rule.next();
    if (slide != null) {
        //if so, slide tonen en klaar
        textContainer.innerHTML = slide;
        console.log('rule: ' + count);
        console.log(rule);
        return;
    }

    //anders nieuwe rule
    rule.active = false;
    rule = rules[++count];  //count wordt geüpdated

    //verifieëren dat deze rule goed is, anders blijven proberen
    while (!verifyRule(rule)) {  //verify rule called ook rule.fill(); en zet slechte rules op skipped=true
        rule = rules[++count];
    }    

    //Goedgekeurde rule op het scherm zetten
    slide = rule.next();
    textContainer.innerHTML = slide;  //houdt rekening met to-be-continued
    console.log('rule: ' + count);
    console.log(rule);
}

function verifyRule(rule) {
    let goe = true;
    if (!settings.edgeCases.value && rule.slides.any(r => r.toLocaleLowerCase().includes("vrouw") || r.type.toLocaleLowerCase().includes('dark'))) {
        goe = false;
    } else if (!settings.toBeContinued.value && rule.type === 'to-be-continued') {
        goe = false;
    } else {
        const depthLimit = 50
        const similarityTreshhold = 0.2;
        const depth = count <= depthLimit ? count - 1 : depthLimit;
        const history = Array.from(rules).slice(0, count - 1).filter(r => !r.skipped).slice(-depth, undefined);  //alle voorgaande -> filter -> laatste [depth] elementen
        if (history.some(h => rule.type === 'facebook' && h.type === 'facebook')) {
            //te gelijkaardig aan een voorgaande rule
            goe = false;
        }
    }

    if (goe === false) {
        //nie goe, skippe
        rule.skipped = true;
        rule.active = false;
    } else {
        //goe, probere te vullen
        goe = rule.fill();
    }

    if (goe === false) {
        rule.skipped = true;
        rule.active = false;
    }
    return goe;
}

function nextOud() {
    let rule = rules[count];

    let slide = rule.next();
    if (slide == null) {
        rule.active = false;
        rule = rules[++count];
    } else {

    }
    rule.current++;
    if (rule.type === 'to-be-continued' || rule.slides.count <= rule.current) {
        rule.active = false;    //Zodat prev() werkt
        next(); //Bij to-be-continued wordt de volgende slide later getoond via een andere Rule, als de slides op zijn go next zws.
        return;
    }

    if (!rule.active) {
        rule.active = true;
        let goe = false;
        while (!goe) {
            goe = true;
            if (!settings.edgeCases.value && rule.slides.any(r => r.toLocaleLowerCase().includes("vrouw") || r.type.toLocaleLowerCase().includes('dark'))) {
                goe = false;
            } else if (!settings.toBeContinued.value && rule.type === 'to-be-continued') {
                goe = false;
            } else {
                const depthLimit = 50
                const similarityTreshhold = 0.2;
                const depth = count <= depthLimit ? count - 1 : depthLimit;
                const history = Array.from(rules).slice(count - depth, count - 1).filter(r => !r.skipped);
                if (history.some(h => stringSimilarity.compareTwoStrings(h.slides[0], rule.slides[0]) > similarityTreshhold)) {
                    //te gelijkaardig aan een voorgaande rule
                    goe = false;
                }
            }

            if (goe === false) {
                //nie goe, skippe
                rule.skipped = true;
            } else {
                //goe, probere te vullen
                goe = rule.fill();
            }

            if (goe === false) {
                console.log("skipppp");
                rule = rules[count++];
            }
        }
    } else {
        
    }

    textContainer.innerHTML = rule.slides[rule.current];
}

function prev() {
    //todo, remember rule.skipped
}

function skip() {
    //todo, remember rule.skipped
}