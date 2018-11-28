function Population () {
    this.generation = 1;
    this.popSize = 100;
    this.lifeSpan = 100;
    this.life = this.lifeSpan;
    this.rockets = [];

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
            this.rockets[i].show();
        }
        this.life--;
    }

    this.evaluate = function() {
        var sum = 0;
        var minDist = 0;
        var maxFuel = 0;
        for (var i = 0; i < this.rockets.length; i++) {
            var d = this.rockets[i].calcDistance();
            if (d < minDist) {
                minDist = d;
            }
            this.rockets[i].calcFuel();
            sum += this.rockets[i].fitness
            if (this.rockets[i].fitness > maxFit) {
                maxFit = this.rockets[i].fitness;
            }
            if (this.rockets[i].dead === false && this.rockets[i].fuel > maxFuel) {
                maxFuel = this.rockets[i].fuel;
            }
        }
        console.log(maxFuel);
        // normalize fitness 0 between 1
        for (var i = 0; i < this.rockets.length; i++) {
            this.rockets[i].prob = this.rockets[i].fitness / sum ;
        }
        var newRockets = [];
        for (var i = 0; i < this.rockets.length; i++) {
            var parentA = this.pickOneRocket();
            var parentB = this.pickOneRocket();
            var newDNA = parentA.DNA.crossover(parentB.DNA);
            newRockets[i] = new Rocket(this.lifeSpan, newDNA);
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
