class Obstacle {
    constructor(x, y, w, h) {
        this.pos = createVector(x, y);
        this.width = w;
        this.height = h;
    }

    show() {
        noStroke();
        fill(255, 50, 50, 100);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    };
}
