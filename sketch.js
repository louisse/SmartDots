var population;
var target;
var solids = [];
var finished = false;

function setup() {
    createCanvas(600, 800);
    population = new Population(1000, 100);
    target = new Target();
    solids.push(new Obstacle(0, height * 0.25, width * 0.75, 15));
    solids.push(new Obstacle(width * 0.25, height * 0.50, width * 0.75, 15));
    solids.push(new Obstacle(0, height * 0.75, width * 0.75, 15));
    solids.push(new Obstacle(width * 0.25, height * 0.375, 15, height * 0.25));
    solids.push(new Obstacle(width * 0.75, height * 0.625, 15, height * 0.25));
    solids.push(new Obstacle(width * 0.75, height * 0.125, 15, height * 0.25));
}

function draw() {
    background(51);
    target.show();
    for (let i = 0; i < solids.length; i++) {
        solids[i].show();
    }
    population.run();
}
