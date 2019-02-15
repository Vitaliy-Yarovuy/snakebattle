import {
    getEmptyMatrix,
    getMatrixView,
    getDistanceMatrix,
    getPath,
    NOT_FOUD
} from './boardMath';
import {
    ELEMENT
} from '../constants';
import { getBoardSize } from './utils';


describe("boardMath", () => {
    describe("getEmptyMatrix", ()=> {
        it("should create empty matrix", ()=> {
            const matrix = getEmptyMatrix(2);
            expect(matrix).toEqual([NOT_FOUD, NOT_FOUD, NOT_FOUD, NOT_FOUD]);
        });
    });
    describe("getMatrixView", ()=> {
        it("should create matrix of distance", ()=> {
            const view = getMatrixView([NOT_FOUD, NOT_FOUD, NOT_FOUD, NOT_FOUD]);
            expect(view).toEqual(
                '-1-1'+
                '-1-1'
            );
        });
    });
    describe("getDistanceMatrix", ()=> {
        it("should create matrix of distance", ()=> {
            const board =
              '******' +
              '*  ▲ *' +
              '*  ║ *' +
              '*  ║ *' +
              '*    *' +
              '******';


            const matrix = getDistanceMatrix(board, {x:3, y:1});
            const view = getMatrixView(matrix);
            expect(view).toEqual(
                '-1-1-1-1-1-1' +
                '-1 2 1 0 1-1' +
                '-1 3 2-1 2-1' +
                '-1 4 3-1 3-1' +
                '-1 5 4 5 4-1' +
                '-1-1-1-1-1-1'
            );
        });
    });
    describe("getPath", ()=> {
        it("should create matrix of distance", ()=> {
            const board =
              '******' +
              '*  ▲ *' +
              '*  ║ *' +
              '*  ║ *' +
              '*    *' +
              '******';

            const size = getBoardSize(board);
            const matrix = getDistanceMatrix(board, {x:3, y:1});
            const path = getPath(matrix, size, {x: 2, y: 3} );
            expect(path).toEqual(
                [
                    {"x": 3, "y": 1}, 
                    {"x": 2, "y": 1}, 
                    {"x": 2, "y": 2}, 
                    {"x": 2, "y": 3}
                ]
            );
        });
    });



});
