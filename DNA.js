class DNA {
    constructor(moves, genes, color) {
        this.moveCount = moves;
        this.mutationRate = 0.03;
        this.bias = 0.50;
        this.genes = typeof genes === 'undefined' ? this.makeRandomGenes(this.moveCount) : genes;
        this.color = typeof color === 'undefined' ? floor(random(360)) : color;
    }

    move(count) {
        return this.genes[count];
    };

    clone() {
        return new DNA(this.moveCount, this.genes, this.color);
    };

    crossover(partner, moveCount) {
        let newGenes = [];
        let newColor = this.color;
        let midpoint = random(moveCount);
        for (let i = 0; i < this.genes.length; i++) {
            newGenes[i] = this.genes[i];
            if (i > midpoint) {
                newGenes[i] = partner.genes[i];
            }
            if (this.decide(this.mutationRate) === true) {
                newGenes[i] = p5.Vector.random2D();
            }
        }
        if (newGenes.length < moveCount) {
            newGenes = newGenes.concat(this.makeRandomGenes(moveCount - newGenes.length));
        } else if (newGenes.length > moveCount) {
            newGenes.length = moveCount;
        }
        if (this.decide(this.bias) === false) {
            newColor = partner.color;
        }
        if (this.decide(this.mutationRate) === true) {
            newColor = floor(random(360));
        }

        return new DNA(this.moveCount, newGenes, newColor);
    };

    decide(chance) {
        let roll = random();
        return roll <= chance;
    };

    makeRandomGenes(moveCount) {
        let arr = [];
        for (let i = 0; i < moveCount; i++) {
            arr.push(p5.Vector.random2D());
        }
        return arr;
    }
}
