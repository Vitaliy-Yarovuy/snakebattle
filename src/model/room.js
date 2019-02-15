
import { Snapshot } from './snapshot';
import { Snake } from './snake';


const snapshots = [];
// let prevEnemySnakes = new Map();
// let prevSnake = null;
// let prevBoard = null;


export const state = {
    snake: null,
    board: null,
    enemySnakes: new Map(),
    tick: 0,
};

export function getActiveEnemySnakes(){
    return Array.from(state.enemySnakes.values())
        .filter(snake=>snake)
        .filter(snake=>!snake.flags.isSleep);
} 


export function tick(board) {
    const prevSnake = state.snake;
    const prevEnemySnakes = state.enemySnakes;
    const prevBoard = state.board;

    const snapshot = Snapshot.build(board);


    //todo get orientation
    const orientation = prevSnake && prevSnake.orientation;
    const predictSnake = prevSnake && prevSnake.predictNextSnake(orientation, board);

    const snake = snapshot.snake || predictSnake;

    const enemySnakes = Snake.makePair(prevEnemySnakes, snapshot.enemySnakes);

    snake.populate(prevSnake, prevBoard);
    for (let [key, snake] of enemySnakes) {
        snake && snake.populate(prevEnemySnakes.get(key), prevBoard);
    }


    if(snake.flags.isSleep){
        state.tick = 0;
    } else {
        state.tick++;
    }

    console.log('snake', snake.flags, snake.counters);

    //save for next tick
    snapshots.push(snapshot);
    state.snake = snake;
    state.board = board;
    state.enemySnakes = enemySnakes;
}
