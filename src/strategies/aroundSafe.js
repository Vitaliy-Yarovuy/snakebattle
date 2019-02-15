import {getDiff, getAround, ORIENTATIONS, diffToCommand} from '../model/point';
import { getElementByXY } from '../utils/utils';
import { ELEMENT, COMMANDS, ENEMY_SNAKES, SNAKES } from '../constants';
import * as room from '../model/room';


const getValueOfElement = element =>{
    if ([ELEMENT.WALL, ELEMENT.START_FLOOR].includes(element)){
        return 9999;
    } 

    if (SNAKES.includes(element)){
        return 99
    }

    if (ENEMY_SNAKES.includes(element)){
        return 999
    }
    if ([ELEMENT.STONE].includes(element)){
        return 9;
    }

    if ([ELEMENT.APPLE, ELEMENT.NONE, ELEMENT.FLYING_PILL, ELEMENT.FURY_PILL, ELEMENT.GOLD].includes(element)){
        return 0;
    }

}


export function getNextCommand() {
    const snake = room.state.snake; 
    const board = room.state.board;

    const solutions = getAround(snake.headPosition, snake.orientation).map(position=>{
        const element = getElementByXY(board, position);
        let value = getValueOfElement(element);
        
        return {
            position,
            element,
            value
        };
    }).sort((a,b)=>a.value- b.value);

    const {position} = solutions[0];

    const orientation = getDiff(snake.headPosition,position);

    return diffToCommand(orientation);

}