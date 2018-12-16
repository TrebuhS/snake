// const canvasElem = document.querySelector("#canvasDraw");
// const ctx = canvasElem.getContext("2d");
// const image = new Image();
// image.addEventListener("load", function() {
//     ctx.drawImage(image, 0, 0, 262, 256);

//     ctx.font = "italic bold 30px Arial";
//     ctx.textBaseline = "middle";
//     ctx.textAlign = "center";
//     ctx.fillStyle = "#4F3A73";
//     ctx.strokeStyle = "#fff";
//     ctx.lineWidth = 1;
//     ctx.fillText('Fanthomas', 262/2, 256-20);
//     ctx.strokeText('Fanthomas', 262/2, 256-20);

// });

// image.src = "fantomus.png";

const canvasElem = document.querySelector("#canvasDraw");
const ctx = canvasElem.getContext("2d");
const pointsDOM = document.querySelector("#points");

const gameOver = function() {
    clearInterval(interval);
    const main = document.querySelector(".main");
    const div = document.createElement("div");
    div.classList.add("game-over");
    const h1 = document.createElement("h1");
    const button = document.createElement("button");
    h1.textContent = "GAME OVER";
    h1.style.color = "red";
    button.textContent = "Play Again!";
    button.addEventListener("click", function() {
        location.reload();
    });
    div.appendChild(h1);
    div.appendChild(button);
    main.appendChild(div);
}

class Apple {
    constructor(size) {
        this.size = size;
        this.newApple();
    }
    
    newApple() {
        let isOnSnake = false;
        do {
            this.x = Math.floor(Math.random() * (canvasElem.width/this.size));
            this.y = Math.floor(Math.random() * (canvasElem.height/this.size));
            for (let i = 0; i < snake.bodyParts.length; i++) {
                if (snake.bodyParts[i].x != this.x && snake.bodyParts[i].y != this.y) isOnSnake = false;
                else {
                    isOnSnake = true;
                    break;
                }
            }
        } while (isOnSnake);
        ctx.fillStyle = "red";
        ctx.fillRect(this.x*this.size, this.y*this.size, this.size, this.size);
    }
}

class BodyPart {
    constructor(x, y, size) {
        this.size = size;
        this.x = x;
        this.y = y;
        ctx.fillStyle = "green";
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }

    move() {
        ctx.fillStyle = "green";
        ctx.clearRect(this.x, this.y, this.size, this.size);
        if (direction == "up") this.y -= speed;
        else if (direction == "left") this.x -= speed;
        else if (direction == "right") this.x += speed;
        else if (direction == "down") this.y += speed;
        ctx.fillRect(this.x, this.y, this.size, this.size);
    }
}

class Snake {
    constructor(size) {
        this.size = size;
        this.x = canvasElem.width/2 - this.size;
        this.y = canvasElem.height/2 - this.size;
        this.bodyParts = [new BodyPart(this.x, this.y, this.size)];
    }

    move() {
        for (let i = 0; i < this.bodyParts.length; i++) {
            ctx.clearRect(this.bodyParts[i].x, this.bodyParts[i].y, this.size, this.size);
        }
        this.bodyParts[0].move();
        for (let i = this.bodyParts.length - 1; i > 0; i--) {
            this.bodyParts[i].y = this.bodyParts[i - 1].y;
            this.bodyParts[i].x = this.bodyParts[i - 1].x;
            ctx.fillRect(this.bodyParts[i].x, this.bodyParts[i].y, this.size, this.size);
        }

        for (let i = 2; i < this.bodyParts.length; i++) {
            if (this.bodyParts[0].x == this.bodyParts[i].x && this.bodyParts[0].y == this.bodyParts[i].y) {
                gameOver();
            }
        }
    }

    // move() {
    //     this.bodyParts[0].move();
    //     for (let i = 1; this.bodyParts.length > i; i++) {
    //         ctx.clearRect(this.bodyParts[i].x, this.bodyParts[i].y, this.size, this.size);
    //         this.bodyParts[i].y = this.bodyParts[i - 1].y;
    //         this.bodyParts[i].x = this.bodyParts[i - 1].x;
    //         ctx.fillRect(this.bodyParts[i].x, this.bodyParts[i].y, this.size, this.size);
    //         console.log("snake.move");
    //     }
    // }

    applePicked(direction) {
        apple.newApple();
        let last = this.bodyParts[this.bodyParts.length - 1];
        if (direction == "up") this.bodyParts.push(new BodyPart(last.x, last.y - this.size, this.size));
        else if (direction == "left") this.bodyParts.push(new BodyPart(last.x + this.size, last.y, this.size));
        else if (direction == "right") this.bodyParts.push(new BodyPart(last.x - this.size, last.y, this.size));
        else if (direction == "down") this.bodyParts.push(new BodyPart(last.x, last.y + this.size, this.size));
    }
}

// const play = function() {
    const size = 20
    const speed = 20;
    let timer = 100;
    let points = 0;
    let direction;
    let snake = new Snake(size);
    let apple = new Apple(size);

    window.addEventListener("keydown", function(e) {
        if (e.key == "ArrowUp") {
            direction = "up";
        } else if (e.key == "ArrowLeft") {
            direction = "left";
        } else if (e.key == "ArrowRight") {
            direction = "right";
        } else if (e.key == "ArrowDown") {
            direction = "down";
        }
    });

    const interval = setInterval(function() {
        snake.move();
        if (snake.bodyParts[0].x < 0 || snake.bodyParts[0].y < 0 || snake.bodyParts[0].x >= canvasElem.width || snake.bodyParts[0].y >= canvasElem.height) {
            gameOver();
        }
        if (snake.bodyParts[0].x == apple.x*apple.size && snake.bodyParts[0].y == apple.y*apple.size) {
            points++;
            pointsDOM.textContent = points;
            snake.applePicked(direction);
            timer -= 2;
        }
    }, timer);
// }

// play();