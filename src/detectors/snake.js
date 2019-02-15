import {
    getAllPositionOf,
    getFirstPositionOf,
    getElementByXY
} from '../utils/utils';

import {
    ELEMENT,
    ENEMY_,
    HEADS,
    ENEMY_HEADS,
    TAILS,
    ENEMY_TAILS,
    BODYS,
    ENEMY_BODYS,
    ALL_SNAKES,
    ENEMY_SNAKES,
    SNAKES
} from '../constants';

import { ORIENTATION, ORIENTATIONS, remove, eq, negative, } from '../model/point';


const matchElementToOrientation = (element, patern) => {
    const KEY = ['LEFT', 'RIGHT', 'DOWN', 'UP']
        .reduce(
            (acc, KEY) => {
                acc[ELEMENT[patern(KEY)]] = KEY;
                return acc;
            }
            , {})[element] || 'UNKNOW';
    return ORIENTATION[KEY];
}


export const getHeadOrientation = (element, isEnemy) => {
    if (!isEnemy) {
        element = ENEMY_(element);
    }
    return matchElementToOrientation(element, KEY => `ENEMY_HEAD_${KEY}`);
}


const getTailOrientation = (element, isEnemy) => {
    if (!isEnemy) {
        element = ENEMY_(element);
    }
    let orientation = matchElementToOrientation(element, KEY => `ENEMY_TAIL_END_${KEY}`)
    return negative(orientation);
}


const getBodyOrientationByHead = (element, isEnemy, headOrientation) => {
    if (!isEnemy) {
        element = ENEMY_(element);
    }

    switch (element) {
        case ELEMENT.ENEMY_BODY_HORIZONTAL:
            if (eq(headOrientation, ORIENTATION.LEFT) || eq(headOrientation, ORIENTATION.RIGHT)) {
                return [headOrientation, headOrientation];
            }
            return [headOrientation, ORIENTATION.UNKNOW];


        case ELEMENT.ENEMY_BODY_VERTICAL:
            if (eq(headOrientation, ORIENTATION.UP) || eq(headOrientation, ORIENTATION.DOWN)) {
                return [headOrientation, headOrientation];
            }
            return [headOrientation, ORIENTATION.UNKNOW];


        case ELEMENT.ENEMY_BODY_LEFT_DOWN:
            if (eq(headOrientation, ORIENTATION.LEFT)) {
                return [headOrientation, ORIENTATION.UP];
            }
            if (eq(headOrientation, ORIENTATION.DOWN)) {
                return [headOrientation, ORIENTATION.RIGHT];
            }
            return [headOrientation, ORIENTATION.UNKNOW];


        case ELEMENT.ENEMY_BODY_LEFT_UP:
            if (eq(headOrientation, ORIENTATION.LEFT)) {
                return [headOrientation, ORIENTATION.DOWN];
            }
            if (eq(headOrientation, ORIENTATION.UP)) {
                return [headOrientation, ORIENTATION.RIGHT];
            }
            return [headOrientation, ORIENTATION.UNKNOW];


        case ELEMENT.ENEMY_BODY_RIGHT_DOWN:
            if (eq(headOrientation, ORIENTATION.RIGHT)) {
                return [headOrientation, ORIENTATION.UP];
            }
            if (eq(headOrientation, ORIENTATION.DOWN)) {
                return [headOrientation, ORIENTATION.LEFT];
            }
            return [headOrientation, ORIENTATION.UNKNOW];


        case ELEMENT.ENEMY_BODY_RIGHT_UP:
            if (eq(headOrientation, ORIENTATION.RIGHT)) {
                return [headOrientation, ORIENTATION.DOWN];
            }
            if (eq(headOrientation, ORIENTATION.UP)) {
                return [headOrientation, ORIENTATION.LEFT];
            }
            return [headOrientation, ORIENTATION.UNKNOW];
    }
}


export const getHeadPosition = (board)=> getFirstPositionOf(board, HEADS);
export const getEnemyHeadsPosition = (board) => getAllPositionOf(board, ENEMY_HEADS);

export const isHEAD = (element, isEnemy) => (isEnemy ? ENEMY_HEADS : HEADS).includes(element);
export const isHEAD_ALL = (element) =>  [...ENEMY_HEADS, ...HEADS].includes(element);

export const isHEAD_FLY = (element, isEnemy) => element === (isEnemy ? ELEMENT.ENEMY_HEAD_FLY: ELEMENT.HEAD_FLY);
export const isHEAD_FLY_ALL = (element) => [ELEMENT.ENEMY_HEAD_FLY, ELEMENT.HEAD_FLY].includes(element);

