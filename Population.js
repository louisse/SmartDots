function Population () {
    this.generation = 1;
    this.popSize = 100;
    this.lifeSpan = 125;
    this.life = this.lifeSpan;
    this.rockets = [];
    this.spotLight = null;

    for (var i = 0; i < this.popSize; i++) {
        this.rockets[i] = new Rocket(this.lifeSpan);
    }

    this.run = function() {
        if (this.life <= 0) {
            this.generation++;
            this.life = this.lifeSpan;
            this.evaluate();
            console.log('gen ' + this.generation);
        }
        for (var i = 0; i < this.rockets.length; i++) {
            this.rockets[i].update();
            if (show === true) {
                this.rockets[i].show();
            }
        }
        if (show === false && this.spotLight !== null) {
            this.spotLight.show();
        }
        this.life--;
    }

    this.evaluate = function() {
        var maxDist = 0;
        var maxFuel = 0;
        var maxFit = 0;
        for (var i = 0; i < this.rockets.length; i++) {
            var dist = this.rockets[i].calcDistance();
            var fuel = this.rockets[i].fuel;
            if (dist > maxDist) {
                maxDist = dist;
            }
            if (this.rockets[i].finished === true && fuel > maxFuel) {
                maxFuel = fuel;
            }
        }
        for (var i = 0; i < this.rockets.length; i++) {
            var fitness = this.rockets[i].calcFitness(maxDist, maxFuel);
            if (fitness > maxFit) {
                maxFit = fitness;
            }
        }
        for (var i = 0; i < this.rockets.length; i++) {
            this.rockets[i].normalizeFitness(maxFit);
        }
        var newRockets = [];
        var maxPotential = Number.MIN_SAFE_INTEGER;
        var bestChild = null;
        for (var i = 0; i < this.rockets.length; i++) {
            var parentA = this.pickOneRocket();
            var parentB = this.pickOneRocket();
            var newDNA = parentA.DNA.crossover(parentB.DNA);
            var child = new Rocket(this.lifeSpan, newDNA);
            child.setPotential(parentA, parentB);
            if (child.potential > maxPotential) {
                maxPotential = child.potential;
                this.spotLight = child;
            }
            newRockets[i] = child;
        }
        this.rockets = newRockets;
    }

    this.pickOneRocket = function() {
        while (true) {
            var rocket = random(this.rockets);
            var count = random();
            if (count < rocket.fitness) {
                return rocket;
            }
        }
    }
}
