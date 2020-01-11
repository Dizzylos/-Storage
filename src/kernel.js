export const render = (canvas) => {
  const ctx = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const player = new Image();
  player.src = "img/player.png";

  const x = 565,
    y = 230;

  function draw() {
    ctx.drawImage(player, x, y);
  }

  player.onload = draw;

  window.onload = function() {
    window.onkeydown = function(e) {
      if (e.keyCode == 37) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(player, (x -= 10), y);
      } else if (e.keyCode == 39) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.drawImage(player, (x += 10), y);
      }
    };
  };
};
