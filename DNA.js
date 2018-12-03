function DNA(moves, genes, color) {
    this.moveCount = moves;
    this.count = 0;
    this.mutationRate = 0.01;
    this.bias = 0.75;
    if (Array.isArray(genes) === true) {
        this.genes = genes;
    } else {
        this.genes = [];
        for (var i = 0; i < this.moveCount; i++) {
            this.genes[i] = p5.Vector.random2D();
        }
    }
    if (!isNaN(parseFloat(color)) && isFinite(color)) {
        this.color = floor(color);
    } else {
        this.color = floor(random(360));
    }

    this.next = function() {
        if (this.count >= this.genes.length) {
            return createVector();
        }
        return this.genes[this.count++];
    }

    this.crossover = function(partner) {
        var newGenes = [];
        var newColor = this.color;
        for (var i = 0; i < this.genes.length; i++) {
            if (this.decide(this.bias) === true) {
                newGenes[i] = this.genes[i];
            } else {
                newGenes[i] = partner.genes[i];
            }
            if(this.decide(this.mutationRate) === true) {
                newGenes[i] = p5.Vector.random2D();
            }
        }
        if(this.decide(this.bias) === false) {
            newColor = partner.color;
        }
        if(this.decide(this.mutationRate) === true) {
            newColor = floor(random(360));
        }
        return new DNA(this.moveCount, newGenes, newColor);
    }

    this.decide = function(chance) {
        var count = random();
        if (count < chance) {
            return true;
        }
        return false;
    }
}
