class Enemy {
    constructor(x, y, width, height, speed = 2) { // Default speed set to 2
        this.element = document.createElement('img');
        this.element.src = './assets/img/enemyFinal.png';
        this.element.classList.add('enemy');
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed; // Assign speed to the enemy
    }

    render() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.element.style.width = `${this.width}px`;
        this.element.style.height = `${this.height}px`;
        document.getElementById('board').appendChild(this.element);
    }

    move() {
        this.x += this.speed; // Use speed to adjust movement
    }
}



