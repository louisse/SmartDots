function DNA(moves, genes, color) {
    this.moveCount = moves;
    this.mutationRate = 0.20;
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
    this.color = floor(random(360));

    this.move = function (count) {
        return this.genes[count];
    };

    this.clone = function () {
        return new DNA(this.moveCount, this.genes, this.color);
    };

    this.crossover = function (partner, moveCount) {
        let newGenes = [];
        let newColor = this.color;
        let midpoint = random(moveCount);
        for (let i = 0; i < this.genes.length; i++) {
            if (i <= midpoint) {
                newGenes[i] = this.genes[i];
            }
            if (i > midpoint) {
                newGenes[i] = partner.genes[i];
            }
            if ((i >= moveCount - 100) && (this.decide(this.mutationRate) === true)) {
                newGenes[i] = p5.Vector.random2D();
            }
        }
        while (newGenes.length < moveCount) {
            newGenes.push(p5.Vector.random2D());
        }
        newGenes.length = moveCount;
        if (this.decide(this.bias) === false) {
            newColor = partner.color;
        }
        if (this.decide(this.mutationRate) === true) {
            newColor = floor(random(360));
        }
        return new DNA(this.moveCount, newGenes, newColor);
    };

    this.decide = function (chance) {
        let roll = random();
        return roll <= chance;
    };
}
