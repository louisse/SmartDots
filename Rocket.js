function Rocket(fuel, dna) {
    this.pos = createVector(width / 2, height);
    this.vel = createVector();
    this.acc = createVector();
    this.fitness = 0;
    this.finished = false;
    this.fullTank = fuel;
    this.fuel = 0;
    this.dead = false;
    this.distance = Infinity;

    if (typeof dna !== 'undefined') {
        this.DNA = dna;
    } else {
        this.DNA = new DNA(this.fullTank);
    }

    this.show = function () {
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        noStroke();
        colorMode(HSB);
        fill(this.DNA.color, 200, 50, 0.75);
        rectMode(CENTER);
        rect(0, 0, 50, 10);
        pop();
    };

    this.update = function () {
        if (this.dead === true || this.finished === true) {
            return;
        }

        this.acc = this.DNA.move(this.fuel);
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
        this.fuel++;
    };

    this.calcDistance = function () {
        this.distance = this.pos.dist(target.pos);
        return this.distance <= 15 ? 0 : this.distance;
    };

    this.calcFitness = function () {
        this.fitness = 1 / (this.distance * this.distance) + 1;
        if (this.dead === true) {
            this.fitness /= 10;
        }
        if (this.finished === true) {
            let fuelSaved = this.fullTank - this.fuel;
            this.fitness *= (fuelSaved * fuelSaved) + 3;
        }
        return this.fitness;
    };

    this.clone = function() {
        let newDNA = new DNA(this.fullTank, this.DNA.genes, this.DNA.color);
        return new Rocket(this.fullTank, newDNA);
    };

    this.normalizeFitness = function(maxFit) {
        this.fitness = this.fitness / maxFit;
    }
}
