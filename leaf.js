class Leaf {

    constructor(pos) {
        this.pos = pos;
    }

    draw() {
        
        stroke(255);
        strokeWeight(5);
        point(this.pos.x, this.pos.y, this.pos.z);
    }
}
