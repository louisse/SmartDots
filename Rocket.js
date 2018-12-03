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
    this.distance = Number.MAX_SAFE_INTEGER;
    this.potential = 0;

    if (typeof dna !== 'undefined') {
        this.DNA = dna;
    } else {
        this.DNA = new DNA(this.fuel);
    }

    this.show = function() {
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
        this.distance = this.pos.dist(target.pos);
        return this.distance <= 15 ? 0 : this.distance;
    }

    this.calcFitness = function(maxDist, maxFuel) {
        var normDist = this.distance / maxDist;
        normDist = 1 - normDist;
        this.fitness = normDist;

        if (this.finished === true) {
            var normFuel = this.fuel / maxFuel;
            this.fitness += normFuel * 10;
        }
        if (this.dead === true) {
            this.fitness /= 10;
        }
        return this.fitness;
    }

    this.normalizeFitness = function(maxFit) {
        this.fitness = this.fitness / maxFit;
    }

    this.setPotential = function(parentA, parentB) {
        this.potential = (parentA.fitness * parentA.DNA.bias) + parentB.fitness * (1 - parentA.DNA.bias);
    }
}
