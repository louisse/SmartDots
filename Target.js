function Target() {
    this.pos = createVector(width / 2, height / 10);

    this.show = function() {
        noStroke();
        fill(100, 255, 100, 100);
        ellipse(this.pos.x, this.pos.y, 20, 20);
    };
}
