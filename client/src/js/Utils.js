import Vector from 'victor'
/*
 * Get a cross-browser viewport object with relevant size data
 */
const getViewport = () => {
    let ele = window;
    let pre = 'inner';
    if (!('innerWidth' in window)) {
        pre = 'client';
        ele = document.documentElement || document.body;
    }
    return {
        width: ele[pre + 'Width'],
        height: ele[pre + 'Height'],
        vw: ele[pre + 'Width'] / 100.0,
        vh: ele[pre + 'Height'] / 100.0
    }
}

const clamp = (_value, _min, _max) => {
    return Math.min(Math.max(_value, Math.min(_min, _max)), Math.max(_min, _max));
}

const rangeIntersect = (_min1, _max1, _min2, _max2) => {
    return Math.min(_max1, _max2) - Math.max(_min1, _min2);
}

const randomRange = (_min, _max) => {
    return _min + Math.random() * (_max - _min);
}

const randomVec = () => {
    let vec = new Vector(randomRange(-1, 1), randomRange(-1, 1)).normalize();
    return vec;
}

const randomInt = (_min, _max) => {
    return Math.floor(_min + Math.random() * (_max - _min + 1));
}

const ccCollision = (_sp1, _sp2) => {
    let p1 = _sp1.pos,
        p2 = _sp2.pos;
    let r1 = _sp1.radius,
        r2 = _sp2.radius;
    let pTOp = p2.clone().subtract(p1);
    let rPLUSr = r1*2 + r2*2;
    return pTOp.lengthSq() < rPLUSr * rPLUSr;
}

const shapeCollision = (_a1, _a2) => {
    let axes1 = [];
    let axes2 = [];
    let point1, point2;
    for (let i = 0; i < _a1.shape.verts.length; i++) {
        point1 = _a1.shape.verts[i];
        point2 = _a1.shape.verts[(i + 1) % _a1.shape.verts.length];
        let newAxis = new Vector(point1.x - point2.x, point1.y - point2.y).normalize()
        axes2.push(new Vector(-newAxis.y, newAxis.x));
    }
    for (let i = 0; i < _a2.shape.verts.length; i++) {
        point1 = _a2.shape.verts[i];
        point2 = _a2.shape.verts[(i + 1) % _a2.shape.verts.length];
        let newAxis = new Vector(point1.x - point2.x, point1.y - point2.y).normalize()
        axes2.push(new Vector(-newAxis.y, newAxis.x));
    }

    let smallest = null;
    let overlap = 10000;
    for (let a = 0; a < axes1.length; a++) {
        let range1 = sProject(_a1, axes1[a]),
            range2 = sProject(_a2, axes1[a]);
        let ov = rangeIntersect(range1[0], range1[1], range2[0], range2[1])
        if (ov <= 0) {
            return null;
        }
        if (ov < overlap) {
            overlap = ov;
            smallest = axes2[a];
        }
    }
    for (let a = 0; a < axes2.length; a++) {
        let range1 = sProject(_a1, axes2[a]),
            range2 = sProject(_a2, axes2[a]);
        let ov = rangeIntersect(range1[0], range1[1], range2[0], range2[1])
        if (ov < 0) {
            return null;
        }
        if (ov < overlap) {
            overlap = ov;
            smallest = axes2[a];
        }
    }
    if (smallest != null) {
        return new Vector(-smallest.y * overlap * 0.5, smallest.x * overlap * 0.5);
    } else {
        return null;
    }
}

const sProject = (_ast, _axis) => {
    let rMin = _axis.x * (_ast.pos.x + _ast.shape.verts[0].x) + _axis.y * (_ast.pos.y + _ast.shape.verts[0].y);
    let rMax = rMin;
    for (let i = 1; i < _ast.shape.verts.length; i++) {
        let proj = _axis.x * (_ast.pos.x + _ast.shape.verts[i].x) + _axis.y * (_ast.pos.y + _ast.shape.verts[i].y);
        rMin = proj < rMin ? proj : rMin;
        rMax = proj > rMax ? proj : rMax;
    }
    return [rMin, rMax];
}

let Utils = {
    getViewport,
    clamp,
    rangeIntersect,
    randomRange,
    randomVec,
    randomInt,
    ccCollision,
    shapeCollision
};

export default Utils;
