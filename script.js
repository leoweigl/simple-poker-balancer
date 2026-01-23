'use strict';

let bags= {};
let useBagRandom = true;
const toggleMode= document.getElementById("toggleMode");
const app_version = "1.0.0";
const borders = [10, 20, 30, 40, 50];
const check = "You should check.";
const bet = "Bet this time.";
const raise = "Raise!";
const call = "You're fine calling.";
const fold = "Fold.";
const optionGroups = [
    { key: "check", buttons: ["check10", "check20", "check30", "check40", "check50"], option1: check, option2: bet},
    { key: "bet", buttons: ["bet10", "bet20", "bet30", "bet40", "bet50"], option1: bet, option2: check},
    { key: "call", buttons: ["call10", "call20", "call30", "call40", "call50"], option1: call, option2: raise},
    { key: "raise", buttons: ["raise10", "raise20", "raise30", "raise40", "raise50"], option1: raise, option2: call},
    { key: "foldHi", buttons: ["fold90", "fold80", "fold70", "fold60", "fold50hi"], option1: call, option2: fold},
    { key: "foldLo", buttons: ["fold10", "fold20", "fold30", "fold40", "fold50lo"], option1: fold, option2: call}
];

function resetBags(){
    for (const key in bags) {
        delete bags[key];
    }
}
function updateToggleMode(){
        toggleMode.textContent = useBagRandom
        ? "🧮 Mode: BAG"
        : "🎲 Mode: PURE RANDOM";

        toggleMode.classList.toggle("result", useBagRandom);
}
function getBag(key, border){
    if(!bags[key] || bags[key].length === 0){
        bags[key] = makeBag(border);
    }
    return bags[key];
}
function setDecisionText(buttonId, labelId, option1, option2, border, groupKey){
    const button = document.getElementById(buttonId);
    const label = document.getElementById(labelId);
    if (!button || !label) return;

    button.addEventListener("click", () => {
        clearAllLabels();
        clearAllResults();

        const decision = getRandomDecision(border, groupKey);

        button.classList.add("result");
        setTimeout(() => {
            label.textContent = decision ? option1 : option2;
            label.classList.add("show");
        }, 240);
    });
}
function getRandomDecision(border, groupKey){
    if(useBagRandom){
        const bagKey = border + "_" + groupKey;
        const bag = getBag(bagKey, border);
        return bag.pop();
    }else{
        return Math.random() < border / 100;
    }
}
function makeBag(percent){
    const bag = [];
    for (let i = 0; i < 100; i++){
        bag.push(i < percent);
    }
    return shuffle(bag);
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
}
function clearAllResults(){
    document.querySelectorAll(".option")
        .forEach(btn => btn.classList.remove("result"));
}
function clearAllLabels(){
    document.querySelectorAll(".decision").forEach(label => {
        if (label.textContent !== "") label.textContent = "";
    });
}

updateToggleMode();
document.getElementById("version").textContent = app_version;
document.getElementById("reset").addEventListener("click", clearAllLabels);
document.getElementById("reset").addEventListener("click", clearAllResults);

toggleMode.addEventListener("click", () => {
        useBagRandom = !useBagRandom;
        resetBags();
        updateToggleMode();
});

for(let i in borders){
    const border = borders[i];
    optionGroups.forEach(group => {
        setDecisionText(
            group.buttons[i],
            "decision" + border,
            group.option1,
            group.option2,
            border,
            group.key
        );
    });
}