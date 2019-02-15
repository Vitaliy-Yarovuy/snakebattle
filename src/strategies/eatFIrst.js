/*-
 * #%L
 * Codenjoy - it's a dojo-like platform from developers to developers.
 * %%
 * Copyright (C) 2018 - 2019 Codenjoy
 * %%
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 * 
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public
 * License along with this program.  If not, sees
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */
import { ELEMENT, COMMANDS } from '../constants';
import { nextData, pointToLog } from '../utils/logger';
import { getSnakeFromHead } from '../detectors/snake';
import * as room from '../model/room';
import {getDiff, diffToCommand, getAround} from '../model/point';
import {
  isGameOver, getHeadPosition, getElementByXY, getEnemyHeadsPosition, getBoardSize, getAllPositionOf 
} from '../utils/utils';
import {
    getDistanceMatrix,
    getMatrixView,
    getMatrixValue,
    getPath,
    checkWith
  } from '../utils/boardMath';


const prityfyMatrix = (matrix, size) => matrix.split(RegExp(`(.{${size}})`)).filter(x=>x).join('\n')
  
const getGoodsPosition = (board, adds) => getAllPositionOf(board, [
    ELEMENT.APPLE,
    ELEMENT.FLYING_PILL,
    ELEMENT.FURY_PILL,
    ELEMENT.GOLD,
    ...adds
]);

const getActiveBotsPosition = (board) => getAllPositionOf(board, [
    ELEMENT.ENEMY_HEAD_DOWN,
    ELEMENT.ENEMY_HEAD_LEFT,
    ELEMENT.ENEMY_HEAD_UP
]);


const countElements = (list, toCount) => {
    const result = list.filter(element=> toCount.includes(element)).length;
    return result;
};



export function getNextCommand() {
    const snake = room.state.snake; 
    const board = room.state.board;
    const boardSize = getBoardSize(board);
    const isTooLenght = snake.size > 4;

    nextData({isTLen: isTooLenght });
    nextData({SSize: snake.size });


    const addsGoods = snake.flags.isEvil ? [ELEMENT.STONE]: [];

    const goods = getGoodsPosition(board, addsGoods);

    const distanceMatrix =  getDistanceMatrix(board, snake.headPosition, checkWith(addsGoods));
  
    nextData({goodsL: goods.length });


    const K_E = {
        [ELEMENT.GOLD] : .9, 
        [ELEMENT.STONE] : .70, 
        [ELEMENT.FLYING_PILL] : .9, 
        [ELEMENT.FURY_PILL] : .2, 
    }

    const sortedGoods = goods.map( position => {
        const item = getMatrixValue(distanceMatrix, boardSize, position);
        const element = getElementByXY(board, position);
        const k = K_E[element] || 1;
        return {position, distance: item.distance, element: getElementByXY(board, position), k}; 
    })
        .filter(a => a.distance > 0)
        .filter(a => countElements( getAround(a.position).map(p=>getElementByXY(board, p)), [
            ELEMENT.NONE, 
            ELEMENT.APPLE, 
            ELEMENT.FLYING_PILL, 
            ELEMENT.FURY_PILL, 
            ELEMENT.GOLD,

            ELEMENT.HEAD_DOWN,
            ELEMENT.HEAD_LEFT,
            ELEMENT.HEAD_RIGHT,
            ELEMENT.HEAD_UP,
            ELEMENT.HEAD_DEAD,
            ELEMENT.HEAD_EVIL,
            ELEMENT.HEAD_FLY,
            ELEMENT.HEAD_SLEEP,

        ]) > 2 )
        .sort((a,b)=> a.distance * a.k - b.distance * b.k);

    const firstGoods = sortedGoods[0];

    
    while(firstGoods){
        const {position, distance} = firstGoods;

        nextData({
            fGoodsP: pointToLog(position), 
            fGoodsD: distance, 
            fGoodsE: getElementByXY(board, position) 
        });

        // logger(`firstGoods: (${JSON.stringify(position)}| ${distance} | ${getElementByXY(board, position)})\n`);

        const path = getPath(distanceMatrix, boardSize, position);
        const next = path[1];

        console.assert('' + path[0] === '' +snake.headPosition, 'path shod start from head');
        
        if(!next){
            break;
        }
        //const isNextStone = ELEMENT.STONE === getElementByXY(board, next);
        // diffSnakeLenght = isNextStone ? -3 : 0;

        const diff = getDiff(snake.headPosition, next);

        // logger(`snakeLenght: (${snakeLenght})`); 

        nextData({
            path0: pointToLog(path[0]),
            path1: pointToLog(next),
            path2: pointToLog(path[2]),
            diffP: pointToLog(diff),
        })
        // logger(`path[0]: (${JSON.stringify(path[0])})`);  
        // logger(`next: (${JSON.stringify(next)})`);        
        // logger(`path[2]: (${JSON.stringify(path[2])})`);  
        // logger(`diff: (${JSON.stringify(diff)})`);

        const command = diffToCommand(diff);

        nextData({
            command: command
        });

        //logger(`command: (${JSON.stringify(command)})`);

        //logger(`\nmatrix(${size}):\n` +  prityfyMatrix( getMatrixView (distanceMatrix), size*2));
        return command;

    } 

    return '';

}


