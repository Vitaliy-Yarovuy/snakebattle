import {
    getSnakeFromHead,
    getHeadPosition
} from './snake';
import {
    ELEMENT
} from '../constants';
import { getBoardSize, getElementByXY } from '../utils/utils';


describe("getSnakeFromHead", () => {

    it("should detect snake correct", ()=> {
        const board =
`☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
☼☼         ○                 ☼
☼#      ×>                   ☼
☼☼  ○    ●         ○         ☼
☼☼  ○                   ○    ☼
☼☼ ○         ●    ○          ☼
☼☼     ☼☼☼☼☼                 ☼
☼☼     ☼                     ☼
☼#     ☼☼☼     ○  ☼☼☼☼#      ☼
☼☼     ☼          ☼   ☼  ●   ☼
☼☼     ☼☼☼☼#      ☼☼☼☼#      ☼
☼☼                ☼          ☼
☼☼○               ☼         $☼
☼☼    ●    ○                 ☼
☼#      ×☺     ○      ○      ☼
☼☼       ╚►  ○               ☼
☼☼        ☼☼☼                ☼
☼☼   ○   ☼  ☼                ☼
☼☼      ☼☼☼☼#     ☼☼   ☼#    ☼
☼☼      ☼   ☼   ● ☼ ☼ ☼ ☼ ○○ ☼
☼#      ☼   ☼     ☼  ☼  ☼    ☼
☼☼                ☼     ☼    ☼
☼☼     ●          ☼     ☼○   ☼
☼☼                           ☼
☼☼                  ○        ☼
☼☼ ○    ○      ●         ○   ☼
☼#      ×>                   ☼
☼☼               ○           ☼
☼☼                           ☼
☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼`.split('\n').join('');

        const headPosition = getHeadPosition(board);
    
        expect(headPosition).toEqual(
            {x: 10, y: 15}
        );

        const snake = getSnakeFromHead(board, false, headPosition);
        
        expect(snake.length).toEqual(3);

    });


    it("should detect correct b", ()=> {
        const board =
`☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
☼☼         ○                 ☼
☼#     ×>                    ☼
☼☼  ○    ●         ○         ☼
☼☼                      ○    ☼
☼☼ ○         ●    ○          ☼
☼☼     ☼☼☼☼☼                 ☼
☼☼     ☼                     ☼
☼#     ☼☼☼     ○  ☼☼☼☼#      ☼
☼☼     ☼          ☼   ☼  ●   ☼
☼☼     ☼☼☼☼#     ×☺☼☼☼#     ×☺
☼☼                ☼          ☼
☼☼○               ☼         $☼
☼☼    ●  ○                   ☼
☼#    ○        ○      ○      ☼
☼☼           ○               ☼
☼☼        ☼☼☼                ☼
☼☼   ○   ☼  ☼                ☼
☼☼      ☼☼☼☼#     ☼☼   ☼#    ☼
☼☼      ☼   ☼   ● ☼ ☼ ☼ ☼    ☼
☼#      ☼   ☼     ☼  ☼  ☼    ☼
☼☼                ☼     ☼ ╓  ☼
☼☼     ●          ☼     ☼ ║  ☼
☼☼                        ▼  ☼
☼☼                  ○        ☼
☼☼ ○    ○      ●         ○   ☼
☼#     ×>                    ☼
☼☼          ○    ○           ☼
☼☼                           ☼
☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼`.split('\n').join('');

        const headPosition = {x: 18, y: 10};
    
        const head = getElementByXY(board, headPosition);
        expect(head).toEqual('☺');

        const snake = getSnakeFromHead(board, true, headPosition);
        
        expect(snake.length).toEqual(2);

    });

    it("should detect correct c", ()=> {
        const board =
`☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
☼☼         ○                 ☼
☼#                           ☼
☼☼  ○    ●         ○         ☼
☼☼                      ○    ☼
☼☼ ○         ●    ○          ☼
☼☼     ☼☼☼☼☼                 ☼
☼☼     ☼                     ☼
☼#     ☼☼☼     ○  ☼☼☼*ø      ☼
☼☼     ☼          ☼   ☼  ●   ☼
☼☼     ☼☼☼~&      ☼☼☼☼#      ☼
☼☼                ☼          ☼
☼☼○               ☼         $☼
☼☼    ●  ○                   ☼
☼#             ○      ○      ☼
☼☼           ○               ☼
☼☼        ☼☼☼                ☼
☼☼   ○   ☼  ☼                ☼
☼☼      ☼☼☼☼#     ☼☼   *ø    ☼
☼☼      ☼   ☼   ● ☼ ☼ ☼ ☼ ○  ☼
☼#      ☼   ☼     ☼  ☼  ☼    ☼
☼☼                ☼     ☼    ☼
☼☼     ●          ☼     ☼    ☼
☼☼                           ☼
☼☼                  ○        ☼
☼☼ ○    ○      ●         ○   ☼
*ø                           ☼
☼☼               ○           ☼
☼☼                           ☼
☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼`.split('\n').join('');

        const headPosition = {x: 11, y: 10};
    
        const head = getElementByXY(board, headPosition);
        expect(head).toEqual('&');

        const snake = getSnakeFromHead(board, false, headPosition);
        
        expect(snake.length).toEqual(2);

    });


    it("should detect correct d", ()=> {
        const board =
`☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
☼☼     ┌♣  ○                 ☼
☼#     │     ©               ☼
☼☼  ○  ¤ ●                   ☼
☼☼                           ☼
☼☼ ○         ●    ○          ☼
☼☼     ☼☼☼☼☼                 ☼
☼☼     ☼◄═══╗                ☼
☼#     ☼☼☼  ║     ☼☼☼☼#      ☼
☼☼     ☼    ╚═╕   ☼   ☼  ●   ☼
☼☼     ☼☼☼☼#  ○   ☼☼☼☼#      ☼
☼☼                ☼   ®      ☼
☼☼                ☼         $☼
☼☼    ●                      ☼
☼#                    ○      ☼
☼☼                           ☼
☼☼        ☼☼☼                ☼
☼☼       ☼  ☼                ☼
☼☼      ☼☼☼☼#     ☼☼   ☼#    ☼
☼☼      ☼   ☼   ● ☼ ☼ ☼ ☼ ○  ☼
☼#      ☼   ☼     ☼  ☼  ☼    ☼
☼☼                ☼   ○ ☼    ☼
☼☼     ●          ☼     ☼    ☼
☼☼                           ☼
☼☼                  ○        ☼
☼☼      ┌>     ●         ○   ☼
☼#   ×──┘                    ☼
☼☼               ○           ☼
☼☼                           ☼
☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼`.split('\n').join('');

        const headPosition = {x: 8, y: 7};
    
        const head = getElementByXY(board, headPosition);
        expect(head).toEqual('◄');

        const snake = getSnakeFromHead(board, false, headPosition);
        
        //console.log(snake.map(p=> getElementByXY(board,p)));

        expect(snake.length).toEqual(9);
       
    });


    it("should detect correct e", ()=> {
        const board =
`☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
☼☼                           ☼
☼#  ©                        ☼
☼☼                           ☼
☼☼                           ☼
☼☼         ○                 ☼
☼☼     ☼☼☼☼☼     ○           ☼
☼☼ ○ ○ ☼                     ☼
☼#     ☼☼☼        ☼☼☼☼#      ☼
☼☼     ☼          ☼   ☼      ☼
☼☼  ○  ☼☼☼☼#  ○   ☼☼☼☼#      ☼
☼☼                ☼          ☼
☼☼            ●   ☼          ☼
☼☼     ○                     ☼
☼#                           ☼
☼☼                     ╘══╗  ☼
☼☼        ☼☼☼             ║  ☼
☼☼       ☼  ☼             ║  ☼
☼☼      ☼☼☼☼#     ☼☼   ☼# ║  ☼
☼☼      ☼●  ☼     ☼ ☼ ☼ ☼ ║  ☼
☼#     ○☼ ○ ☼     ☼  ☼  ☼●╚╗ ☼
☼☼             ○  ☼     ☼●♣▼ ☼
☼☼                ☼     ☼×┘● ☼
☼☼                          ●☼
☼☼                           ☼
☼☼   ○                       ☼
☼#  ○         ○           ●  ☼
☼☼           ○               ☼
☼☼                           ☼
☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼`.split('\n').join('');

        const headPosition = {x: 26, y: 21};
    
        const head = getElementByXY(board, headPosition);
        expect(head).toEqual('♣');

        const snake = getSnakeFromHead(board, true , headPosition);
        
        expect(snake.length).toEqual(3);

    });




    it("should detect correct f", ()=> {
        const board =
`☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
☼☼   ○     ○       ○         ☼
☼#○               ○          ☼
☼☼  ○ ●  ●                   ☼
☼☼                           ☼
☼☼ ○         ●             ╓ ☼
☼☼     ☼☼☼☼☼      ©        ╚╗☼
☼☼     ☼○ ○           ♣┐    ║☼
☼#     ☼☼☼        ☼☼☼☼#│    ║☼
☼☼     ☼          ☼   ☼│ ●  ║☼
☼☼     ☼☼☼☼#      ☼☼☼☼#│    ║☼
☼☼           ●    ☼    └┐   ║☼
☼☼                ☼    ┌┘ ╔═╝☼
☼☼    ●                │  ║  ☼
☼#      ○              │  ║  ☼
☼☼          $          │  ╚═╗☼
☼☼        ☼☼☼          │    ║☼
☼☼       ☼  ☼    ┌─────┘    ║☼
☼☼      ☼☼☼☼#    │☼☼   ☼#   ║☼
☼☼      ☼   ☼   ●│☼ ☼ ☼©☼   ║☼
☼#      ☼   ☼   ┌┘☼○ ☼  ☼ ╔═╝☼
☼☼   ○         ×┘ ☼     ☼ ╚╗ ☼
☼☼     ●          ☼     ☼  ║ ☼
☼☼                         ║ ☼
☼☼                   ○     ║ ☼
☼☼             ●      ▲    ╚╗☼
☼#                    ║     ║☼
☼☼                    ╚═════╝☼
☼☼               ○           ☼
☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼`.split('\n').join('');

        const headPosition = {x: 22, y: 7};

        const head = getElementByXY(board, headPosition);
        expect(head).toEqual('♣');

        const snake = getSnakeFromHead(board, true , headPosition);

        expect(snake.length).toEqual(26);

    });    


    it.only("should detect correct g", ()=> {
        const board = 
`☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼
☼☼                           ☼
☼#                           ☼
☼☼       ●                   ☼
☼☼○   ╔╗            ○        ☼
☼☼    ║╚════╗●               ☼
☼☼    ║☼☼☼☼☼║♥               ☼
☼☼   ○║☼    ║║               ☼
☼#    ║☼☼☼  ║║  ● ☼☼☼☼#      ☼
☼☼ ○  ║☼    ╚╝    ☼   ☼  ●   ☼
☼☼   ˄║☼☼☼☼#      ☼☼☼☼#      ☼
☼☼   │╙           ☼          ☼
☼☼   └─┐          ☼          ☼
☼☼     └ö                    ☼
☼#                           ☼
☼☼                           ☼
☼☼        ☼☼☼                ☼
☼☼       ☼  ☼                ☼
☼☼      ☼☼☼☼#     ☼☼   ☼#    ☼
☼☼      ☼   ☼   ● ☼ ☼ ☼ ☼    ☼
☼#      ☼   ☼     ☼  ☼  ☼    ☼
☼☼                ☼     ☼    ☼
☼☼                ☼     ☼    ☼
☼☼                           ☼
☼☼   ○                   ○ ● ☼
☼☼      ○               ○    ☼
☼#                         ○ ☼
☼☼                        ○○ ☼
☼☼       ○              ○    ☼
☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼☼`.split('\n').join('');

        const headPosition = {x: 13, y: 6};

        const head = getElementByXY(board, headPosition);
        expect(head).toEqual('♥');

        const snake = getSnakeFromHead(board, false , headPosition);

        expect(snake.length).toEqual(23);

    });    

    
});
