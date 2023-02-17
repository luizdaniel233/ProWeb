(function () {
  const TAMX = 600;
  const TAMY = 800;
  const FPS = 100;

  let date;
  let date_v;
  let date_sum_1;
  let date_now;
  let IS_PAUSED = 0; //0 PAUSED, 1 RUNNING
  let GAME_STATUS = 0; // 0 NOT_STARTED, 1 STARTED, 2 GAME OVER
  let LIFES = 4;
  let SCORE = 0;
  let HAS_SHOT = 0;

  let enemy_ships_velocity;
  let enemy_small_asteroid_velocity;
  let enemy_ufo_velocity;
  let enemy_big_asteroid_velocity;
  let space_velocity = 1;

  const PROB_SMALL_ASTEROID = 0.2;
  const PROB_UFO = 0.3;
  const PROB_ENEMY_SHIP = 0.4;
  const PROB_BIG_ASTEROID = 0.5;

  let space, ship, shots;
  let enemiesShip = [];
  let tempEnemies = 0;
  let enemiesBigAsteroid = [];
  let enemiesSmallAsteroid = [];
  let enemiesUfo = [];
  let SHOTS = [];

  function init() {
    enemy_ships_velocity = 1;
    enemy_small_asteroid_velocity = 1;
    enemy_ufo_velocity = 1;
    enemy_big_asteroid_velocity = 1;
    space_velocity = 1;

    date_v = 0;

    space = new Space();
    ship = new Ship();
    showScore(0);
    const interval = window.setInterval(run, 1000 / FPS);
    document.getElementById("restart-button").style.display = "none";
  }

  //CHANGE SHIP DIRECTION
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") {
      ship.mudaDirecao(-1);
    } else if (e.key === "ArrowRight") {
      ship.mudaDirecao(+1);
    }
  });

  //START THE GAME
  window.addEventListener("keypress", (e) => {
    if (e.code === "Space" && GAME_STATUS == 0) {
      GAME_STATUS = 1;
      console.log("Game has been started!");
    } else {
      showScore(0);
      if (e.code === "Space" && GAME_STATUS == 1) {
        shot();
      }
      return;
    }
  });

  //PAUSE/RETURN THE GAME
  window.addEventListener("keypress", (e) => {
    if (e.key === "P" || e.key === "p") {
      if (GAME_STATUS != 1) {
        console.log(`It's not possible to Pause a game thas has not starded!`);
        return;
      }
      IS_PAUSED == 0 ? (IS_PAUSED = 1) : (IS_PAUSED = 0);
      const status = IS_PAUSED == 1 ? "PAUSED" : "RUNNING";
      console.log("status_game: ", status);
    }
  });

  class Space {
    constructor() {
      this.element = document.getElementById("space");
      this.element.className = "space";
      this.element.style.width = `${TAMX}px`;
      this.element.style.height = `${TAMY}px`;
      this.element.style.backgroundPositionY = "0px";
    }
    move() {
      if (isRunning()) {
        this.element.style.backgroundPositionY = `${
          parseInt(this.element.style.backgroundPositionY) + space_velocity
        }px`;
      }
    }
  }

  class Ship {
    constructor() {
      
      this.element = document.getElementById("ship");
      this.AssetsDirecoes = [
        "assets/playerLeft.png",
        "assets/player.png",
        "assets/playerRight.png",
        "assets/playerDamaged.png",
      ];
      this.direcao = 1;
      this.element.src = this.AssetsDirecoes[this.direcao];
      this.element.style.bottom = "20px";
      this.element.style.maxWidth = "600px";
      this.element.style.left = `${parseInt(TAMX / 2) - 50}px`;
    }
    mudaDirecao(giro) {
      if (this.direcao + giro >= 0 && this.direcao + giro <= 2) {
        this.direcao += giro;
        this.element.src = this.AssetsDirecoes[this.direcao];
      }
    }
    move() {
      let px = this.element.style.left.replace("px", "");
      px = parseInt(px);
      if (this.direcao === 0 && px >= 0)
        this.element.style.left = `${parseInt(this.element.style.left) - 3}px`;
      if (this.direcao === 2 && px <= TAMX - 100)
        this.element.style.left = `${parseInt(this.element.style.left) + 3}px`;
      space.move();
    }
  }

  class Shot {
    constructor() {
      this.element = document.createElement("img");
      this.element.className = "shot";
      this.AssetsStatus = ["assets/laserRed.png", "assets/laserRedShot.png"];
      this.status = 0;
      this.element.src = this.AssetsStatus[this.status];
      this.element.style.bottom = "0px";
      this.element.style.left = `${parseInt(ship.element.style.left) + 45}px`;
      space.element.appendChild(this.element);
    }
    move() {
      this.element.style.bottom = `${
        parseInt(this.element.style.bottom) + 10
      }px`;
      if (parseInt(this.element.style.bottom) > 800) {
        this.element.remove();
      }
    }
    verifyColission(element) {
      if (tempEnemies != 0) {
        const rectShot = this.element.getBoundingClientRect();
        const rectEnemy = element.getBoundingClientRect();
        
        if (
          rectShot.x < rectEnemy.x + rectEnemy.width &&
          rectShot.x + rectShot.width > rectEnemy.x &&
          rectShot.y < rectEnemy.y + rectEnemy.height &&
          rectShot.y + rectShot.height > rectEnemy.y
        ) {
          const en = element.className.split(" ");

          space.element.removeChild(element);
          this.element.src = this.AssetsStatus[1];
          // ship.element.src = ship.AssetsDirecoes[1];
          setTimeout(() => {
            space.element.removeChild(this.element);
          }, 5);

          switch (en[1]) {
            case "enemy-small-asteroid":
              showScore(100);
              break;
            case "enemy-ufo":
              showScore(20);
              break;
            case "enemy-ship":
              showScore(50);
              break;
            case "enemy-big-asteroid":
              showScore(10);
              break;
            default:
              break;
          }
        } else {
          // console.log("errou")
        }
      }
    }
  }

  class EnemyShip {
    constructor(imgSrc, className, velocidade) {
      this.element = document.createElement("img");
      this.element.className = `enemy ${className}`;
      this.element.id = `enemy`;
      this.element.src = `assets/${imgSrc}.png`;
      this.element.style.top = "0px";
      this.element.style.left = `${Math.floor(Math.random() * TAMX)}px`;
      space.element.appendChild(this.element);
      this.velocidade = velocidade;
    }
    async move() {
      this.element.style.top = `${
        parseInt(this.element.style.top) + this.velocidade
      }px`;
      this.controlaNave(this.element.className);
      await shots.verifyColission(this.element);

      if (parseInt(this.element.style.top) > 800) {
        this.element.remove();
      }
    }
    controlaNave(class_x) {
      let naves = document.getElementsByClassName(class_x);
      let tam = naves.length;
      for (let i = 0; i < tam; i++) {
        if (
          ship.element.offsetTop <= naves[i].offsetTop + 50 &&
          ship.element.offsetTop + 75 >= naves[i].offsetTop &&
          ship.element.offsetLeft <= naves[i].offsetLeft + 98 &&
          ship.element.offsetLeft + 99 >= naves[i].offsetLeft
        ) {
          space.element.removeChild(naves[i]);
          LIFES -= 1;
          if (LIFES > 0) {
            showScore(0);
          } else {
            showScore(0);
            gameOver();
          }
          ship.element.src = ship.AssetsDirecoes[3];
          setTimeout(() => {
            ship.element.src = ship.AssetsDirecoes[1];
          }, 5000);
        }
      }
    }
  }

  class bigAsteroidClass extends EnemyShip {
    constructor(imgSrc, className, velocidade) {
      super(imgSrc, className, velocidade);
    }
  }

  class smallAsteroid extends EnemyShip {
    constructor(imgSrc, className, velocidade) {
      super(imgSrc, className, velocidade);
    }
  }

  class ufo extends EnemyShip {
    constructor(imgSrc, className, velocidade) {
      super(imgSrc, className, velocidade);
    }
  }

  function shot() {

    if (HAS_SHOT == 0) {
      shots = new Shot();
      SHOTS.push(shots);
      HAS_SHOT = 1
      setTimeout(() => {
        HAS_SHOT = 0
      }, 600);
    }
  }

  function showScore(pontuation) {
    if (LIFES > 0) {
      const information = document.getElementById("information");
      SCORE += pontuation;
      information.innerText = SCORE;
      

      for (const life of Array(LIFES).keys()) {
        const element = document.createElement("img");
        element.className = "img-life";
        element.id = `img-life-${life + 1}`;
        element.src = "assets/life.png";
        information.appendChild(element);
      }
    }
  }

  function isRunning() {
    if (GAME_STATUS == 1 && IS_PAUSED == 0) {
      return true;
    } else {
      return false;
    }
  }

  function gameOver(class_x) {
    GAME_STATUS = 2;

    const message = document.getElementById("game-over");
    information.innerText = "GAME OVER";
    information.style = "text-align:center"
    document.getElementById("restart-button").style.display = "";

    //RESTART THE GAME
    const button = document.getElementById("restart-button");
    button.addEventListener("click", function (e) {
      document.location.reload();
      GAME_STATUS = 1;
    });
  }

  function run() {
    if (date_v == 0) {
      date = new Date();
      date_sum_1 = new Date(date);
      date_sum_1.setMinutes(date.getMinutes() + 1);
      date_v = 1;
    }

    if (date_v == 1) {
      date_now = new Date();
      if (
        date_now.getDate() == date_sum_1.getDate() &&
        date_now.getMinutes() == date_sum_1.getMinutes() &&
        date_now.getHours() == date_sum_1.getHours() &&
        date_now.getSeconds() == date_sum_1.getSeconds()
      ) {
        enemy_ships_velocity += 1;
        enemy_small_asteroid_velocity += 1;
        enemy_ufo_velocity += 1;
        enemy_big_asteroid_velocity += 1;
        space_velocity += 0.5;
        date_v = 0;
      }
    }

    if (isRunning()) {
      function randomFrequency() {
        return Math.random() * 100;
      }

      if (randomFrequency() <= PROB_SMALL_ASTEROID) {
        tempEnemies = new smallAsteroid(
          "meteorSmall",
          "enemy-small-asteroid",
          enemy_small_asteroid_velocity
        );
        enemiesSmallAsteroid.push(tempEnemies);
      }

      if (randomFrequency() <= PROB_UFO) {
        tempEnemies = new ufo("enemyUFO", "enemy-ufo", enemy_ufo_velocity);
        enemiesUfo.push(tempEnemies);
      }

      if (randomFrequency() <= PROB_ENEMY_SHIP) {
        tempEnemies = new EnemyShip(
          "enemyShip",
          "enemy-ship",
          enemy_ships_velocity
        );
        enemiesShip.push(tempEnemies);
      }

      if (randomFrequency() <= PROB_BIG_ASTEROID) {
        tempEnemies = new bigAsteroidClass(
          "meteorBig",
          "enemy-big-asteroid",
          enemy_big_asteroid_velocity
        );
        enemiesBigAsteroid.push(tempEnemies);
      }

      if (isRunning()) {
        enemiesSmallAsteroid.forEach((e) => e.move());
        enemiesUfo.forEach((e) => e.move());
        enemiesShip.forEach((e) => e.move());
        enemiesBigAsteroid.forEach((e) => e.move());
        SHOTS.forEach((shot) => shot.move());
        ship.move();
      }
    }
  }
  init();
})();
