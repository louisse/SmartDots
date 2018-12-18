function Obstacle(x, y, w, h) {
    this.pos = createVector(x, y);
    this.width = w;
    this.height = h;

    this.show = function () {
        noStroke();
        fill(255, 50, 50, 100);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    };
}
