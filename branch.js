class Branch {

    constructor(parent, pos, dir) {
        this.parent = parent;
        this.pos = pos.copy();
        this.dir = dir.copy();
        this.dir.mag(branchLen);

        this.leafForces = [];
    }

    addLeafForce(pos) {

        this.leafForces.push(pos);
    }

    checkAndGrow() {
        if (this.leafForces.length == 0)
            return null;

        let totalForce = createVector();
        for (let pos of this.leafForces) {

            let forceDir = p5.Vector.sub(pos, this.pos);
            totalForce.add(forceDir);
        }
        totalForce.setMag(branchLen);
        this.leafForces = [];

        let pos = p5.Vector.add(this.pos, totalForce);
        return new Branch(this, pos, totalForce);
    }

    draw() {
        if (!this.parent)
            return;

        stroke(255, 255, 0);
        line(this.parent.pos.x, this.parent.pos.y, this.parent.pos.z, this.pos.x, this.pos.y, this.pos.z);
    }
}
