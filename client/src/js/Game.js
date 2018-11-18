import Vector from 'victor';
import Utils from "./Utils.js";

let lState = {
    canvas: null,
    ctx: null,
    started: true,
    time: {
        fps: 0,
        runTime: 0,
        lastTime: 0,
        deltaTime: 0,
        //Resets to 18 - clamp(runTime / 4, 7, 15)
        asteroidTimer: 15
    },
    colors: {
        asteroid: "#232323",
        background: "#f0f0f0"
    },
    asteroids: [],
    initAstCount: 0,
    maxAstCount: 20
}

const calculateDeltaTime = () => {
    let now = Date.now();
    lState.time.fps = Utils.clamp(1000 / (now - lState.time.lastTime), 5, 60);
    lState.time.lastTime = now;
    return 1 / lState.time.fps;
}

const init = (_canvas, _ctx) => {
    lState.canvas = _canvas;
    lState.ctx = _ctx;
}

const start = () => {
    //Only start if the page is ready
    let stateCheck = setInterval(() => {
        if (document.readyState === 'complete') {
            clearInterval(stateCheck);
            //Page ready, start the app
            window.requestAnimationFrame(update);
            //Initially 8 asteroids for the screenspace of a 1920x1080 display. More/fewer asteroids based on screen size
            lState.initAstCount = Math.floor(Math.max(lState.canvas.width / 240, lState.canvas.height / 135));
            for (let a = 0; a < lState.initAstCount; a++) {
                spawnAsteroid();
            }
        }
    }, 100);
}

const update = () => {
    window.requestAnimationFrame(update);
    lState.time.deltaTime = calculateDeltaTime();
    lState.time.runTime += lState.time.deltaTime;

    //Clear the canvas
    lState.ctx.fillStyle = lState.colors.background;
    lState.ctx.fillRect(0, 0, lState.canvas.width, lState.canvas.height);

    //Update all asteroids
    for (let i = 0; i < lState.asteroids.length; i++) {
        lState.asteroids[i].update(lState.time.deltaTime);
    }
    //Check for collisions
    for (let j = 0; j < lState.asteroids.length; j++) {
        let a1 = lState.asteroids[j];
        for (let i = j + 1; i < lState.asteroids.length; i++) {
            let a2 = lState.asteroids[i];
            if (Utils.ccCollision(a1, a2)) {
                let colResult = Utils.shapeCollision(a1, a2);
                if (colResult != null) {
                    resolveAstCollision(a1, a2, colResult);
                }
            }
        }
    }

    //Only start once the user interacts
    if (lState.started) {
        //Add new asteroid? Based on timer #balance
        lState.time.asteroidTimer -= lState.time.deltaTime;
        if (lState.time.asteroidTimer <= 0) {
            lState.time.asteroidTimer = 18 - Utils.clamp(lState.time.runTime / 6, 3, 11);
            if (lState.asteroids.length < lState.maxAstCount) {
                spawnAsteroid();
            }
        }
    }

    //Draw after all updates
    for (let i = 0; i < lState.asteroids.length; i++) {
        lState.asteroids[i].draw();
    }
}

const spawnAsteroid = () => {
    //#balance numbers for asteroid sizes
    let randPos = new Vector(Utils.randomRange(0, lState.canvas.width), Utils.randomRange(0, lState.canvas.height));
    let randVel = new Vector(Utils.randomRange(-100, 100), Utils.randomRange(-100, 100));
    let randRadius = Utils.randomInt(20, 60);
    lState.asteroids.push(new Asteroid(randPos, randVel, randRadius));
}

