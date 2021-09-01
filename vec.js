class Point{
    constructor(x, y){
        this.x = x; this.y = y;
    }

    add(p){
        return new Point(this.x + p.x, this.y + p.y);
    }

    sub(p){
        return new Point(this.x - p.x, this.y - p.y);
    }

    addScaled(p, k){
        return new Point(this.x + (p.x * k), this.y + (p.y * k));
    }

    scale(k){
        return new Point(this.x * k, this.y * k);
    }

    ang(){
        return Math.atan2(this.y, this.x);
    }

    mag(){
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    rotate(center, angle){
        let x = this.x - center.x;
        let y = this.y - center.y;
        let r = [];
        r[0] = Math.cos(angle) * x - Math.sin(angle) * y;
        r[1] = Math.sin(angle) * x + Math.cos(angle) * y;
        r[0] += center.x;
        r[1] += center.y;
        return new Point(r[0], r[1]);
    }

    show(c, color = "red"){
        c.beginPath();
        c.fillStyle = color;
        c.arc(this.x, this.y, 5, 0, 2 * Math.PI);
        c.fill();
        c.closePath();
    }
}

class Vec2d{
    constructor(p1, p2){
        this.vecFromOrigin = p2.sub(p1);
        this.startPosition = p1;
        this.endPosition = p2;
        this.dir = this.vecFromOrigin.ang();
        this.mag = this.vecFromOrigin.mag();
    }

    dot(v){
        return this.vecFromOrigin.x * v.vecFromOrigin.x + this.vecFromOrigin.y * v.vecFromOrigin.y;
    }

    show(c, color = "blue"){
        c.beginPath();
        c.strokeStyle = color;
        c.lineWidth = 2;
        c.moveTo(this.startPosition.x, this.startPosition.y);
        c.lineTo(this.endPosition.x, this.endPosition.y);
        c.closePath();
        c.stroke();
        c.fillStyle = "yellow";
        c.fillRect(this.endPosition.x, this.endPosition.y, 5, 5);
    }
}


class Vec{
    constructor(pos, dir, mag){
        this.startPosition = pos;
        this.dir = dir;
        this.mag = mag;
        this.endPosition = new Point(0, 0);
        this.endPosition.x = this.startPosition.x + Math.cos(this.dir) * this.mag;
        this.endPosition.y = this.startPosition.y + Math.sin(this.dir) * this.mag;
        this.vecFromOrigin = this.endPosition.sub(this.startPosition);
    }

    dot(v){
        return this.vecFromOrigin.x * v.vecFromOrigin.x + this.vecFromOrigin.y * v.vecFromOrigin.y;
    }

    show(c, color = "blue"){
        c.beginPath();
        c.strokeStyle = color;
        c.lineWidth = 2;
        c.moveTo(this.startPosition.x, this.startPosition.y);
        c.lineTo(this.endPosition.x, this.endPosition.y);
        c.closePath();
        c.stroke();
    }
}




