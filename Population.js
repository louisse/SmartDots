class Population {
    constructor(size, span) {
        this.popSize = size;
        this.lifeSpan = span;
        this.generation = 0;
        this.life = this.lifeSpan;
        this.allIsDead = true;
        this.dots = [];
        for (let i = 0; i < this.popSize; i++) {
            this.dots[i] = new Dot(this.life);
        }
    }


    run() {
        //update
        this.allIsDead = true;
        let oneFinished = false;
        for (let n = 0; n < speedSlider.value(); n++) {
            for (let dot of this.dots) {
                this.allIsDead = this.allIsDead && dot.isDead;
                oneFinished = oneFinished || dot.isFinished;
                dot.update();
            }
        }
        this.life -= speedSlider.value();
        //render
        if (showAllSlider.value() === 'true') {
            for (let dot of this.dots) {
                dot.show();
            }
        }
        this.dots[0].show();

        if (oneFinished === true || this.life <= 0 || this.allIsDead === true) {
            this.evaluate();
        }
    }

    fitnessEval() {
        let sumFit = 0;
        let bestDot = this.dots[0];
        for (let dot of this.dots) {
            let fitness = dot.calcFitness();
            sumFit += fitness;
            if (fitness > bestDot.fitness) {
                bestDot = dot;
            }
        }
        sumFit = sumFit - bestDot.fitness + (bestDot.fitness * 5);
        bestDot.fitness *= 5;
        for (let dot of this.dots) {
            dot.normalizeFitness(sumFit);
        }
        return bestDot;
    }

    evaluate() {
        let bestDot = this.fitnessEval();
        if (mazeFinished === false && bestDot.isFinished === true) {
            mazeFinished = true;
            print('FINISHED! -->> ', this.generation, bestDot);
        }
        this.generation++;
        if (mazeFinished === false && this.allIsDead === false && this.generation % 5 === 0) {
            this.lifeSpan += 100;
        }
        if (mazeFinished === true && bestDot.moveCount < this.lifeSpan) {
            this.lifeSpan = bestDot.moveCount;
        }
        this.life = this.lifeSpan;
        print('gen', this.generation, this.lifeSpan);
        let newDots = [];
        for (let i = 1; i < this.popSize; i++) {
            let parentA = this.pickOneDot();
            let parentB = this.pickOneDot();
            newDots[i] = parentA.crossover(parentB, this.lifeSpan);
        }
        newDots[0] = bestDot.clone();
        this.dots = newDots;
    }

    pickOneDot() {
        let num = random();
        while (true) {
            let dot = random(this.dots);
            num -= dot.fitness;
            if (num <= 0) {
                return dot;
            }
        }
    }
}