const resolveAstCollision = (_a1, _a2, _result) => {
    //Increase the number of collisions this asteroid has this frame
    _a1.collisions += 1;
    _a2.collisions += 1;
    //Ensure both are active
    if (!_a1.active || !_a2.active) {
        return;
    }
    //Shift so asteroids aren't inside each other
    _a1.pos.add(_result);
    _a2.pos.subtract(_result);

    //Calculate elastic collision using radius size for mass
    let mTotal = _a1.radius + _a2.radius;
    let a1NewX = (_a1.vel.x * (_a1.radius - _a2.radius) + (2 * _a2.radius * _a2.vel.x)) / mTotal;
    let a1NewY = (_a1.vel.y * (_a1.radius - _a2.radius) + (2 * _a2.radius * _a2.vel.y)) / mTotal;
    let a2NewX = (_a2.vel.x * (_a2.radius - _a1.radius) + (2 * _a1.radius * _a1.vel.x)) / mTotal;
    let a2NewY = (_a2.vel.y * (_a2.radius - _a1.radius) + (2 * _a1.radius * _a1.vel.y)) / mTotal;
    //Scale new velocity
    _a1.vel = new Vector(a1NewX, a1NewY);
    _a2.vel = new Vector(a2NewX, a2NewY);
}

//Asteroid class
class Asteroid {
    constructor(_pos, _vel, _radius) {
        this.active = false;
        this.collisions = 0;
        this.pos = _pos;
        this.vel = _vel;
        this.radius = _radius;
        this.shape = new Shape(lState.colors.asteroid, 2);
        this.buildShape();
    }
    update(_dt) {
        //Active collisions
        if (this.collisions === 0) {
            this.active = true;
        }
        //Add acceleration to velocity
        this.pos.add(new Vector(this.vel.x * _dt, this.vel.y * _dt));
        //Wrap around screen
        let width = lState.canvas.width;
        let height = lState.canvas.height;
        this.pos.x = this.pos.x >= 0 ? this.pos.x % width : this.pos.x + width;
        this.pos.y = this.pos.y >= 0 ? this.pos.y % height : this.pos.y + height;
        this.collisions = 0;
    }
    draw() {
        //Wrap around screen
        let width = lState.canvas.width;
        let height = lState.canvas.height;
        this.shape.draw(lState.ctx, this.pos);
        if (this.pos.x + this.radius > width) {
            this.shape.draw(lState.ctx, new Vector(-this.radius + (this.pos.x + this.radius) % width, this.pos.y));
        }
        if (this.pos.x - this.radius < 0) {
            this.shape.draw(lState.ctx, new Vector(width + this.pos.x, this.pos.y));
        }
        if (this.pos.y + this.radius > height) {
            this.shape.draw(lState.ctx, new Vector(this.pos.x, -this.radius + (this.pos.y + this.radius) % height))
        }
        if (this.pos.y - this.radius < 0) {
            this.shape.draw(lState.ctx, new Vector(this.pos.x, height + this.pos.y));
        }
    }
    buildShape() {
        let vertCount = Utils.randomInt(3, 13);
        let degreeSpan = 360 / vertCount;
        for (let v = 0; v < vertCount; v++) {
            let newVert = new Vector(this.radius, 0);
            newVert.rotateDeg(v * degreeSpan + Utils.randomRange(degreeSpan * 0.1, degreeSpan + 0.9));
            this.shape.addVert(newVert);
        }
    }
}

//Shape class
class Shape {
    constructor(_color, _lineWeight) {
        this.color = _color;
        this.lineWeight = _lineWeight;
        this.verts = [];
    }
    addVert(_vertPos) {
        this.verts.push(_vertPos);
    }
    draw(_ctx, _pos) {
        if (this.verts.length < 3) {
            return;
        }
        _ctx.save();
        _ctx.translate(_pos.x, _pos.y);
        _ctx.strokeStyle = this.color;
        _ctx.lineWidth = this.lineWeight;
        _ctx.beginPath();
        _ctx.moveTo(this.verts[0].x, this.verts[0].y);
        for (let i = 1; i < this.verts.length; i++) {
            _ctx.lineTo(this.verts[i].x, this.verts[i].y);
        }
        _ctx.closePath();
        _ctx.stroke();
        _ctx.restore();
    }
}

let game = {
    init,
    start,
    update
}

export default game;
