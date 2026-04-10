minDist = 30.0
maxDist = 70.0
branchLen = 5;


class Tree {

    constructor() {

        this.leaves = [];
        for (let i = 0; i < 500; i++) {
            let x = random(-100, 100);
            let y = random(-100, 100);
            let z = random(-100, 100);
            this.leaves.push(new Leaf(createVector(x, y, z)));
        }

        this.branches = [];
        let pos = createVector(0, -200, 0);
        let dir = createVector(0, 1, 0);
        this.branches[0] = new Branch(null, pos, dir);

        while (true) {
            let lastBranch = this.branches.at(-1);
            let near = false;
            for (let leaf of this.leaves) {
                let dist = lastBranch.pos.dist(leaf.pos);
                if (dist < maxDist) {
                    near = true;
                    break;
                }
            }
            if (near)
                break;
            if (!near) {
                let pos = p5.Vector.add(lastBranch.pos, lastBranch.dir);
                let dir = lastBranch.dir;
                let newBranch = new Branch(lastBranch, pos, dir);
                this.branches.push(newBranch);
            }
        }
    }

    grow() {

        for (let i = this.leaves.length - 1; i >= 0; i--) {
            let leaf = this.leaves[i];
            let nearestBranch = null;
            let smallestDist = Infinity;
            for (let branch of this.branches) {
                let dist = p5.Vector.dist(leaf.pos, branch.pos);
                if (dist <= minDist) {
                    this.leaves.splice(i, 1);
                    nearestBranch = null;
                    break;
                }
                if (dist <= maxDist) {
                    if (dist < smallestDist) {
                        smallestDist = dist;
                        nearestBranch = branch;
                    }
                }
            }

            if (nearestBranch)
                nearestBranch.addLeafForce(leaf.pos);
        }

        for (let branch of this.branches) {

            let newBranch = branch.checkAndGrow();
            if (newBranch)
                this.branches.push(newBranch);
        }
    }

    draw() {
        for (let leaf of this.leaves) {
            leaf.draw();
        }
        for (let i = 0; i < this.branches.length; i++) {
            let weight = (1 - i / this.branches.length) * 5;
            strokeWeight(weight);
            this.branches[i].draw();
        }
    }
}
