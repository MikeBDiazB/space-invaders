class Bullet {
    constructor(x, y, isEnemy = false) {
        this.x = x;
        this.y = y;
        this.element = document.createElement('div');
        this.isEnemy = isEnemy;  // Enemy bullet flag
        this.element.className = 'bullet';
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`; // Use `top` instead of `bottom`
        this.speed = 5; // Bullet speed
    }

    render() {
        document.getElementById('board').appendChild(this.element);
    }

    move(game) {
        const interval = setInterval(() => {
            if (this.isEnemy) {
                this.y += this.speed;  // Enemy bullets move downward
            } else {
                this.y -= this.speed;  // Player bullets move upward
            }

            this.element.style.top = `${this.y}px`;

            if (!this.isEnemy) {
                game.enemies.forEach(enemy => {
                    if (this.isColliding(enemy)) {
                        game.removeEnemy(enemy);
                        clearInterval(interval);
                        this.element.remove();  // Remove bullet on collision
                    }
                });
            } else {
                if (this.isColliding(game.player)) {
                    game.player.getHit();
                    clearInterval(interval);
                    this.element.remove();  // Remove bullet on collision with player
                }
            }

            const boardHeight = document.getElementById('board').offsetHeight; 
            const bulletHeight = this.element.offsetHeight; // Get the bullet's height
            if (this.y < 0 || this.y + bulletHeight > boardHeight) {  // Adjusted game boundary for bullets
                clearInterval(interval);
                this.element.remove();
            } 
        }, 50); // Closing the setInterval function correctly
    } // <-- Closing bracket for the move method

    isColliding(enemy) {
        const bulletWidth = this.element.offsetWidth; // Get bullet width
        const bulletHeight = this.element.offsetHeight; // Get bullet height
        const enemyWidth = enemy.element.offsetWidth; // Get enemy width
        const enemyHeight = enemy.element.offsetHeight; // Get enemy height

        return !(
            this.x + bulletWidth < enemy.x || // Bullet is to the left of the enemy
            this.x > enemy.x + enemyWidth || // Bullet is to the right of the enemy
            this.y + bulletHeight < enemy.y || // Bullet is above the enemy
            this.y > enemy.y + enemyHeight // Bullet is below the enemy
        );
    }
}