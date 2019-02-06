let population;
let target;
const solids = [];
let finished = false;
let speed;
let showAll;

function setup() {
    createCanvas(600, 800);
    speed = createSlider(1, 10, 1, 1);
    showAll = createButton('show best', true);
    showAll.mousePressed(showHandle);
    population = new Population(1000, 100);
    target = new Target();
    solids.push(new Obstacle(0, height * 0.25, width * 0.75, 15));
    solids.push(new Obstacle(width * 0.25, height * 0.50, width * 0.75, 15));
    solids.push(new Obstacle(0, height * 0.75, width * 0.75, 15));
    solids.push(new Obstacle(width * 0.25, height * 0.375, 15, height * 0.25));
    solids.push(new Obstacle(width * 0.75, height * 0.625, 15, height * 0.25));
}

function draw() {
    background(30);
    target.show();
    for (let i = 0; i < solids.length; i++) {
        solids[i].show();
    }
    population.run();
}

function showHandle() {
    let value = showAll.value();
    showAll.value(value === 'false');
    if (value === 'false') {
        showAll.html('show best');
    } else {
        showAll.html('show all');
    }
}
