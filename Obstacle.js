function Obstacle() {
    this.pos = createVector(width / 4, height / 2);
    this.width = width / 2;
    this.height = 30;

    this.show = function() {
        noStroke();
        fill(255, 50, 50, 100);
        rect(this.pos.x, this.pos.y, this.width, this.height);
    }
}
