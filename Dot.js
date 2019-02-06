class Dot {
    constructor(maxMoves, brain) {
        this.pos = createVector(0, height * 0.875);
        this.vel = createVector(0, 0);
        this.acc = createVector(0, 0);
        this.fitness = 0;
        this.isFinished = false;
        this.maxMoves = maxMoves;
        this.moveCount = 0;
        this.isDead = false;
        this.distance = Infinity;
        this.size = 10;
        this.brain = typeof brain === 'undefined' ? new DNA(this.maxMoves) : brain;
    }

    show() {
        if (this.isDead === true) {
            return;
        }
        push();
        translate(this.pos.x, this.pos.y);
        colorMode(HSB);
        stroke(this.brain.color, 200, 50, 0.9);
        strokeWeight(this.size);
        point(0, 0);
        pop();
    }

    update() {
        if (this.isDead === true || this.isFinished === true) {
            return;
        }

        this.acc = this.brain.think(this.moveCount++);
        this.vel.add(this.acc);
        this.vel.limit(5);
        this.pos.add(this.vel);
        for (let obstacle of solids) {
            if (obstacle.pos.x < this.pos.x && this.pos.x < obstacle.pos.x + obstacle.width && obstacle.pos.y < this.pos.y && this.pos.y < obstacle.pos.y + obstacle.height) {
                this.isDead = true;
            }
        }
        if ((0 < this.pos.x && this.pos.x < width && 0 < this.pos.y && this.pos.y < height) === false) {
            this.isDead = true;
        }
        if (this.calcDistance() <= 15) {
            this.isFinished = true;
        }
    }

    calcDistance() {
        this.distance = this.pos.dist(target.pos);
        return this.distance;
    }

    calcFitness() {
        this.fitness = 1 / (this.distance * this.distance);
        if (this.isDead === true) {
            this.fitness /= 5;
        }
        if (this.isFinished === true) {
            this.fitness *= this.maxMoves - this.moveCount;
        }
        return this.fitness;
    }

    clone() {
        let newDNA = this.brain.clone();
        return new Dot(this.maxMoves, newDNA);
    }

    normalizeFitness(sumFit) {
        this.fitness = this.fitness / sumFit;
    }

    crossover(partner, fuel) {
        let newDNA = this.brain.crossover(partner.brain, fuel);
        return new Dot(fuel, newDNA);
    }
}
