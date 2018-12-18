function Population() {
    this.generation = 1;
    this.popSize = 1000;
    this.lifeSpan = 200;
    this.life = this.lifeSpan;
    this.rockets = [];
    for (let i = 0; i < this.popSize; i++) {
        this.rockets[i] = new Rocket(this.life);
    }

    this.run = function () {
        let allDead = true;
        for (let i = 0; i < this.rockets.length; i++) {
            let rocket = this.rockets[i];
            allDead = allDead && rocket.dead;
            rocket.update();
            // rocket.show();
        }
        this.rockets[0].show();
        this.life--;
        if (this.life <= 0 || allDead) {
            this.evaluate();
        }
    };

    this.fitnessEval = function () {
        let maxFit = 0;
        let bestRocket = null;
        for (let i = 0; i < this.rockets.length; i++) {
            let rocket = this.rockets[i];
            let fitness = rocket.calcFitness();
            if (fitness > maxFit) {
                maxFit = fitness;
                bestRocket = rocket;
            }
        }
        bestRocket.fitness *= 2;
        for (let i = 0; i < this.rockets.length; i++) {
            let rocket = this.rockets[i];
            rocket.normalizeFitness(maxFit);
        }
        return bestRocket;
    };

    this.evaluate = function () {
        let bestRocket = this.fitnessEval();
        if (bestRocket.finished) {
            console.log('FINISHED!');
        }
        this.generation++;
        console.log('gen ' + this.generation);
        this.lifeSpan = bestRocket.finished === true ? bestRocket.fuel : this.lifeSpan;
        this.life = this.lifeSpan;
        let newRockets = [];
        for (let j = 0; j < this.rockets.length; j++) {
            let parentA = this.pickOneRocket();
            let parentB = this.pickOneRocket();
            let newDNA = parentA.DNA.crossover(parentB.DNA, this.lifeSpan);
            newRockets[j] = new Rocket(this.lifeSpan, newDNA);
        }
        newRockets[0] = bestRocket.clone();
        this.rockets = newRockets;
    };

    this.pickOneRocket = function () {
        while (true) {
            let rocket = random(this.rockets);
            if (random() < rocket.fitness) {
                return rocket;
            }
        }
    };
}
