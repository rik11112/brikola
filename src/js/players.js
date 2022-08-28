import * as util from "./util.js";

const namenContainer = document.getElementById("namen");
let naamteller = -1;    //++naamteller maakt zo nog gebruik van het 0de element.
const suggestions = [
    'Erica',
    'Dirk',
    "Justin Cas",
    "Klaartje Kome",
    "Metje Ho",
    "Douwe Scha",
    "Truusje Spetter-Kwa",
    "Jos Thi",
    "Dick Sac",
    "Donald Duk",
    "Con Domen",
    "Piet Sama",
    "Connie Moeleker",
    "Coby Potappel-Stroop",
    "Alco Liest",
    "Dies Groot",
    "I.C. Notting",
    "Bas Sillen",
    "Peter Celie",
    "Kenny Boeijen",
    "Willie Wortel",
    "Patty Kloot",
    "Connie Vroegop",
    "Tukkie Tuk",
    "Hans Schoen",
    "Anti Kip",
    "Philip Heynen",
    "Fokje Modder",
    "Constant Lam",
    "Jos Tibant",
    "Coos Busters",
    "Conny Plassen",
    "Chil Persoon",
    "Izzy van isteren",
    "Wil Krikke",
    "Brad Wursten",
    "Charrel Kip",
    "Stanley Messie",
    "Coos Busters",
    "Anna Nas",
    "Wil Krikke",
    "Izzy van Gisteren",
    "Conny Plassen",
    "Meneer K. Bouter",
    "Mevrouw Potappel - Stroop",
    "Beau ter Ham",
    "Trui Halfmouw",
    "Wil-Jannie Mostert-Uit de fles",
    "Henny Spekken-Bonen",
    "K.Bouter",
    "S.M.Kelders",
    "Claar Comen",
    "Connie Comen",
    "Yvette Kip",
    "Patty Koot",
    "Connie Veren",
    "Douwe Schat",
    "Dick Wijfje",
    "Barb Dwyer",
    "Pearl Button",
    "Hazel Nutt",
    "Ray Gunn",
    "Helen Back",
    "Stan Still",
    "Jo King",
    "Lee King",
    "Terry Bull",
    "Mary Christmas",
    "Max Power",
    "Paige Turner",
    "Sonny Day",
    "Tim Burr",
    "Teresa Green",
    "Will Power",
    "Anna Sain",
    "Chris Cross",
    "Doug Hole",
    "Justin Case",
    "Barry Cade",
    "Bennie Dood",
    "Bing Go",
    "Bob Bel",
    "Bob Sleeman",
    "Chris Musch",
    "Dave Filet",
    "Douwe Kwak",
    "Ellis Tieke",
    "Frank Rijk",
    "Jo de Jong",
    "Kin Ki Jim",
    "Ko Mies",
    "Louwe Pruim",
    "Mette Bus",
    "Panda De Haan",
    "Mevrouw Plu- in ’t Hol",
    "Storm ’t Hart",
    'Sonne Straal',
    'Ben Boute',
    'Joyce de Roo-Bot',
    'Wil Bierman',
    'Ron de Bil',
    'Bennie Koekoek',
    'Bas Sillen',
    'Pie Kant',
    'Liv Frie',
    'Cobie Potappel-Stroop',
    'Heidy Heij',
    'Nick Simons',
    'Fee Mos',
    'Phuong Du',
    'Han Kaas',
    'Hans Coenen',
    'Lammy Schaap',
    'Dick Hop',
    'Jeu Boelen',
]

function addNameBox() {
    const container = document.createElement('div');
    container.innerHTML = `
    <div class="input-group mb-2 ps-3 pe-3">
    <input type="text" class="form-control" id="input${++naamteller}" placeholder="${suggestions[naamteller >= suggestions.length ? naamteller - suggestions.length * Math.floor(naamteller / suggestions.length) : naamteller]}..." aria-label="Recipient's username" aria-describedby="basic-addon2">
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