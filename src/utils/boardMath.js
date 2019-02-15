import {
    ELEMENT
} from '../constants';
import {
    getBoardSize,
    getElementByXY
} from './utils';
import {
    sprintf
} from 'sprintf-js';

export const NOT_FOUD = { distance: -1, prev: null };

export function getEmptyMatrix(size) {
    return new Array(size ** 2).fill(NOT_FOUD);
}

export function getMatrixView(matrix) {
    return matrix.map(x => sprintf('%2d', x.distance)).join('');
}

export function defaultCheck(board, position) {
    const element = getElementByXY(board, position);

    return [
        ELEMENT.NONE,
        ELEMENT.APPLE,
        ELEMENT.FLYING_PILL,
        ELEMENT.FURY_PILL,
        ELEMENT.GOLD
    ].includes(element);
}

export const checkWith = (adds) => (board, position) => {
    const element = getElementByXY(board, position);

    return [
        ELEMENT.NONE,
        ELEMENT.APPLE,
        ELEMENT.FLYING_PILL,
        ELEMENT.FURY_PILL,
        ELEMENT.GOLD,
        ...adds
    ].includes(element);
}

export function getMatrixValue(matrix, size, { x, y }) {
    return matrix[size * y + x];
}
export function setMatrixValue(matrix, size, { x, y }, value) {
    return matrix[size * y + x] = value;
}

export function isOutOf(size, { x, y }) {
    return x >= size || y >= size || x < 0 || y < 0;
}

export function getDistanceMatrix(board, position, check = defaultCheck) {
    const size = getBoardSize(board);
    const matrix = getEmptyMatrix(size);
    const queue = [{ point: position, distance: 0, prev: null }];
    let item;

    while (item = queue.shift()) {
        const { point, distance, prev } = item;
        if (NOT_FOUD !== getMatrixValue(matrix, size, point)) {
            continue;
        }
        setMatrixValue(matrix, size, point, { distance, prev });

        [
            { x: point.x, y: point.y + 1 },
            { x: point.x, y: point.y - 1 },
            { x: point.x + 1, y: point.y },
            { x: point.x - 1, y: point.y },
        ]
            .filter(p => !isOutOf(size, p))
            .filter(p => check(board, p))
            .forEach(p => {
                queue.push({ point: p, distance: distance + 1, prev: point })
            })
    }
    return matrix;
}


export function getPath(matrix, size, position) {
    let prev;
    const path = [];
    do {
        path.unshift(position);
        const item = getMatrixValue(matrix, size, position);
        position = item.prev;
    } while (position !== null);

    return path
}

