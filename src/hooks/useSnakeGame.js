import { useCallback, useEffect, useState } from 'react';
import {
    defaultInterval,
    defaultDifficulty,
    Delta,
    Difficulty,
    Direction,
    DirectionKeyCodeMap,
    GameStatus,
    OppositeDirection,
    initialPosition,
    initialValues
} from '../constants/index'
import { 
    initFields, 
    isCollision,
    isEatingMyself,
    getFoodPosition
} from '../utils/index';

let timer = null;

const unsubscribe = () => {
    if(!timer){
        return
    }
    clearInterval(timer)
}


const useSnakeGame = () => {
    const [fields, setFields] = useState(initialValues);
    // const [position, setPosition] = useState();
    const[body, setBody] = useState([]);
    const [status, setStatus] = useState(GameStatus.init);
    const [direction, setDirection] = useState(Direction.up); //進行方向
    const [difficulty, setDifficulty] = useState(defaultDifficulty);
    const [tick, setTick] = useState(0);　//時計の針

    useEffect(() => {
        setBody([initialPosition])
        // setBody(new Array(15).fill('').map((_item, index) => ({ x: 17, y: 17 + index })),) //検証用
    
        //ゲームの中の時間を管理する
        const interval = Difficulty[difficulty - 1]; //難易度変更によりtickが変わる
        timer = setInterval(() => {
            setTick( tick => tick + 1)
        }, interval)
        return unsubscribe
    }, [difficulty])
    
    useEffect(() => {
        if(body.length === 0 || status !== GameStatus.playing) { //ゲームがプレイ中でない限りスネークが動かないようにしたい
            return
        }
        const canContinue = handleMoving();
        if(!canContinue) {
            setStatus(GameStatus.gameover)
        }
    }, [tick]) //ゲームの中の時間が進む度にgoUp関数が呼ばれるようにするため
    
    const onStart = () => setStatus(GameStatus.playing) //スタートボタンを押したら、スネークが動き出すようにしたい
    
    const onStop = () => setStatus(GameStatus.suspended) //一時停止
    
      //gameoverした後の関数
    const onRestart = () => {
        timer = setInterval(() => {
            setTick(tick => tick + 1)
        }, defaultInterval)
        setDirection(Direction.up)
        setStatus(GameStatus.init)
        setBody([initialPosition])
        setFields(initFields(35, initialPosition))
    };
    
    const onChangeDirection = useCallback((newDirection) => { //useCallback([コールバック], [依存変数の配列]);
        if (status !== GameStatus.playing) {
            return direction
        }
        if (OppositeDirection[direction] === newDirection) {
            return
        }
        setDirection(newDirection)
    }, [direction, status]);
    
    const onChangeDifficulty = useCallback((difficulty) => {
        if (status !== GameStatus.init) {
            return
        }
        if (difficulty < 1 || difficulty > Difficulty.length) {
            return
        }
        setDifficulty(difficulty)
    }, [status, difficulty])
    
    useEffect(() => {
        const handleKeyDown = (e) => {
            const newDirection = DirectionKeyCodeMap[e.keyCode];
            if (!newDirection) {
                return;
            }
            onChangeDirection(newDirection);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown)
    }, [onChangeDirection])
        
    
    const handleMoving = () => {
        const { x, y } = body[0];
        // const nextY = Math.max(y -1, 0);　//まっすぐ上に移動させるための座標移動
        // const newPosition = { x, y: y -1};
        const delta = Delta[direction];
        const newPosition = {
            x: x + delta.x,
            y: y + delta.y
        }
    
        //gameover
        if(isCollision(fields.length, newPosition) || isEatingMyself(fields, newPosition)) { 
            unsubscribe()
            return false
        }
    
        // fields[y][x] = '' //元いた位置を空に
        const newBody = [...body]
        if (fields[newPosition.y][newPosition.x] !== 'food') { //エサを食べていないときの処理
            const removingTrack = newBody.pop(); //pop（末尾の配列を取り出して削除）
            fields[removingTrack.y][removingTrack.x] = ''
        } else {
            const food = getFoodPosition(fields.length, [...newBody, newPosition])
            fields[food.y][food.x] = 'food'
        }
    
        // fields[nextY][x] = 'snake'　//新たな位置にsnakeを
        // setPosition({ x, y: nextY})
        // fields[newPosition.y][x] = 'snake'
        fields[newPosition.y][newPosition.x] = 'snake'
        // setBody([newPosition])
        newBody.unshift(newPosition) //unshift（配列の先頭に要素を追加）
    
        setBody(newBody)
        setFields(fields)
        return true
    }
    
      // console.log('direction', direction)
    
    return {
        body,
        difficulty,
        fields,
        status,
        onStart,
        onStop,
        onRestart,
        onChangeDirection,
        onChangeDifficulty,
    };
};

export default useSnakeGame;

