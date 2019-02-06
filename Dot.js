class Dot {
    constructor(fuel, dna) {
        this.pos = createVector(0, height * 0.875);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.fitness = 0;
        this.finished = false;
        this.fullTank = fuel;
        this.fuel = 0;
        this.dead = false;
        this.distance = Infinity;
        this.size = 10;
        this.DNA = typeof dna === 'undefined' ? new DNA(this.fullTank) : dna;
    }

    show() {
        if (this.dead === true) {
            return;
        }
        push();
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading());
        noStroke();
        colorMode(HSB);
        fill(this.DNA.color, 200, 50, 0.75);
        ellipse(0, 0, this.size, this.size);
        pop();
    };

    update() {
        if (this.dead === true || this.finished === true) {
            return;
        }

        this.acc = this.DNA.move(this.fuel++);
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
        for (let i = 0; i < solids.length; i++) {
            let obstacle = solids[i];
            if (obstacle.pos.x < this.pos.x && this.pos.x < obstacle.pos.x + obstacle.width && obstacle.pos.y < this.pos.y && this.pos.y < obstacle.pos.y + obstacle.height) {
                this.dead = true;
            }
        }
        if ((0 < this.pos.x && this.pos.x < width && 0 < this.pos.y && this.pos.y < height) === false) {
            this.dead = true;
        }
        if (this.calcDistance() <= 15) {
            this.finished = true;
        }
    };

    calcDistance() {
        this.distance = this.pos.dist(target.pos);
        return this.distance;
    };

    calcFitness() {
        this.fitness = 1 / (this.distance * this.distance);
        if (this.dead === true) {
            this.fitness /= 5;
        }
        if (this.finished === true) {
            let fuelSaved = this.fullTank - this.fuel;
            this.fitness *= fuelSaved;
        }
        return this.fitness;
    };

    clone() {
        let newDNA = this.DNA.clone();
        return new Dot(this.fullTank, newDNA);
    };

    normalizeFitness(sumFit) {
        this.fitness = this.fitness / sumFit;
    };

    crossover(partner, fuel) {
        let newDNA = this.DNA.crossover(partner.DNA, fuel);
        return new Dot(fuel, newDNA);
    };
}
