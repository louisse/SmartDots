function DNA(moves, genes, color) {
    this.moveCount = moves;
    this.mutationRate = 0.10;
    this.bias = 0.50;
    if (typeof genes !== 'undefined') {
        this.genes = genes;
    } else {
        this.genes = [];
        for (let i = 0; i < this.moveCount; i++) {
            this.genes[i] = p5.Vector.random2D();
        }
    }
    if (typeof color !== 'undefined') {
        this.color = floor(color);
    } else {
        this.color = floor(random(360));
    }

    this.move = function (count) {
        return this.genes[count];
    };

    this.crossover = function (partner, moveCount) {
        let newGenes = [];
        let newColor = this.color;
        for (let i = 0; i < moveCount; i++) {
            if (this.decide(this.bias) === true) {
                newGenes[i] = this.genes[i];
            } else {
                newGenes[i] = partner.genes[i];
            }
            if (this.decide(this.mutationRate) === true) {
                newGenes[i] = p5.Vector.random2D();
            }
        }
        if (this.decide(this.bias) === false) {
            newColor = partner.color;
        }
        if (this.decide(this.mutationRate) === true) {
            newColor = floor(random(360));
        }
        return new DNA(this.moveCount, newGenes, newColor);
    };

    this.decide = function (chance) {
        return random() < chance;
    };
}
