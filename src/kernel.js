export const render = (canvas) => {
const ctx = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const road = new Image();
const pit = new Image();
const enemy = new Image();
const player = new Image();
const heart = new Image();
const barrelFuel = new Image();
road.src = '../assets/img/bg.jpg';
pit.src = '../assets/img/pit2.png';
enemy.src = '../assets/img/car2.png';
player.src = '../assets/img/player.png';
heart.src = '../assets/img/heart.png';
barrelFuel.src = '../assets/img/bank1.png'



// player
const playerState = {
    pos: {
    x: canvas.width / 2 + 70,
    y: canvas.height - 295
    },
    keysPressed: {},
    speed: 0,
    maxSpeed: 7
};

// enemyCar
const enemyState = {
    pos: {
    x: canvas.width / 2 - 135,
    y: canvas.height
    },
    speed: 8
};

// pit
const pitState = {
    pos: {
    x: canvas.width / 2 - 155,
    y: canvas.height
    },
    speed: 5,
    minSpeed: 0
};

// Fuel
const fuelState = {
    pos: {
    x:canvas.width / 2 - 155,
    y: canvas.height
    },
    speed: 5,
    minSpeed: 0
}

let fuel = 100;
setInterval(() => {
    if (fuel > 0) fuel--;
}, 1000);

// backGround
const backGround = [road, road];
const backGroundState = {
    pos1: {
        x: canvas.width / 2 - 350,
        y: canvas.height - 5800
    },
    pos2: {
        x: canvas.width / 2 - 350,
        y: 0
    },
    speed: 5,
    minSpeed: 0
};


// Score
let score = 0;
setInterval(() => {
    score++;
}, 1000);

// lives
let lives = 3;
let hit = false;

// Timer
let sec = 0;
let min = `0${0}`;

const timer = () => {
    sec++;
    if (sec < 10) {
        sec = `0${sec}`;
    };

    if (sec == 60) {
        min++;
        if (min < `0${10}`) {
            min = `0${min}`;
        };
        sec = `0${0}`;
    };
};

timer();
setInterval(() => {
   timer(); 
}, 1000);


document.addEventListener('keydown', (e) => {
    playerState.keysPressed[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    playerState.keysPressed[e.key] = false;
    playerState.speed = 0;
});

const draw = () => {
    ctx.drawImage(backGround[0], backGroundState.pos1.x, backGroundState.pos1.y, 700, 5800);
    ctx.drawImage(backGround[1], backGroundState.pos2.x, backGroundState.pos2.y, 700, 5800);
    ctx.drawImage(pit, pitState.pos.x, pitState.pos.y, 175, 150);
    ctx.drawImage(enemy, enemyState.pos.x, enemyState.pos.y, 135, 280);
    ctx.drawImage(player, playerState.pos.x, playerState.pos.y, 135, 280);
    for(let i = 0; i < lives; i++){
        ctx.drawImage(heart,  1065 + (100 * i), 20);
    };
    ctx.drawImage(barrelFuel, fuelState.pos.x, fuelState.pos.y, 200, 125);
};


const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Player
    if (playerState.keysPressed.ArrowLeft && playerState.pos.x > 520) {
        playerState.speed += (playerState.speed < playerState.maxSpeed) ? 0.5 : 0;
        playerState.pos.x -= playerState.speed;
    }; 
    if (playerState.keysPressed.ArrowRight && playerState.pos.x < 770) {
        playerState.speed += (playerState.speed < playerState.maxSpeed) ? 0.5 : 0;
        playerState.pos.x += playerState.speed;
    }; 

    if (fuel <= 0) {
        playerState.maxSpeed = 0;
        pitState.speed -= (pitState.speed > pitState.minSpeed) ? 0.05 : 0;
        backGroundState.speed -= (backGroundState.speed > backGroundState.minSpeed) ? 0.05 : 0;
        if (backGroundState.speed <= 0) {
            alert('Топливо закончилось');
            location.reload();
        };
    };

    // backGround
    backGroundState.pos1.y += backGroundState.speed;
    backGroundState.pos2.y += backGroundState.speed;
    if (backGroundState.pos1.y > canvas.height) {
        backGroundState.pos1.y = backGroundState.pos2.y - 5800
    };
    if (backGroundState.pos2.y > canvas.height) {
        backGroundState.pos2.y = backGroundState.pos1.y - 5800
    };

    // EnemyCar
    enemyState.pos.y += enemyState.speed;
    if (enemyState.pos.y > canvas.height) {
        let way = Math.ceil(Math.random() * 2);

        if (way == 1) {
            enemyState.pos.y = Math.ceil(Math.random() * -1000) -2000;
            enemyState.pos.x = canvas.width / 2 - 130;
        };
        if (way == 2) {
            enemyState.pos.y = Math.ceil(Math.random() * -1000) -2000;
            enemyState.pos.x = canvas.width / 2 + 70;
        };
    };
    // Hitbox
    if (playerState.pos.x + 5 <= enemyState.pos.x + 120 
        && playerState.pos.x + 120 >= enemyState.pos.x + 5
        && playerState.pos.y + 10 <= enemyState.pos.y + 275
        && playerState.pos.y + 275 >= enemyState.pos.y + 10) {
        alert(`Авария! Ваш счёт: ${score}`);
        location.reload();
    };

    // Pit
    pitState.pos.y += pitState.speed;
    if (pitState.pos.y > canvas.height) {
        let way = Math.ceil(Math.random() * 2);

        if (way == 1) {
            pitState.pos.y = Math.ceil(Math.random() * -500)  -700;
            pitState.pos.x = canvas.width / 2 - 155;
        };
        if (way == 2) {
            pitState.pos.y = Math.ceil(Math.random() * -500)  -700;
            pitState.pos.x = canvas.width / 2 + 50;
        };
    };
    // // Hitbox
    if (playerState.pos.x + 5 <= pitState.pos.x + 145
        && playerState.pos.x + 175 >= pitState.pos.x + 100
        && playerState.pos.y + 10 <= pitState.pos.y + 100
        && playerState.pos.y + 275 >= pitState.pos.y + 60 && !hit) {
            lives--;
            hit = true;
            setTimeout(() => {
                hit = false;
            }, 1100);
    };

    // Fuel
    fuelState.pos.y += fuelState.speed;
    if (fuelState.pos.y > canvas.height) {
        let way = Math.ceil(Math.random() * 2);

        if (way == 1) {
            fuelState.pos.y = Math.ceil(Math.random() * -4000) - 2000;
            fuelState.pos.x = canvas.width / 2 - 155;
        };
        if (way == 2) {
            fuelState.pos.y = Math.ceil(Math.random() * -4000) - 2000;
            fuelState.pos.x = canvas.width / 2 + 50;
        };
    };
    // Hitbox
    if (playerState.pos.x + 5 <= fuelState.pos.x + 125
        && playerState.pos.x + 175 >= fuelState.pos.x + 125
        && playerState.pos.y + 10 <= fuelState.pos.y + 100
        && playerState.pos.y + 275 >= fuelState.pos.y + 60 && !hit) {
            fuel+=10;
            let way = Math.ceil(Math.random() * 2);

            if (way == 1) {
                fuelState.pos.y = Math.ceil(Math.random() * -4000) - 2000;
                fuelState.pos.x = canvas.width / 2 - 155;
            };
            if (way == 2) {
                fuelState.pos.y = Math.ceil(Math.random() * -4000) - 2000;
                fuelState.pos.x = canvas.width / 2 + 50;
            };
        };


    ctx.fillStyle = 'black';
    ctx.font = '24px Tahoma';
    ctx.fillText(`Таймер: ${min}:${sec}`, 50, 100);
    ctx.fillText(`Счёт: ${score}`, 50, 150);
    ctx.fillText(`Топливо: ${fuel}`, 1100, 150);
    if (lives == 0) {
        alert('Конец игры');
        location.reload();   
    };
    draw();
    window.requestAnimationFrame(tick);
};
window.requestAnimationFrame(tick);
};