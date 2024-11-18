// stats
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = [];

// classes recap info
const classRecap = document.getElementById("class-recap"); 
const pvRecap = document.getElementById("pv-recap"); 
const bonusRecap = document.getElementById("bonus-recap"); 
const masteringRecap = document.getElementById("mastering-recap"); 
const speRecap = document.getElementById("specialisation-recap"); 
const choiceRecap = document.getElementById("choice-recap");

// buttons
const button1 = document.querySelector('#button1');
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const button4 = document.querySelector("#button4");
const validateName = document.getElementById("validate-name");
const validateClass = document.getElementById("validate-class");
const intelBtn = document.getElementById("intel-btn");
const strBtn = document.getElementById("str-btn");
const dexBtn = document.getElementById("dex-btn");
const constBtn = document.getElementById("const-btn");
const charBtn = document.getElementById("char-btn");
const wisdomBtn = document.getElementById("wisdom-btn");
const validateExpertiseBtn = document.getElementById("validate-expertise");

// text
const text = document.querySelector("#text");
const chosenName = document.getElementById("chosen-name");
const playerName = document.getElementById("player-name");
const playerClass = document.getElementById("player-class");
const habilityText = document.getElementById("habilityText");
const enduranceText = document.getElementById("enduranceText");
const goldText = document.querySelector("#goldText");
const expertiseOne = document.getElementById("expertise-choice-one");
const expertiseTwo = document.getElementById("expertise-choice-two");
const alertExpertise = document.getElementById("alert-expertise");

// monsters infos
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

// weapons array
const weapons = [
  { name: "a staff", die: "1d4"},
  { name: "a dagger", die: "1d4"}, 
  { name: "a short sword", die: "1d4"}, 
  { name: "a spear", die: "1d4"}, 
  { name: "a long sword", die: "1d6"}, 
  { name: "a war axe", die: "1d6"}, 
  { name: "a war hammer", die: "1d6"},
  { name: "a halberd", die: "1d6"}, 
  { name: "a weapon mace", die: "1d6"}, 
  { name: "a longbow", die: "1d4"}, 
  { name: "a crossbow", die: "1d6"} 
];

// monsters array
const monsters = [
  {
    name: "slime",
    level: 2,
    health: 15
  },
  {
    name: "gobelin", 
    level: 4, 
    health: 35
  },
  {
    name: "fanged beast",
    level: 8,
    health: 60
  },
  {
    name: "giant spider", 
    level: 11,
    health: 80
  },
  {
    name: "ice dragon",
    level: 20,
    health: 300
  }
];

// locations array
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says \"Store\"."
  },
  {
    name: "store",
    "button text": ["Buy 10 health (10 gold)", "Buy weapon (30 gold)", "Go to town square"],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store."
  },
  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    "button text": ["Go to town square", "Go to town square", "Go to town square"],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.'
  },
  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;"
  },
  { 
    name: "win", 
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"], 
    "button functions": [restart, restart, restart], 
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;" 
  },
  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town square?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
  }
];

// Initialise stats and info
// Choose a non empty string name
const errorNameP = document.getElementById("error-name");
const nameDiv = document.getElementById("name-div");

// Verify if the player chose a valid name
const hasChosenAName = () => {
  if (chosenName.value !== "") {
    return true;
  } else { // Add an alert if not
    if (!document.getElementById("error-name")) {
      const errorP = document.createElement("p");
      errorP.id = "error-name";
      errorP.innerText = "Please choose a valid name.";
      nameDiv.appendChild(errorP);
    }
    return false;
  }
};

// if the player choose a valid name : display or hide the alert msg
const errorName = () => {
  const errorElement = document.getElementById("error-name");
  if (errorElement) {
    errorElement.classList.add("hidden");
  }
};

// fill the Name span with the right name chosen by the player
function fillName() {
  if (hasChosenAName()) {
    playerName.innerText = `${chosenName.value}`;
    document.getElementById("chosen-name-label").classList.toggle("hidden");
    chosenName.classList.toggle("hidden");
    validateName.classList.toggle("hidden");
    errorName(); // remove the alert if there was one
  } else {
    hasChosenAName(); // add the alert 
  }
};

// execute the function on click
validateName.addEventListener("click", () => {
  fillName();
});

