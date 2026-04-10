let tree;

function setup() {
    createCanvas(400, 400, WEBGL);

    tree = new Tree();
}

function draw() {
    background(51);
    orbitControl(5, 5, 1);

    tree.grow();
    tree.draw();
}
