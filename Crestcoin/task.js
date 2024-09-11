let coins = 0;
let currentLevel = 1;
const coinsToLevelUp = 1000000;
const maxLevel = 10;

let tasksCompleted = {
    like: false,
    retweet: false,
    comment: false,
    engage: false
};

function addCoins(amount) {
    coins += amount;
    document.getElementById('score').textContent = ` ${coins.toLocaleString()}`;
    
    localStorage.setItem('coins', coins);

    const progressPercent = (coins % coinsToLevelUp) / coinsToLevelUp * 100;
    document.getElementById('progress').style.width = progressPercent + '%';

    if (coins >= coinsToLevelUp * currentLevel && currentLevel < maxLevel) {
        currentLevel++;
        document.getElementById('currentLevel').textContent = currentLevel;

        localStorage.setItem('currentLevel', currentLevel);
    }
    document.getElementById('clickSound').play();
}

function completeTask(task) {
    if (!tasksCompleted[task]) {
        addCoins(100000);  // Add 100k points
        tasksCompleted[task] = true;
        localStorage.setItem('tasksCompleted', JSON.stringify(tasksCompleted));
        checkAllTasksCompleted();
    }
}

function checkAllTasksCompleted() {
    if (Object.values(tasksCompleted).every(Boolean)) {
        document.getElementById('completionMessage').classList.remove('hidden');
        document.querySelector('.tasks').classList.add('hidden');
    }
}

function loadProfile() {
    const userName = localStorage.getItem('userName');
    const profilePic = localStorage.getItem('profilePic');
    
    const savedCoins = localStorage.getItem('coins');
    if (savedCoins) {
        coins = parseInt(savedCoins, 10);
        document.getElementById('score').textContent = ` ${coins.toLocaleString()}`;
    }

    const savedLevel = localStorage.getItem('currentLevel');
    if (savedLevel) {
        currentLevel = parseInt(savedLevel, 10);
        document.getElementById('currentLevel').textContent = currentLevel;
    }

    const savedTasks = localStorage.getItem('tasksCompleted');
    if (savedTasks) {
        tasksCompleted = JSON.parse(savedTasks);
        checkAllTasksCompleted();
    }

    if (userName) {
        document.getElementById('userName').textContent = userName;
    }
    if (profilePic) {
        document.getElementById('profilePic').src = profilePic;
    }
}

window.onload = loadProfile;
