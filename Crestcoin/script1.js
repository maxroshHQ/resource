let coins = 0;
let currentLevel = 1;
const coinsToLevelUp = 1000000;
const maxLevel = 10;

function addCoins() {
    coins += 10;
    document.getElementById('score').textContent = ` ${coins.toLocaleString()}`;
    
    // Save the coins value to localStorage
    localStorage.setItem('coins', coins);

    const progressPercent = (coins % coinsToLevelUp) / coinsToLevelUp * 100;
    document.getElementById('progress').style.width = progressPercent + '%';

    if (coins >= coinsToLevelUp * currentLevel && currentLevel < maxLevel) {
        currentLevel++;
        document.getElementById('currentLevel').textContent = currentLevel;

        // Save the current level to localStorage
        localStorage.setItem('currentLevel', currentLevel);
    }
    document.getElementById('clickSound').play();
}

function loadProfile() {
    const userName = localStorage.getItem('userName');
    const profilePic = localStorage.getItem('profilePic');
    
    // Load the saved coins value from localStorage
    const savedCoins = localStorage.getItem('coins');
    if (savedCoins) {
        coins = parseInt(savedCoins, 10);
        document.getElementById('score').textContent = ` ${coins.toLocaleString()}`;
    }

    // Load the saved current level from localStorage
    const savedLevel = localStorage.getItem('currentLevel');
    if (savedLevel) {
        currentLevel = parseInt(savedLevel, 10);
        document.getElementById('currentLevel').textContent = currentLevel;
    }

    if (userName) {
        document.getElementById('userName').textContent = userName;
    }
    if (profilePic) {
        document.getElementById('profilePic').src = profilePic;
    }
}

window.onload = loadProfile;

