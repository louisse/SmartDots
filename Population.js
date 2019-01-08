function Population(size, span) {
    this.popSize = size;
    this.lifeSpan = span;
    this.generation = 0;
    this.life = this.lifeSpan;
    this.dots = [];
    for (let i = 0; i < this.popSize; i++) {
        this.dots[i] = new Dot(this.life);
    }

    this.run = function () {
        let allDead = true;
        for (let i = 0; i < this.dots.length; i++) {
            let dot = this.dots[i];
            allDead = allDead && dot.dead;
            dot.update();
            // dot.show();
        }
        this.dots[0].show();
        this.life--;
        if (this.life <= 0 || allDead) {
            this.evaluate();
        }
    };

    this.fitnessEval = function () {
        let maxFit = 0;
        let sumFit = 0;
        let bestDot = null;
        for (let i = 0; i < this.dots.length; i++) {
            let dot = this.dots[i];
            let fitness = dot.calcFitness();
            sumFit += dot.fitness;
            if (fitness > maxFit) {
                maxFit = fitness;
                bestDot = dot;
            }
        }
        sumFit = sumFit - bestDot.fitness + (bestDot.fitness * 10);
        bestDot.fitness *= 10;
        for (let i = 0; i < this.dots.length; i++) {
            let dot = this.dots[i];
            dot.normalizeFitness(sumFit);
        }
        return bestDot;
    };

    this.evaluate = function () {
        let bestDot = this.fitnessEval();
        if (!finished && bestDot.finished) {
            finished = true;
            console.log('FINISHED! -->> ', this.generation);
        }
        this.generation++;
        console.log('gen ' + this.generation);
        if (!finished && this.generation % 10 === 0) {
            this.lifeSpan += 100;
        }
        this.lifeSpan = finished ? bestDot.fuel : this.lifeSpan;
        this.life = this.lifeSpan;
        let newDots = [];
        for (let j = 0; j < this.dots.length; j++) {
            let parentA = this.pickOneDot();
            let parentB = this.pickOneDot();
            newDots[j] = parentA.crossover(parentB, this.lifeSpan);
        }
        newDots[0] = bestDot.clone();
        newDots[0].size *= 1.2;
        this.dots = newDots;
    };

    this.pickOneDot = function () {
        let num = random();
        while (true) {
            let dot = random(this.dots);
            num -= dot.fitness;
            if (num <= 0) {
                return dot;
            }
        }
    };
}
