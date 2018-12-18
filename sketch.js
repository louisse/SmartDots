var population;
var target;
var obstacle;
var solids = [];

function setup() {
    createCanvas(600, 800);
    population = new Population();
    target = new Target();
    solids.push(new Obstacle(0, height / 2, width * 0.45, 30));
    solids.push(new Obstacle(width * 0.55, height / 2, width * 0.45, 30));
    solids.push(new Obstacle(width * 0.40, height / 4, width * 0.20, 30));
    console.log('gen 1');
}

function draw() {
    background(51);
    target.show();
    for (let i = 0; i < solids.length; i++) {
        solids[i].show();
    }
    population.run();
}
