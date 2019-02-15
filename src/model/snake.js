import { getSnakeFromHead, isHEAD_FLY_ALL, isHEAD_FURY_ALL, isHEAD_DEAD_ALL, isHEAD_SLEEP_ALL, getHeadOrientation } from '../detectors/snake';
import { getElementByXY } from '../utils/utils';
import { getDistance, remove, ORIENTATION } from '../model/point';
import { ELEMENT } from '../constants';
import _ from 'lodash';


const MAX_SAFE_DISTANCE = Number.MAX_SAFE_INTEGER;
const PILL_COUNT = 10;


export class Snake {
    constructor(board, positions, flags) {
        this.board = board;
        this.positions = positions;
        //todo check
        this.orientation = positions[1]? remove(positions[1], positions[0]): ORIENTATION.UNKNOW;
        //this.diffSize = 0;

        this.flags = flags;
        this.counters = {
            stone: 0,
            fly: 0,
            evil: 0,
        };
        this.track = [];
    }

    get size() {
        return this.positions.length;// + this.diffSize;
    }

    get headPosition() {
        return this.positions[0];
    }

    get tailPosition() {
        return this.positions[this.positions.length-1];
    }

    isPrevTick(snake) {
        if (!snake) {
            return MAX_SAFE_DISTANCE;
        }
        const minLength = Math.min(this.size, snake.size);
        let mistake;
        for (let i = 0; i < minLength; i++) {
            const distance = getDistance(this.positions[i], snake.positions[i]);
            mistake += distance - 1;
        }
        return mistake;
    }

    eat(prevBoard) {
        const element = getElementByXY(prevBoard, this.headPosition);
        switch (element) {
            case ELEMENT.STONE:
                this.counters.stone++;
                //this.diffSize = -3;
                break;
            case ELEMENT.FLYING_PILL:
                this.counters.stone += PILL_COUNT;
                break;
            case ELEMENT.FURY_PILL:
                this.counters.evil += PILL_COUNT;
                break;
        }
    }

    checkACT(prevSnake) {
        const element = getElementByXY(this.board, prevSnake.tailPosition);
        if(ELEMENT.STONE === element){
            this.counters.stone--;
        }
    }

    populate(prevSnake, prevBoard) {
        if (prevSnake && this.isPrevTick(prevSnake) === 0) {
            this.counters = Object.assign({}, prevSnake.counters);
            this.checkACT(prevSnake);
        }
        if (prevBoard) {
            this.eat(prevBoard);
        }
    }

    tick() {
        if(this.counters.fly > 0){
            this.counters.fly--;
        } 
        if(this.counters.evil > 0){
            this.counters.evil--;
        } 
    }

    predictNextSnake(orientation, board){
        const newHead = remove(this.headPosition, orientation);
        const positions = [newHead, ...this.positions.slice(0,-1)]

        new Snake(board, positions, this.flags);
    }


    static build(board, isEnemy, headPosition) {
        const positions = getSnakeFromHead(board, isEnemy, headPosition);
        const head = getElementByXY(board, headPosition);

        const flags = {
            isEnemy,
            isFly: isHEAD_FLY_ALL(head),
            isEvil: isHEAD_FURY_ALL(head),
            isDead: isHEAD_DEAD_ALL(head),
            isSleep: isHEAD_SLEEP_ALL(head)
        }

        return new Snake(board, positions, flags);
    }


    static makePair(snakesMap, newSnakesList) {

        const newSnakeMap = new Map();
        const newSnakes = new Set(newSnakesList);
        const snakes = new Map(snakesMap);
        const compareList = [];

        for (let [key, snake] of snakes) {
            for (let newSnake of newSnakes) {
                const mistake = newSnake.isPrevTick(snake);
                if (mistake < 1) {
                    snakes.delete(key);
                    newSnakes.delete(newSnake);
                    newSnakeMap.set(key, newSnake);
                } else {
                    compareList.push({
                        key,
                        snake,
                        newSnake,
                        mistake
                    });
                }
            }
        }

        compareList.sort((a, b) => a.mistake - b.mistake);

        for (let { key, snake, newSnake, mistake } of compareList) {
            if (snakes.has(key) && newSnakes.has(newSnake)) {
                snakes.delete(key);
                newSnakes.delete(newSnake);
                newSnakeMap.set(key,newSnake);
            }
        }

        for (let [key, snake] of snakes) {
            newSnakeMap.set(key,null);
        }

        let nextKey = newSnakeMap.size;

        for (let newSnake of newSnakes) {
            newSnakeMap.set(nextKey++, newSnake);
        }
        return newSnakeMap;
        
    }


}