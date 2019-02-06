class DNA {
    constructor(maxMoves, genes, color) {
        this.maxMoves = maxMoves;
        this.mutationRate = 0.03;
        this.genes = typeof genes === 'undefined' ? this.makeRandomGenes(this.maxMoves) : genes;
        this.color = typeof color === 'undefined' ? floor(random(360)) : color;
    }

    think(count) {
        return this.genes[count];
    }

    clone() {
        return new DNA(this.maxMoves, this.genes, this.color);
    }

    crossoverGenes(partner, moveCount) {
        let newGenes = [];
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
        return newGenes;
    }

    crossoverColor(partner) {
        let newColor = this.color;
        if (this.decide(0.5) === false) {
            newColor = partner.color;
        }
        if (this.decide(this.mutationRate) === true) {
            newColor = floor(random(360));
        }
        return newColor
    }

    crossover(partner, moveCount) {
        let newGenes = this.crossoverGenes(partner, moveCount);
        let newColor = this.crossoverColor(partner);
        return new DNA(this.maxMoves, newGenes, newColor);
    }

    decide(chance) {
        let roll = random();
        return roll <= chance;
    }

    makeRandomGenes(moveCount) {
        let arr = [];
        for (let i = 0; i < moveCount; i++) {
            arr.push(p5.Vector.random2D());
        }
        return arr;
    }
}