// Abilities stats
const abilities = ["intel", "str", "dex", "const", "char", "wisdom"];
// Attribute a value between 1 and 20 to each ability
const abilityScore = (event) => {

  const ability = event.target.id.replace("-btn", "");
  let score = Math.floor(Math.random() * 20) + 1;

  const scoreElement = document.getElementById(`${ability}-score`);
  const btnElement = document.getElementById(`${ability}-btn`);
  const alert = document.getElementById(`${ability}-alert`);

  if (score >= 10) {
    btnElement.classList.toggle("hidden");
    alert.classList.add("hidden");
    let currentScore = parseInt(scoreElement.innerText) || 0;
    if (currentScore + score >= 20) {
      scoreElement.innerText = 20;
    } else {
      scoreElement.innerText = currentScore + score;
    }
  } else {
    alert.classList.remove("hidden");
  }
}

// update the ability modifier 
const abilityModifier = (ability) => {
  let scoreElement = document.getElementById(`${ability}-score`);
  let modifierElement = document.getElementById(`${ability}-modifier`);
  
  let score = parseInt(scoreElement.innerText) || 0;

  let modifier = 0;
  if (score == 20) {
    modifier = 3;
  } else if (score >= 16) {
    modifier = 2;
  } else if (score >= 11) {
    modifier = 1;
  }

  modifierElement.innerText = modifier;
}

// for each ability : call the 2 functions above
abilities.forEach((ability) => {
  const btnElement = document.getElementById(`${ability}-btn`);
  const scoreElement = document.getElementById(`${ability}-score`);

  const abilityAlert = document.createElement("p");
  abilityAlert.innerText = "Please roll again.";
  abilityAlert.setAttribute("id", `${ability}-alert`);
  abilityAlert.classList.add("hidden");
  const abilityDiv = document.getElementById(`${ability}`);
  abilityDiv.appendChild(abilityAlert);

  if (btnElement && scoreElement) {
    btnElement.onclick = abilityScore;
    scoreElement.addEventListener("DOMSubtreeModified", () => {
      abilityModifier(ability);
    });
  } else {
    console.warn(`Élément manquant pour la capacité : ${ability}`);
  }
});

// Starting gold amount
document.getElementById("gold-btn").onclick = () => {
  goldText.innerText = Math.floor(Math.random() * 20) + 11;
  document.getElementById("gold-btn").classList.toggle("hidden");
}

// Chosen class 
let selectedClass = document.getElementById("selected-class");
let classes = [
  {
    name: "Barbarian", pv: 12, bonus: 3, ability_recap: "Strength", ability: "str", master: "all weapons and armours", skills: ["Athletics", "Training", "Intimidation", "Nature", "Perception", "Survival"], weapon: "a short sword", belongings: ["5 survival rations"]
  }, 
  {
    name: "Magician", pv: 6, bonus: 3, ability_recap: "Wisdom", ability: "wisdom", master: "staffs, light weapons and light armours", skills: ["Arcana", "History", "Intuition", "Investigation", "Medicine", "Religion", "Deception"], weapon: "a staff", belongings: ["satchel with magical components", "5 survival rations", "a grimoire"]
  }, 
  {
    name: "Monk", pv: 8, bonus: 3, ability_recap: "Intelligence", ability: "intel", master: "all light weapons and light and heavy armours", skills: ["Acrobatics", "Athletics", "Discretion", "History", "Intuition", "Persuasion", "Representation", "Religion"], weapon: "a spear", belongings: ["5 survival rations"]
  }, 
  {
    name: "Ranger", pv: 10, bonus: 3, ability_recap: "Dexterity", ability: "dex", master: "light weapons and armour as well as ranged weapons", skills: ["Athletics", "Discretion", "Dressage", "Escamotage", "Intuition", "Investigation", "Nature", "Perception", "Survival"], weapon: "a longbow", belongings: ["5 survival rations", "a quiver with 20 arrows"]
  }
];

// get the right class from the classes array
const getSelectedClass = () => {
  return classes.find((cls) => cls.name === selectedClass.value);
}

// update class recap depending on class choice
const updateClassRecap = () => {
  const chosenClass = getSelectedClass();
  if (!chosenClass) return; 

  pvRecap.innerText = `Your ${chosenClass.name} will begin with ${chosenClass.pv} pv added to his Constitution roll.`;
  bonusRecap.innerText = `Your ${chosenClass.name} will have a bonus of +${chosenClass.bonus} in ${chosenClass.ability_recap}.`;
  masteringRecap.innerText = `Your ${chosenClass.name} can master ${chosenClass.master}.`;
  speRecap.innerText = `Your ${chosenClass.name} can master two of the following: ${chosenClass.skills.join(", ")}.`;
  choiceRecap.innerText = `Your ${chosenClass.name} will begin with the following weapon: ${chosenClass.weapon}.`;
};

