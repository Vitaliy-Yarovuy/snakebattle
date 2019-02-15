import { getDiff, getAround, ORIENTATIONS, diffToCommand } from '../model/point';
import { getElementByXY, getAllPositionOf, getBoardSize } from '../utils/utils';
import { getDistanceMatrix, checkWith, getMatrixValue, getPath } from '../utils/boardMath';
import { ELEMENT, COMMANDS, ENEMY_SNAKES, SNAKES } from '../constants';
import * as room from '../model/room';





const getFuriesPosition = (board) => getAllPositionOf(board, [
    ELEMENT.FURY_PILL
]);


export function getNextCommand() {
    const snake = room.state.snake;
    const board = room.state.board;
    const boardSize = getBoardSize(board);
    const enemySnakes = room.getActiveEnemySnakes();
    const furyCount = snake.counters.evil;

    // console.log('FURRY CHECK', snake.flags.isEvil, furyCount, enemySnakes);

    if(!snake.flags.isEvil){
        return '';
    }

    const distaceMatrix = getDistanceMatrix(board, snake.headPosition, checkWith(ENEMY_SNAKES));

    const bestAttack = enemySnakes.map(enemySnake => {
        const snakeSize = enemySnake.size;
        const distancesWithIndex = enemySnake.positions
            .map(p => getMatrixValue(distaceMatrix, boardSize, p).distance)
            .map((distance, index) => {
                const cut = snakeSize - ( index + distance);
                return { distance, index, cut};
            });

        const bestIteam = distancesWithIndex
            .filter(({ distance, index, cut })=> distance <= furyCount && cut > 0)
            .sort((a,b)=> a.cut - b.cut).reverse()[0];

        console.log(enemySnake, distancesWithIndex);

        let point = null;
        let cut = 0;

        if(bestIteam){
            cut = bestIteam.cut;
            point = enemySnake.positions[bestIteam.index];
        }
        return {cut, point};
    }).sort((a,b)=> a.cut - b.cut).reverse()[0];


    if(!bestAttack || bestAttack.cut <= 0){
        return '';
    }
    responsiveVoice.speak("FURRY check success");

    const path = getPath(distaceMatrix, boardSize, bestAttack.point);
    const next = path[1];

    if (!next) {
        return '';
    }

    const diff = getDiff(snake.headPosition, next);
    const command = diffToCommand(diff);

    console.log('FURRY FIGHT');

    return command;
    
}
