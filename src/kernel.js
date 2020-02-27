export const render = (canvas) => {
  const ctx = cvs.getContext('2d');

  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  
  const player = new Image();
  player.src = '../assets/img/player.png'
  
  
  let pos = {
    x: canvas.width / 2 - 62,
    y: canvas.height / 2 - 125
  };
  
  let speed = 5;
  let keyPressed = false;
  
  document.addEventListener('keydown', (e) => {
    keyPressed = true;
  });
  document.addEventListener('keyup', (e) => {
    keyPressed = false;
  });
  
  const draw = () => {
    ctx.drawImage(player, pos.x, pos.y, 125, 250);
  }
  
  const tick = () => {
    if(keyPressed) {
      pos.x += speed;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  
    draw();
    window.requestAnimationFrame(tick);
  };
  window.requestAnimationFrame(tick);
};
