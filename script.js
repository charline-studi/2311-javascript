/* 
États de notre Tamastudi possibles :
- 🥚 : partie non lancée
- 🐣 : naissance pendant tant qu'il n'a pas fait son 1er caca
Ensuite il devient un "grand" avec une humeur variable
- 😢 : triste 0/5
- 🙁 : pas content 1/5
- 🙂 : normal 2/5
- 😄 : content 3/5
- 🤗 : heureux 4/5
- 🥰 : très heureux 5/5
- 👻 : mort 0/5 pendant plus d'une minute 
Ses envies :
- 😋 : faim, aléatoire minimum 30 sec et max 3 minutes
- 🥱 : jouer, aléatoire minimum 30 sec et max 3 minutes
- 💩 : caca, aléatoire minimum 30 sec et max 1.30 minutes uniquement après avoir mangé
*/

const myTama = {
  name: "",
  alive: false,
  fed: 0,
  playfull: 0,
  cleaned: 0,
  lifeDuration: 0,
};

/* PHASE 0 : activer le tamastudi 
1) Cliquer sur le bouton du milieu
2) Ajouter un compteur qui attend d'avoir une valeur max de 5
3) Alors on fait naitre notre tama
*/
const start = () => {
  // 1) Cliquer sur le bouton du milieu
  const buttonCenter = document.querySelector(
    '.js-button[data-direction="center"]'
  );
  // 2) Ajouter un compteur qui attend d'avoir une valeur max de 5
  let count = 0;
  buttonCenter.addEventListener("click", () => {
    count++;
    if (count === 5) {
      // 3) Alors on fait naitre notre tama
      birth();
    }
  });
};

/* 
PHASE 1 : la naissance de mon tama 
1) demander le nom de mon personnage
2) fait éclore mon oeuf pour passer au poussin
3) affiche mes vitals
4) affiche le nom de mon tama dans les vitals
5) mettre les scores des vitals à 5
*/

const birth = () => {
  // 1) demander le prénom
  myTama.name = prompt("Quel nom a votre tamastudi ?");
  // 2) fait éclore mon oeuf pour passer au poussin
  showInScreen("🐣");
  // 3) affiche mes vitals
  const vitals = document.querySelector(".js-vitals");
  vitals.classList.remove("hidden");
  // 4) affiche le nom de mon tama dans les vitals
  const nameDisplay = document.querySelector(".js-tamaName");
  nameDisplay.textContent = myTama.name;
  // 5) mettre les scores des vitals à 5
  const defaultScore = 5;
  const scoresDisplay = document.querySelectorAll(".js-score");
  scoresDisplay.forEach((score) => {
    score.textContent = defaultScore;
  });
  myTama.fed = defaultScore;
  myTama.playfull = defaultScore;
  myTama.cleaned = defaultScore;
  // 6) afficher les actions
  const actions = document.querySelector(".js-actions");
  actions.classList.remove("hidden");
  // 7) appel de la fonction pour le faire "grandir"
  evolve();
  // 8) Calcule de la durée de vie
  lifeDuration();
};

/* PHASE 2 : l'évolution de mon tama
1) Attendre que notre tamaStudi ait une "première envie"
2) Il devient grand
*/
const evolve = () => {
  // 1) Attendre que notre tamaStudi ait une "première envie"
  const functionToExecute = () => {
    mood();
  };
  wantsTo(functionToExecute);
};

/* LES ENVIES : 
Fonction pour gérer 
- 😋 : faim, aléatoire minimum 30 sec et max 3 minutes
- 🥱 : jouer, aléatoire minimum 30 sec et max 3 minutes
- 💩 : caca, aléatoire minimum 30 sec et max 3 minutes uniquement après avoir mangé
1) Créer une fonction qu'on va pouvoir appeler plus tard dans notre code
2) Stocker les envies de mon tama dans une variable
3) Avec un setTimeout choisir une envie aléatoire
4) La durée du setTimeout est dynamique est comprise entre une valeur max et une valeur min
5) Afficher l'envie du tama sur notre écran 
6) L'envie de faire caca ne peut être faite que s'il a déjà mangé
*/
const wantsTo = (callback) => {
  const needs = ["😋", "🥱", "💩"];
  const minDuration = 1000;
  const maxDuration = 3000;
  const duration = getRandomInt({
    min: minDuration,
    max: maxDuration,
  });
  setTimeout(() => {
    const randomIndexNeeds = getRandomInt({
      max: needs.length,
    });
    const desire = needs[randomIndexNeeds];
    if (callback) {
      callback();
    } else {
      showInScreen(desire);
    }
  }, duration);
};

/* HUMEUR  GÉNÉRALE :
Une fonction qui calcule la moyenne des 3 indicateurs faim, ennui, prorpété de notre Tama.
Et elle affiche cette moyenne dans les vitals
*/
const mood = () => {
  // Partie 1 : affichage numérique
  const sum = myTama.fed + myTama.playfull + myTama.cleaned;
  const average = sum / 3;
  const rounded = Math.round(average);
  const displayMood = document.querySelector(".js-mood");
  displayMood.textContent = rounded;
  // Partie 2 : affichage visuel
  const listOfEmojis = ["😢", "🙁", "🙂", "😄", "🤗", "🥰"];
  showInScreen(listOfEmojis[rounded]);
};

/* DURÉE DE VIE :
Une fonction qui toutes les minutes met à jour la durée de vie du Tama
*/
const lifeDuration = () => {
  const duration = 60_000; // 60 secondes
  const displayLifeDuration = document.querySelector(".js-life-duration");
  setInterval(() => {
    myTama.lifeDuration++;
    displayLifeDuration.textContent = myTama.lifeDuration;
  }, duration);
};

/* Fonction du retourne un nombre aléatoire compris entre un min et max */
const getRandomInt = (props) => {
  const max = props.max;
  // Ternaire = condition "raccourcie" = condition ? valeur si oui : valeur si non
  const min = props.min ? props.min : 0;
  return Math.floor(Math.random() * (max - min) + min);
};

/* Fonction qui gère l'affichage des emoticones dans l'écran du tama */
const character = document.querySelector(".js-character");
const showInScreen = (display) => {
  character.textContent = display;
};

// Lance la fonction de "début de mon Tama"
start();
