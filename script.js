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
- 💩 : caca, aléatoire minimum 30 sec et max 1.30 minutes après avoir mangé
*/

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
  // demander le prénom
  const tamaName = prompt("Quel nom a votre tamastudi ?");
  // 2) fait éclore mon oeuf pour passer au poussin
  const character = document.querySelector(".js-character");
  character.textContent = "🐣";
  // 3) affiche mes vitals
  const vitals = document.querySelector(".js-vitals");
  vitals.classList.remove("hidden");
  // 4) affiche le nom de mon tama dans les vitals
  const nameDisplay = document.querySelector(".js-tamaName");
  nameDisplay.textContent = tamaName;
  // 5) mettre les scores des vitals à 5
  const scoresDisplay = document.querySelectorAll(".js-score");
  scoresDisplay.forEach((score) => {
    score.textContent = 5;
  });
  // 6) afficher les actions
  const actions = document.querySelector(".js-actions");
  actions.classList.remove("hidden");
};

/* PHASE 2 : l'évolution de mon tama
1) Attendre que notre tamaStudi ait une "première envie"
2) Il devient grand
*/
setTimeout(() => {
  console.log("1 seconde est passée");
}, 1000);

// Lance la fonction de "début de mon Tama"
start();
