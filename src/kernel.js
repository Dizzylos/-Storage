export const render = (canvas) => {
  const ctx = cvs.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

const road = new Image();
const road2 = new Image();
const pit = new Image();
const enemy = new Image();
const player = new Image();
road.src = '..assets/img/bg.jpg'
road2.src = '..assets/img/bg.jpg'
pit.src = '..assets/img/pit2.png'
enemy.src = '..assets/img/car2.png'
player.src = '..assets/img/player.png'


const playerState = {
    pos: {
    x: canvas.width / 2 + 70,
    y: canvas.height - 295
    },
    keysPressed: {},
    speed: 6    
}

const enemyState = {
    pos: {
    x: canvas.width / 2 - 135,
    y: -280
    },
    speed: 8
};

const roadState = {
    pos: {
    x: canvas.width / 2 - 350,
    y: canvas.height - 5800
    },
    speed: 5
};

const roadState2 = {
    pos: {
    x: canvas.width / 2 - 350,
    y: 0
    },
    speed: 5
};

const pitState = {
    pos: {
    x: canvas.width / 2 - 155,
    y: !canvas.height - 280
    },
    speed: 5
};


document.addEventListener('keydown', (e) => {
    playerState.keysPressed[e.key] = true;
});
document.addEventListener('keyup', (e) => {
    playerState.keysPressed[e.key] = false;
});



const draw = () => {
    ctx.drawImage(road, roadState.pos.x, roadState.pos.y, 700, 5800);
    ctx.drawImage(road2, roadState2.pos.x, roadState2.pos.y, 700, 5800);
    ctx.drawImage(pit, pitState.pos.x, pitState.pos.y, 175, 150)
    ctx.drawImage(enemy, enemyState.pos.x, enemyState.pos.y, 135, 280);
    ctx.drawImage(player, playerState.pos.x, playerState.pos.y, 135, 280);
}

let health = 3;

const tick = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if(playerState.keysPressed.ArrowLeft){
        playerState.pos.x -= playerState.speed;
    }; 
    if(playerState.keysPressed.ArrowRight){
        playerState.pos.x += playerState.speed;
    }; 
  

    if(roadState.pos.y > canvas.height){
        roadState.pos.y = roadState2.pos.y - 5800;
    };
    if(roadState2.pos.y > canvas.height){
        roadState2.pos.y = roadState.pos.y - 5800;
    };

    roadState.pos.y += roadState.speed;
    roadState2.pos.y += roadState2.speed;


    enemyState.pos.y += enemyState.speed;
    if(enemyState.pos.y > canvas.height){
        let way = Math.ceil(Math.random() * 2);

        if(way == 1){
            enemyState.pos.y = -2000;
            enemyState.pos.x = canvas.width / 2 - 130;
        };

        if(way == 2){
            enemyState.pos.y = -2000;
            enemyState.pos.x = canvas.width / 2 + 70;
        };
    };

    if(playerState.pos.x + 5 <= enemyState.pos.x + 120 
        && playerState.pos.x + 120 >= enemyState.pos.x + 5
        && playerState.pos.y + 10 <= enemyState.pos.y + 275
        && playerState.pos.y + 275 >= enemyState.pos.y + 10){
        alert('Авария!');
        location.reload();
    };


    pitState.pos.y += pitState.speed;
    if(pitState.pos.y > canvas.height){
        let way = Math.ceil(Math.random() * 2);

        if(way == 1){
            pitState.pos.y = -500;
            pitState.pos.x = canvas.width / 2 - 155
        };

        if(way == 2){
            pitState.pos.y = -500;
            pitState.pos.x = canvas.width / 2 + 50;
        };
    };
    if(playerState.pos.x + 5 <= pitState.pos.x + 145
        && playerState.pos.x + 175 >= pitState.pos.x + 100
        && playerState.pos.y + 10 <= pitState.pos.y + 120
        && playerState.pos.y + 275 >= pitState.pos.y + 60){
        health -= 1;
    };

    if(health == 0){
        alert('Конец игры');
    }

    console.log(health);
    draw();
    window.requestAnimationFrame(tick);
};
window.requestAnimationFrame(tick);
};