// when the player validate his class choice, everything linked to this class update automatically
const validateClassChoice = () => {
  const chosenClass = getSelectedClass();
  if (!chosenClass) return;

  classRecap.classList.add("hidden");
  validateClass.classList.add("hidden");
  selectedClass.classList.add("hidden");
  playerClass.innerText = `${chosenClass.name}`;

  const abilityScore = document.getElementById(`${chosenClass.ability}-score`);
  if (abilityScore) {
    const finalAbilityScore = Number(abilityScore.innerText) + Number(chosenClass.bonus);
    // abilities.forEach((ability) => { abilityModifier(ability)});
    if (finalAbilityScore <= 20) {
      abilityScore.innerText = finalAbilityScore;
    } else {
      abilityScore.innerText = 20;
    }
  }
  
  document.getElementById("selected-class-label").classList.add("hidden");

  return chosenClass;
};

selectedClass.addEventListener("change", updateClassRecap);
validateClass.addEventListener("click", () => {
  expertiseChoices();
});

// Expertises Choices
const selectedExpertiseOne = document.getElementById("select-expertise-one");
const selectedExpertiseTwo = document.getElementById("select-expertise-two");

const expertiseChoices = () => {
  const chosenClass = validateClassChoice();
  
  chosenClass.skills.forEach((skill) => {
    const skillOptionOne = document.createElement("option");
    const skillOptionTwo = document.createElement("option");
    skillOptionOne.value = `${skill}`;
    skillOptionTwo.value = `${skill}`;
    skillOptionOne.innerText = `${skill}`;
    skillOptionTwo.innerText = `${skill}`;
    selectedExpertiseOne.appendChild(skillOptionOne);
    selectedExpertiseTwo.appendChild(skillOptionTwo);
  });
};

const chosenExpertiseOne = () => {
  return selectedExpertiseOne.value;
};

const chosenExpertiseTwo = () => {
  return selectedExpertiseTwo.value;
};

selectedExpertiseOne.addEventListener("change", chosenExpertiseOne);
selectedExpertiseTwo.addEventListener("change", chosenExpertiseTwo);

const validateExpertiseChoices = () => {
  if (chosenExpertiseOne() === chosenExpertiseTwo()) {
    alertExpertise.innerText = "Please choose two different expertises.";
  } else {
    expertiseOne.innerHTML += `${chosenExpertiseOne()}`;
    expertiseTwo.innerHTML += `${chosenExpertiseTwo()}`;
    document.getElementById("select-expertise-one-label").classList.add("hidden");
    selectedExpertiseOne.classList.add("hidden");
    document.getElementById("select-expertise-two-label").classList.add("hidden");
    selectedExpertiseTwo.classList.add("hidden");
    validateExpertiseBtn.classList.add("hidden");
    alertExpertise.classList.add("hidden");
  }
}; 

validateExpertiseBtn.addEventListener("click", validateExpertiseChoices);

// initialise buttons
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  if(location["button text"][0]) {
    button1.innerText = location["button text"][0];
    button1.onclick = location["button functions"][0];
    if(location["button text"][1]) {
      button2.innerText = location["button text"][1];
      button2.onclick = location["button functions"][1];
      if(location["button text"][2]) {
        button3.innerText = location["button text"][2];
        button3.onclick = location["button functions"][2];
        if(location["button text"][3]) {
          button4.style.display = "block";
          button4.innerText = location["button text"][3];
          button4.onclick = location["button functions"][3];
        } 
      } else {
        hideBtn3();
      }
    } else {
      hideBtn2();
      hideBtn3();
    }
  }
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}

function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

function hideBtn2() {
  button2.style.display = "none";
}

function hideBtn3() {
  button3.style.display = "none";
}

function buyHealth() {
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}

function buyWeapon() {
  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;
      text.innerText = "You now have a " + newWeapon + ".";
      inventory.push(newWeapon);
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  fighting = 2;
  goFight();
}

function goFight() {
  update(locations[3]);
  monsterHealth = monsters[fighting].health;
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;    
  } else {
    text.innerText += " You miss.";
  }
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  if (Math.random() <= .1 && inventory.length !== 1) {
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = (level * 5) - (Math.floor(Math.random() * xp));
  console.log(hit);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > .2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}

function pick(guess) {
  const numbers = [];
  while (numbers.length < 10) {
    numbers.push(Math.floor(Math.random() * 11));
  }
  text.innerText = "You picked " + guess + ". Here are the random numbers:\n";
  for (let i = 0; i < 10; i++) {
    text.innerText += numbers[i] + "\n";
  }
  if (numbers.includes(guess)) {
    text.innerText += "Right! You win 20 gold!";
    gold += 20;
    goldText.innerText = gold;
  } else {
    text.innerText += "Wrong! You lose 10 health!";
    health -= 10;
    healthText.innerText = health;
    if (health <= 0) {
      lose();
    }
  }
}
