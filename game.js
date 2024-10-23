class Game {
    constructor() {
        this.board = document.querySelector("#board");
        this.player = new Player(this.board);
        this.enemies = [];
        this.score = 0;
        this.spawnEnemies();
        this.updateScore();
        this.music = document.getElementById('background-music');
        this.invaderKilledMusic = document.getElementById("InvaderkilledMusic");
        document.getElementById('start-button').addEventListener('click', () => this.start());

        this.tick = 1;
    }

    start() {
        console.log("start")
        setInterval(() => {
            this.move();
            this.render();
            this.enemyShoot();

            this.tick++;
            if (this.tick === 60) {
                this.tick = 1;
            }
        }, 1000 / 60);

        this.enemies.forEach(enemy => enemy.render());
        this.setupKeyListeners();
        if (this.music) { this.music.play(); }
    }

    render() {
        this.player.render();
        this.enemies.forEach(enemy => enemy.render()); // Render enemies here
    }

    move() {
        this.player.move();
        this.enemies.forEach(enemy => enemy.move()); // Move enemies here

        if (this.enemies.some(enemy => {
            return enemy.x < 0 || enemy.x + enemy.width > this.board.offsetWidth;
        })) {
            this.enemies.forEach(enemy => enemy.speed *= -1)
        }
    }

    setupKeyListeners() {
        window.addEventListener('keydown', this.handleKeyPress.bind(this));
        window.addEventListener('keyup', this.handleKeyUp.bind(this));
    }

    handleKeyPress(event) {
        event.preventDefault();
        if (event.key === 'Tab') {
            this.player.shoot(this); // Player shoots
        } else if (event.key === 'ArrowLeft') {
            this.player.movements.left = true;
        } else if (event.key === 'ArrowRight') {
            this.player.movements.right = true;
        }
    }

    handleKeyUp(event) {
        event.preventDefault();
        if (event.key === 'ArrowLeft') {
            this.player.movements.left = false;
        } else if (event.key === 'ArrowRight') {
            this.player.movements.right = false;
        }
    }

    spawnEnemies() {
        let y = 20;
        const speeds = [1, 1, 1]; // Different speeds for enemies
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 5; i++) {
                const x = i * 100 + 50; // Set initial position of enemies
                const speed = speeds[j % speeds.length]; // Cycle through speeds for variety
                const enemy = new Enemy(x, y, 40, 40, speed); // Pass speed to enemy
                this.enemies.push(enemy); // Add each enemy to the enemies array
            }
            y += 50;
        }
    }

    removeEnemy(enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1); // Remove the enemy from the array
        }
        enemy.element?.remove(); // Remove the enemy's element from the DOM
        this.score += 10; // Update the score
        this.updateScore(); // Update the score display
        if (this.invaderKilledMusic) { this.invaderKilledMusic.play(); }

        // Check if all enemies are destroyed
        if (this.enemies.length === 0) {
            alert("All enemies destroyed! Respawning enemies...");
            this.spawnEnemies(); // Respawn the enemies
            this.enemies.forEach(enemy => enemy.render()); // Render the new enemies
        }
    }

    updateScore() {
        document.getElementById('score').textContent = `Score: ${this.score}`; // Update score display
    }

    enemyShoot() {
        if (this.tick % 59 === 0) {
            this.enemies.forEach(enemy => {
                const canShoot = Math.random() < 0.1;
                if (canShoot) {
                    const bullet = new Bullet(enemy.x + 20, enemy.y + 40, true);  // Enemy bullet
                    bullet.render();
                    bullet.move(this);  // Move the enemy bullet
                }
            });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => new Game());