export const isHEAD_FURY = (element, isEnemy) => element === (isEnemy ? ELEMENT.ENEMY_HEAD_EVIL: ELEMENT.HEAD_EVIL);
export const isHEAD_FURY_ALL = (element) => [ELEMENT.ENEMY_HEAD_EVIL, ELEMENT.HEAD_EVIL].includes(element);

export const isHEAD_DEAD = (element, isEnemy) => element === (isEnemy ? ELEMENT.ENEMY_HEAD_DEAD: ELEMENT.HEAD_DEAD);
export const isHEAD_DEAD_ALL = (element) => [ELEMENT.ENEMY_HEAD_DEAD, ELEMENT.HEAD_DEAD].includes(element);

export const isHEAD_SLEEP = (element, isEnemy) => element === (isEnemy ? ELEMENT.ENEMY_HEAD_SLEEP: ELEMENT.HEAD_SLEEP);
export const isHEAD_SLEEP_ALL = (element) => [ELEMENT.ENEMY_HEAD_SLEEP, ELEMENT.HEAD_SLEEP].includes(element);

export const isBODY = (element, isEnemy) => (isEnemy ? ENEMY_BODYS : BODYS).includes(element);
export const isTAIL = (element, isEnemy) => (isEnemy ? ENEMY_TAILS : TAILS).includes(element);
export const isSNAKE_All = (element) => ALL_SNAKES.includes(element);

export const getSnakeFromHead = (board, isEnemy, headPosition) => {
    const head = getElementByXY(board, headPosition);
    const isHead = isHEAD(head, isEnemy);

    if (!isHead) {
        console.error('check !!!');
        console.error(head, isEnemy);
        //throw Error('wrong input');
    }

    let orientation = getHeadOrientation(head, isEnemy);

    let result;
    try{
        const limit = getAllPositionOf(board, isEnemy? ENEMY_SNAKES: SNAKES).length + 3;
        result = _getSnake([headPosition], orientation, limit);
    } catch (exc){
        console.error('check !!!');
        console.log(exc, board, isEnemy, headPosition);
        return [headPosition];
    }

    if(result.length > 1){
        console.error('check !!!');
        console.log(board, isEnemy, headPosition);
        console.log('result', result);


        result.forEach(r=>{
            console.log(
                r.map(p=> getElementByXY(board,p)).join('.') 
            );
        })

    }
    return result[0];


    function _getSnake(heads, orientation, limit){

        // if(eq(orientation, ORIENTATION.UNKNOW)){
        //     console.log(`_getSnake[${limit}]:${heads.length}:`, heads.map(p=>getElementByXY(board,p)));
        // }
        
        let prevPosition = heads[heads.length-1];

        const orientations = eq(orientation, ORIENTATION.UNKNOW)? ORIENTATIONS: [orientation];
        const solutions = [];

        if(limit-- <= 0){
            return [];
        }

        for(const orient of orientations){
            const position = remove(prevPosition, orient);
            const element = getElementByXY(board, position);
            const isSnake = isSNAKE_All(element);
            const isBody = isBODY(element, isEnemy);
            const isTail = isTAIL(element, isEnemy);
            //console.log(position, element, isSnake, isBody, isTail);


            let isBreak = false;
            for(let i = 0; i< heads.length; i++){
                if(eq(position, heads[i])){
                    isBreak = true;
                }
            }

            if(isBreak){
                continue;
            }

            if(!isSnake){
                continue;
            }
        
            if(isBody){
                const tailOrientation = getBodyOrientationByHead(element, isEnemy, orient);
                if(eq(ORIENTATION.UNKNOW, tailOrientation[1])){
                    continue;
                }
                solutions.push(
                    ..._getSnake([...heads, position], tailOrientation[1], limit)
                );
            } else if(isTail){
                const tailOrientation = getTailOrientation(element, isEnemy);
                //console.log('orientation:', orient, tailOrientation);
                if(!eq(orient, tailOrientation) && !eq(ORIENTATION.UNKNOW, tailOrientation) ){
                    //continue;
                    solutions.push(
                        ..._getSnake([...heads, position], ORIENTATION.UNKNOW, limit)
                    );
                } else {
                    solutions.push([...heads, position]);
                }
            } else {
                solutions.push(
                    ..._getSnake([...heads, position], ORIENTATION.UNKNOW, limit)
                );
            }
        }
        if(!solutions.length){
            const element = getElementByXY(board, prevPosition);
            const isHead = isHEAD_ALL(element);

            if(isHead){
                solutions.push(heads);
            }
        }

        return solutions;
    }
}