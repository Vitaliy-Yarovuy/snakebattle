import _ from 'lodash';
import {
    sprintf
} from 'sprintf-js';

const _prefix = '__game@';
const _delimiter = '-';
const _flagDelimiter = '|';
const _dataFlagSize = 15;
const _dataFlagRowCount = 3;


let _frame = null, _data = { tick: 0 }, _tick = 0;


let _gameCount = Math.max(-1,
    ...getStorageKeys()
        .map(
            key => parseInt(key.split(_prefix)[1])
        )
) + 1;
let _gameStartTime = new Date();

function getStorageKeys() {
    return _
        .range(localStorage.length)
        .map(i => localStorage.key(i))
        .filter(key => key.indexOf(_prefix) === 0);
}

const toTime = (d) => `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
const getGameKey = () => _prefix + _gameCount + '__' + toTime(_gameStartTime);



function saveTick() {
    let row = _frame + '\n';
    row += getPrintedData();
    row += _delimiter.repeat(_dataFlagSize * _dataFlagRowCount) + '\n';

    if (!localStorage[getGameKey()]) {
        localStorage[getGameKey()] = '';
    }

    localStorage[getGameKey()] += row
}

export function getPrintedData() {
    return _.chunk(
        Object.keys(_data)
            .map(key => `${key}:${_data[key]}`)
            .map(field => _.padEnd(field, _dataFlagSize)),
        _dataFlagRowCount
    ).map(
        fields => fields.join(_flagDelimiter)
    ).join('\n') + '\n';
}


export function nextFrame(frame) {
    _frame = frame;
}

export function getFrame() {
    return _frame;
}

export function nextData(data) {
    _.assign(_data, data);
}

export function getData() {
    return _data;
}


export function nextTick() {
    saveTick();
    _tick++;
    _frame = null;
    _data = { tick: _tick };
}

export function nextGame() {
    const key = getGameKey();
    sendToServer(key, localStorage[key])
        .then((status)=>{
            if(status === 'ok'){
                localStorage.removeItem(key);
            }
        });

    _gameCount++;
    _gameStartTime = new Date();
}


export const pointToLog = p => p && [p.x, p.y];

export function rezetLog() {
    getStorageKeys()
        .map(key => localStorage.removeItem(key));
    _frame = null;
    _data = { tick: 0 };
    _tick = 0;
    _gameCount = 0;
    _gameStartTime = new Date();
}

export function logSize() {
    const size = getStorageKeys()
        .map(key => localStorage[key].length)
        .reduce((acc, length) => acc + length, 0)
        / (1024 ** 2);

    return sprintf('%2.4fMB', size);
}


async function sendToServer(key, data){
    const rawResponse = await fetch(`http://127.0.0.1:3001/${key}`, {
      method: 'POST',
      body: data
    });
    const content = await rawResponse.text();
    return content;
}    


global.__rezetLog = rezetLog;
global.__logSize = logSize;
global.__sendToServer = sendToServer;