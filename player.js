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
        this.life = 3;
        this.shootMusic = document.getElementById('shootMusic');
        this.vx = 3;
        this.movements = {
            left: false,
            right: false
        }
        this.canShoot = true; // Cooldown flag for shooting
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
        if (!this.canShoot) return; // Prevent shooting if cooldown is active

        const bullet = new Bullet(this.x + 18, this.y);
        bullet.render();
        bullet.move(game);

        if (this.shootMusic) {
            this.shootMusic.play();
        }

        // Set cooldown: player cannot shoot again for 0.5 seconds
        this.canShoot = false;
        setTimeout(() => {
            this.canShoot = true; // Allow shooting after 0.5 seconds
        }, 100); // Cooldown time of 0.5 seconds (500 milliseconds)
    }


    getHit() {
        this.life -= 1;
        this.updateLifeDisplay(); // Update lives display after losing a life
    
        if (this.life <= 0) {
            window.location.reload(); // Reload the game when lives reach 0
        }
    }
    
    // Separate method to update the lives display:
    updateLifeDisplay() {
        document.getElementById('playerLife').textContent = `Life: ${this.life}`; // Update the lives display
    }
}


