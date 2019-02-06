class Target {
    constructor() {
        this.pos = createVector(width / 2, height / 10);
    }

    show() {
        stroke(50, 255, 50, 150);
        strokeWeight(20);
        point(this.pos.x, this.pos.y);
    }
}
