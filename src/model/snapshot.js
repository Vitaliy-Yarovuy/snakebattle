import {getHeadPosition, getEnemyHeadsPosition} from '../detectors/snake';
import {Snake} from './snake';

export class Snapshot{
    constructor(board, snake, enemySnakes){
        this.board = board;
        this.snake = snake;
        this.enemySnakes = enemySnakes;
    }

    

    static build(board){
        const headPosition = getHeadPosition(board);
        const snake =  headPosition ? Snake.build(board, false, headPosition): null;

        const enemyHeadsPosition = getEnemyHeadsPosition(board);

        const enemySnakes = enemyHeadsPosition.map(position => Snake.build(board, true, position));

        return new Snapshot(board, snake, enemySnakes);
    }
}