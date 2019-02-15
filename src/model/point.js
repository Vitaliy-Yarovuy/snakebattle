

export const zero = { x: 0, y: 0 };

export const ORIENTATION = {
    UP: { x: 0, y: -1 },
    RIGHT: { x: 1, y: 0 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    UNKNOW: { x: 0, y: 0 }
}

export const ORIENTATIONS = [
    ORIENTATION.UP,
    ORIENTATION.RIGHT,
    ORIENTATION.DOWN,
    ORIENTATION.LEFT
]

export const remove = (a, b) => ({
    x: a.x - b.x,
    y: a.y - b.y
});

export const add = (a, b) => ({
    x: a.x + b.x,
    y: a.y + b.y
});

export const eq = (a, b) => a && b && a.x === b.x && a.y === b.y;

export const negative = (a) => remove(zero, a);

export const getDiff = (prev, next) => remove(next, prev);
export const getDistance = (a, b) => {
    const diff = getDiff(a, b);
    return Math.abs(diff.x) + Math.abs(diff.y);
}



export const getAround = (p, skip) => [
    ORIENTATION.UP,
    ORIENTATION.RIGHT,
    ORIENTATION.DOWN,
    ORIENTATION.LEFT,
]   
    .filter(orient => !eq(orient, skip))
    .map(orient => add(p,orient));


export const diffToCommand = ({ x, y }) => {
    const acts = {
        '-1,0': 'LEFT',
        '0,-1': 'UP',
        '1,0': 'RIGHT',
        '0,1': 'DOWN',
    };
    return acts[('' + [x, y])] || '';
};
