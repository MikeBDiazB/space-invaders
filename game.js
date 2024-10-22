class Game {
    constructor() {
        this.board = new Board();
        this.player = new Player(this.board);
        this.enemies = [];
        this.score = 0;
        this.direction = 10; // Positive for moving right, negative for moving left
        this.spawnEnemies();
        this.updateScore();
        this.music = document.getElementById('background-music');
        this.invaderKilledMusic = document.getElementById("InvaderkilledMusic");
        document.getElementById('start-button').addEventListener('click', () => this.start());
    }

    start() {
        setInterval(() => {
            this.move();
            this.render();
        }, 1000 / 60);
        
        this.board.clear();
        this.enemies.forEach(enemy => enemy.render());
        this.setupKeyListeners();
        this.moveEnemies(); // Start moving enemies when the game starts
        this.enemyShoot();
        if (this.music) {this.music.play();}
    }

    render() {
        this.player.render();
        // this.enemies.forEach(enemy => {
        //     enemy.render();
        // });
    }

    move() {
        this.player.move();
        // this.enemies.forEach(enemy => {
        //     enemy.move();
        // });
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
        for (let j = 0; j < 3; j++) {
            for (let i = 0; i < 5; i++) {
                const x = i * 100 + 50; // Set initial position of enemies
                const enemy = new Enemy(x, y);
                this.enemies.push(enemy); // Add each enemy to the enemies array
            }
            y += 50;
        }
    }

    moveEnemies() {
        const boardWidth = document.getElementById('board').offsetWidth; // Get board width
        const moveInterval = setInterval(() => {
            let hitEdge = false;

            // Check if any enemy hits the left or right boundary
            this.enemies.forEach(enemy => {
                const enemyWidth = enemy.element.offsetWidth; // Get enemy width
                if (enemy.x + enemyWidth >= boardWidth || enemy.x <= 0) {
                    hitEdge = true; // Mark that an enemy has hit the edge
                }
            });

            // If any enemy hits the edge, reverse direction and move all enemies down
            if (hitEdge) {
                this.direction *= -1; // Reverse direction
            }

            // Move all enemies in the current direction
            this.enemies.forEach(enemy => enemy.move(this.direction));

            // Update the position of enemies on the screen
            this.enemies.forEach(enemy => {
                enemy.element.style.left = `${enemy.x}px`; // Set new x position
                enemy.element.style.top = `${enemy.y}px`; // Set new y position
            });

        }, 500); // Adjust the speed of enemy movement here
    }

    removeEnemy(enemy) {
        const index = this.enemies.indexOf(enemy);
        if (index > -1) {
            this.enemies.splice(index, 1); // Remove the enemy from the array
        }
        enemy.element?.remove(); // Remove the enemy's element from the DOM
        this.score += 10; // Update the score
        this.updateScore(); // Update the score display
        if (this.invaderKilledMusic) {this.invaderKilledMusic.play();}

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
        setInterval(() => {
            this.enemies.forEach(enemy => {
                if (Math.random() < 0.1) {  // 10% chance to shoot every interval
                    const bullet = new Bullet(enemy.x + 20, enemy.y + 40, true);  // Enemy bullet
                    bullet.render();
                    bullet.move(this);  // Move the enemy bullet
                }
            });
        }, 1000);  // Adjust frequency of shooting as needed
    }
}

document.addEventListener('DOMContentLoaded', () => new Game());


