console.log("Dude");
// Player and opponent objects
const player = {
    hp: 100,
    items: ['Healing Potion', 'sword','Healing Potion', 'shield','Healing Potion','Healing Potion'],
};


const opponent = {
    hp: 20,
};

// Zones
const zones = {
    close: 'Close',
    near: 'Near',
    far: 'Far',
};

let currentZone = zones.close;
let isPlayerTurn = true;

// Combat log
const combatLog = document.getElementById('combat-log');

// Function to start the combat loop
function startCombat() {
    updateCombatLog('Combat started!');
    playerTurn();
}

// Player turn function
function playerTurn() {
    if (player.hp > 0 && opponent.hp > 0) {
        isPlayerTurn = true;
        document.getElementById('player-menu').style.display = 'block';
    } else {
        endCombat();
    }
}

// Attack function
function attack(type) {
    if (isPlayerTurn) {
        document.getElementById('player-menu').style.display = 'none';
        let damage = Math.floor(Math.random() * 10) + 1;
        opponent.hp -= damage;
        updateCombatLog(`Player attacks with ${type}, dealing ${damage} damage!`);
        updateCombatLog(`Opponent HP: ${opponent.hp}`);
        checkCombatStatus();
        if (opponent.hp > 0) {
            setTimeout(opponentTurn, 1000); // Delay opponent's turn
        }
    }
}

// Use item function
function useItem() {
    if (player.items.length > 0) {
        let item = player.items.pop();
        if (item === 'Healing Potion') {
            let healAmount = Math.floor(Math.random() * 20) + 1;
            player.hp += healAmount;
            updateCombatLog(`Player uses ${item}, healing ${healAmount} HP!`);
            updateCombatLog(`Player HP: ${player.hp}`);
        }
    }
}

// Opponent turn function
function opponentTurn() {
    if (player.hp > 0 && opponent.hp > 0) {
        isPlayerTurn = false;
        let action = opponentDecideAction();
        if (action === 'attack') {
            let damage = Math.floor(Math.random() * 10) + 1;
            player.hp -= damage;
            updateCombatLog(`Opponent attacks, dealing ${damage} damage!`);
            updateCombatLog(`Player HP: ${player.hp}`);
        }
        checkCombatStatus();
        if (player.hp > 0) {
            setTimeout(playerTurn, 1000); // Delay player's turn
        }
    }
}

// Opponent decision function
function opponentDecideAction() {
    // Example logic for opponent action decision
    let actions = ['attack']; // Add more actions as needed
    let randomIndex = Math.floor(Math.random() * actions.length);
    return actions[randomIndex];
}

// Check combat status
function checkCombatStatus() {
    if (player.hp <= 0) {
        updateCombatLog('Player has been defeated!');
    } else if (opponent.hp <= 0) {
        updateCombatLog('Opponent has been defeated!');
    }
}

// Update combat log
function updateCombatLog(message) {
    const logEntry = document.createElement('div');
    logEntry.textContent = message;
    combatLog.appendChild(logEntry);
}

// Zone selection
document.getElementById('zones').addEventListener('change', function(event) {
    currentZone = event.target.value;
    updateCombatLog(`Zone changed to: ${currentZone}`);
});

// Start combat
startCombat();

//when you select the inventory a dropdown of items comes up. 
function showInventory(){
    console.log("inventory")
    var inventory = document.getElementById("Inventory");
    var inventoryList = document.createElement("ul");
    

    for (let i = 0; i < player.items.length; i++) {
        let element = player.items[i];
        console.log(element);
        
        let item = document.createElement("li");
        item.innerHTML = element;
        
        if (element == "Healing Potion") {
            item.setAttribute("onClick", "heal( "+i+")");
        }
        
        item.setAttribute("id", i);
        inventoryList.append(item);
    }

    inventory.append(inventoryList)

}

function heal(arr){
    var index = arr;
    console.log("HEALING!")
    player.hp += 10;
    removeInventory(index);
    
}

function removeInventory(elem){
   
    var index = elem

    // If the value at the current array index matches the specified value (2)
    console.log(player.inventory)
    // Removes the value from the original array
   
         player.items.splice(index, 1);
        document.getElementById("Inventory").innerHTML = "";
        showInventory();
        console.log(player.items);
   
    
}

// Pass the removeValue function into the filter function to return the specified value


//When you select an item, it removes the inventory dropdown and presents a question on whether or not to use the item or equip a weapon or armour or artifact.

//When you say no, it hides that previous question and you can decide on what to do.

//when you say yes, it uses the function of the item. 

//if it's a weapon it equips the item to you. 
