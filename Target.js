class Target {
    constructor() {
        this.pos = createVector(width / 2, height / 10);
    }

    show() {
        noStroke();
        fill(100, 255, 100, 100);
        ellipse(this.pos.x, this.pos.y, 20, 20);
    };
}
