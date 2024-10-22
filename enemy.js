class Enemy {
    constructor(x, y) {
        this.element = document.createElement('img');
        this.element.src = './assets/img/enemyFinal.png';
        this.element.classList.add('enemy');
        this.x = x;
        this.y = y;
    }

    render() {
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        document.getElementById('board').appendChild(this.element);
    }

    move(direction) {
        this.x += direction; // Move enemy horizontally
    }

    // moveDown() {
    //     this.y += 20; // Move enemy down by 20px
    // }
}

