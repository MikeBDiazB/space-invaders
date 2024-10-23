class Player {
    constructor(board) {
        this.element = document.createElement('img');
        this.element.src = './assets/img/player.png';
        this.element.id = 'player';
        this.x = 280;
        this.y = 360;
        this.board = board;
        this.boardWidth = this.board.offsetWidth;
        this.playerWidth = 40; // Same as the player's CSS width
        this.lives = 3;
        this.shootMusic = document.getElementById('shootMusic');
        this.vx = 3;
        this.movements = {
            left: false,
            right: false
        }
    }

    render() {
        this.element.style.left = `${this.x}px`;
        this.board.appendChild(this.element);
    }

    move() {
        if (this.movements.left && this.x > 0) {
            this.x -= this.vx;
        } else if (this.movements.right && this.x < this.boardWidth - this.playerWidth) {
            this.x += this.vx;
        }
        this.render(); // Call render to update player position
    }

    shoot(game) {
        const bullet = new Bullet(this.x + 18, this.y);
        bullet.render();
        bullet.move(game);
        if (this.shootMusic) {
            this.shootMusic.play();
        }
    }

    getHit() {
        this.lives -= 1;
        if (this.lives <= 0) {
            alert('Game Over! You died.');
            window.location.reload(); // Reload the game when lives reach 0
        } else {
            alert(`You got hit! Lives left: ${this.lives}`);
        }
    }
}
