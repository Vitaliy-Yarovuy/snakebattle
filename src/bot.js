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
 * License along with this program.  If not, see
 * <http://www.gnu.org/licenses/gpl-3.0.html>.
 * #L%
 */
import { ELEMENT, COMMANDS } from './constants';
import { nextData, pointToLog } from './utils/logger';
import { getSnakeFromHead } from './detectors/snake';
import * as room from './model/room';
import strategies from './strategies/index';
import {
    isGameOver, getHeadPosition, getElementByXY, getEnemyHeadsPosition, getBoardSize, getAllPositionOf
} from './utils/utils';
import {
    getDistanceMatrix,
    getMatrixView,
    getMatrixValue,
    getPath
} from './utils/boardMath';


const prityfyMatrix = (matrix, size) => matrix.split(RegExp(`(.{${size}})`)).filter(x => x).join('\n');


let diffSnakeLenght = 0;

// let timer = 0;
// let timerReload = 0;
// Bot Example
export function getNextSnakeMove(board) {
    if (isGameOver(board)) {
        return '';
    }
    const headPosition = getHeadPosition(board);
    if (!headPosition) {
        return '';
    }

    nextData({ headP: pointToLog(headPosition) });

    const size = getBoardSize(board);

    room.tick(board);


    let command;

    command = strategies.furyFight.getNextCommand();
    if(!command){
        command = strategies.eatFIrst.getNextCommand();
    }
    if(!command){
        command = strategies.aroundSafe.getNextCommand();
    }

    return command;
}


