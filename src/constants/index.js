import { initFields } from "../utils";

const fieldSize = 35;
export const initialPosition = { x: 17, y: 17 }　//初期位置
export const initialValues = initFields(fieldSize, initialPosition);
export const defaultInterval = 100; //インターバルの長さ
export const defaultDifficulty = 3;

export const Difficulty = [1000, 500, 100, 50, 10];

//ステータスのリストをそれぞれオブジェクトで持つようにする
export const GameStatus = Object.freeze({
    init: 'init',
    playing: 'playing',
    suspended: 'suspended',
    gameover: 'gameover',
});
　
//進行方向の定義
export const Direction = Object.freeze({
    up: 'up',
    right: 'right',
    left: 'left',
    down: 'down'
});

//keyとvalueが逆
export const OppositeDirection = Object.freeze({
    up: 'down',
    right: 'left',
    left: 'right',
    down: 'up'
});

//それぞれの方向における座標の変化量
export const Delta = Object.freeze({
    up: { x: 0, y: -1 },
    right: { x: 1, y: 0 },
    left: { x: -1, y: 0 },
    down: { x: 0, y: 1 },
});

//矢印キーのキーコード
export const DirectionKeyCodeMap = Object.freeze({
    37: Direction.left,
    38: Direction.up,
    39: Direction.right,
    40: Direction.down,
});