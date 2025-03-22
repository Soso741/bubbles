let screenWidth = window.innerWidth;
let screenHeight = window.innerHeight;
let minCircleRadius = 10;
let mouseRactivityRadius = 100;
const maxCircleRadius = 50;
let cirlceArr = [];
const hexColors = ["f4f1de", "e07a5f", "3d405b", "81b29a", "f2cc8f"];
const maxCircleAmount = 1500;

const canvas = document.querySelector("canvas");

class Circle {
  constructor(x, y, r, dx, dy, strokeCol, fillCol, minRadius) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.minRadius = minRadius;
    this.dx = Math.round(Math.random() * 1) ? -dx : dx;
    this.dy = Math.round(Math.random() * 1) ? -dy : dy;
    this.strokeCol = strokeCol;
    this.fillCol = fillCol;

    this.draw = function () {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
      ctx.fillStyle = this.strokeCol;
      ctx.strokeStyle = this.fillCol;
      ctx.stroke();
      ctx.fill();
    };

    this.update = function () {
      if (this.x + this.r >= screenWidth || this.x - this.r < 0) {
        this.dx = -this.dx;
      }

      if (this.y + this.r >= screenHeight || this.y - this.r < 0) {
        this.dy = -this.dy;
      }

      this.x += this.dx;
      this.y += this.dy;

      if (
        mouse.x - this.x < mouseRactivityRadius &&
        mouse.x - this.x > -mouseRactivityRadius &&
        mouse.y - this.y < mouseRactivityRadius &&
        mouse.y - this.y > -mouseRactivityRadius
      ) {
        //as long as the circle is in the vacinity
        if (this.r < maxCircleRadius) {
          this.r += 1;

          if (
            this.x + this.r >= screenWidth ||
            this.x - this.r <= 0 ||
            this.y + this.r >= screenHeight ||
            this.y - this.r <= 0
          ) {
            if (this.r > 4) this.r -= 2;
          }
        }
      } else if (this.r > this.minRadius) {
        this.r -= 1;
      }
    };
  }
}

function generateCircles(amount) {
  cirlceArr = [];

  for (let i = 0; i < amount; i++) {
    let randomRadius = Math.random() * 50;

    cirlceArr.push(
      new Circle(
        randomRadius + Math.random() * (screenWidth - randomRadius * 2),
        randomRadius + Math.random() * (screenHeight - randomRadius * 2),
        randomRadius,
        Math.round(Math.random() * (Math.random() * 3)) + 1,
        Math.round(Math.random() * (Math.random() * 3)) + 1,
        `#${hexColors[Math.round(Math.random() * 4)]}`,
        `#${hexColors[Math.round(Math.random() * 4)]}`,
        Math.round(Math.random() * 20) + 2
      )
    );
  }
}

const setCanvasSize = () => {
  screenWidth = window.innerWidth;
  screenHeight = window.innerHeight;

  generateCircles(1400);

  canvas.width = screenWidth;
  canvas.height = screenHeight;
};

setCanvasSize();

window.addEventListener("resize", setCanvasSize);

window.addEventListener("load", () => {
  const welcomeHtml = `<h1 class="tutorial"> Hover the mouse over the circles </h1>`;

  const tutorialTemplate = document.createElement("div");
  tutorialTemplate.innerHTML = welcomeHtml;

  tutorialTemplate.classList.add("tutorialBg");

  document.body.appendChild(tutorialTemplate);

  tutorialTimer = setTimeout(() => {
    tutorialTemplate.classList.add("tutorialEnd");
  }, 2500);
});

const ctx = canvas.getContext("2d");

const mouse = {
  x: null,
  y: null,
};

window.addEventListener("mousemove", function (e) {
  mouse.x = e.pageX;
  mouse.y = e.pageY;
});

generateCircles(1400);

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, screenWidth, screenHeight);

  cirlceArr.forEach((elm) => {
    elm.draw();
    elm.update();
  });
}

animate();
