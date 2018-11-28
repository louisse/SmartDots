function Rocket(fuel, dna) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.fitness = 0;
    this.prob = 0;
    this.finished = false;
    this.fullTank = fuel;
    this.fuel = fuel;
    this.dead = false;

    if (typeof dna !== 'undefined') {
        this.DNA = dna;
    } else {
        this.DNA = new DNA(this.fuel);
    }

    this.show = function() {
        if (show === false) {
            return;
        }
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        noStroke();
        colorMode(HSB);
        fill(this.DNA.color, 200, 50, 0.75);
        rectMode(CENTER);
        rect(0, 0, 50, 10);
        pop();
    }

    this.update = function() {
        if (this.dead === true || this.finished === true) {
            return;
        }
        this.applyForce(this.DNA.next());
        this.vel.add(this.acc);
        this.pos.add(this.vel);
        if (obstacle.pos.x < this.pos.x && this.pos.x < obstacle.pos.x + obstacle.width && obstacle.pos.y < this.pos.y && this.pos.y < obstacle.pos.y + obstacle.height) {
            this.dead = true;
        }
        if ((0 < this.pos.x && this.pos.x < width && 0 < this.pos.y && this.pos.y < height) === false) {
            this.dead = true;
        }
        if (this.calcDistance() <= 15) {
            this.finished = true;
        }
        this.fuel--;
    }

    this.applyForce = function(force) {
        this.acc = force;
    }

    this.calcDistance = function() {
        return this.pos.dist(target.pos);
    }

    this.calcFitness = function() {
        var d = this.calcDistance();
        if (d <= 15) {
            d = 0;
        }
        var fitness = 1 / (d + 1);
        var f = pow(this.fuel, 2);
        f = map(f, 0, this.fullTank, 0.5, 1);
        if (this.dead === true) {
            fitness /= 5;
        } else if (this.fuel > 0) {
            fitness += f;
        }
        this.fitness = fitness;
    }
}
