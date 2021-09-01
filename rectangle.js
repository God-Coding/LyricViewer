class Rect{
    constructor(center, w, h){
        this.center = new Point(center.x, center.y);
        this.w = w; this.h = h;
        this.angle = 0;
        this.gravity = new Point(0, 70);
        this.velocity = new Point(0, 0);
        this.vertices = [];
        this.faceNormals = [];
        this.fnm = 1; //faceNormalMagnitude

        this.vertices[0] = new Point( this.center.x - this.w/2, this.center.y - this.h/2 );
        this.vertices[1] = new Point( this.center.x + this.w/2, this.center.y - this.h/2 );
        this.vertices[2] = new Point( this.center.x + this.w/2, this.center.y + this.h/2 );
        this.vertices[3] = new Point( this.center.x - this.w/2, this.center.y + this.h/2 );

        this.faceNormals[0] = new Vec(new Point((this.vertices[0].x + this.vertices[1].x) / 2, (this.vertices[0].y + this.vertices[1].y) / 2), this.vertices[1].sub(this.vertices[2]).ang(), this.fnm);
        this.faceNormals[1] = new Vec(new Point((this.vertices[1].x + this.vertices[2].x) / 2, (this.vertices[1].y + this.vertices[2].y) / 2), this.vertices[2].sub(this.vertices[3]).ang(), this.fnm);
    }

    rotate(angle){
        this.angle += angle;
        for(let i = 0; i < this.vertices.length; i++){
            this.vertices[i] = this.vertices[i].rotate(this.center, angle);
        }
        this.faceNormals[0] = new Vec(new Point((this.vertices[0].x + this.vertices[1].x) / 2, (this.vertices[0].y + this.vertices[1].y) / 2), this.vertices[1].sub(this.vertices[2]).ang(), this.fnm);
        this.faceNormals[1] = new Vec(new Point((this.vertices[1].x + this.vertices[2].x) / 2, (this.vertices[1].y + this.vertices[2].y) / 2), this.vertices[2].sub(this.vertices[3]).ang(), this.fnm);
    }

    move(vec, dt = 1){
        this.center = this.center.addScaled(vec, dt);
        for(let i = 0; i < this.vertices.length; i++){
            this.vertices[i] = this.vertices[i].addScaled(vec, dt);
        }
        this.faceNormals[0] = new Vec(new Point((this.vertices[0].x + this.vertices[1].x) / 2, (this.vertices[0].y + this.vertices[1].y) / 2), this.vertices[1].sub(this.vertices[2]).ang(), this.fnm);
        this.faceNormals[1] = new Vec(new Point((this.vertices[1].x + this.vertices[2].x) / 2, (this.vertices[1].y + this.vertices[2].y) / 2), this.vertices[2].sub(this.vertices[3]).ang(), this.fnm);
    }

    update(dt){
        //this.velocity = this.velocity.addScaled(this.gravity, dt);
        this.move(new Point(0, 40), dt);
    }

    project(normal){
        let min = 99999, max = -99999;
        let minVer, maxVer;
        for(let i = 0; i < this.vertices.length; i++){
            let vec = new Vec2d(normal.startPosition, this.vertices[i]);
            let distance = normal.dot(vec);
            if(distance < min){
                min = distance;
                minVer = this.vertices[i];
            }
            if(distance > max){
                max = distance;
                maxVer = this.vertices[i];
            }
        }
        return {
            minVert : minVer,
            maxVert : maxVer,
            minDis : min,
            maxDis : max
        }
    }

    show(c){
        c.save();
        c.translate(this.vertices[0].x, this.vertices[0].y);
        c.rotate(this.angle);
        c.strokeStyle = "red";
        c.strokeRect(0, 0, this.w, this.h);
        c.restore();
        this.center.show(c);
        this.vertices.forEach(vertex=>{
            vertex.show(c, "green");
        });
        this.faceNormals.forEach(fn=>{
            fn.show(c, "blue");
        });  
    }

    static Collide(r1, r2){
        let stack = [];
        let n = undefined;
        let d = 999999;
        for(let i = 0; i < r1.faceNormals.length; i++){
            let info1 = r1.project(r1.faceNormals[i]);
            let info2 = r2.project(r1.faceNormals[i]);
            let minA = info1.minDis; let minB = info2.minDis;
            let maxA = info1.maxDis; let maxB = info2.maxDis;
            if(maxA < minB || minA > maxB){
                return false;
            }else{
                let depth = undefined;
                if(minB > minA){
                    depth = Math.abs(maxA - minB);
                }
                if(minA > minB){
                    depth = Math.abs(minA - maxB);
                }
                stack.push({
                    dir : r1.faceNormals[i],
                    depth : depth
                });
            }
        }
        for(let i = 0; i < r2.faceNormals.length; i++){
            let info1 = r1.project(r2.faceNormals[i]);
            let info2 = r2.project(r2.faceNormals[i]);
            let minA = info1.minDis; let minB = info2.minDis;
            let maxA = info1.maxDis; let maxB = info2.maxDis;
            if(maxA < minB || minA > maxB){
                return false;
            }else{
                let depth = undefined;
                if(minB > minA){
                    depth = Math.abs(maxA - minB);
                }
                if(minA > minB){
                    depth = Math.abs(minA - maxB);
                }
                stack.push({
                    dir : r2.faceNormals[i],
                    depth : depth
                });
            }
        }
        for(let i = 0; i < stack.length; i++){
            if(stack[i].depth < d){
                d = stack[i].depth;
                n = stack[i].dir;
            }
        }
        let vec = new Vec2d(r1.center, r2.center);
        if(vec.dot(n) < 0){
            r1.move(n.vecFromOrigin, d/2);
        }else{
            r1.move(n.vecFromOrigin, -d/2);
        }
        return true;
    }
}



