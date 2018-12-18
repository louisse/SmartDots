var population;
var target;
var obstacle;

function setup() {
    createCanvas(600, 800);
    population = new Population();
    target = new Target();
    obstacle = new Obstacle();
    console.log('gen 1');
}

function draw() {
    background(51);
    target.show();
    obstacle.show();
    population.run();
}
