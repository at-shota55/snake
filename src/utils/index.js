//エサ配置
export const getFoodPosition = (fieldSize, excludes) => {
    while(true) {
        const x = Math.floor(Math.random() * (fieldSize - 1 - 1)) + 1; //1~33
        const y = Math.floor(Math.random() * (fieldSize - 1 - 1)) + 1;
        const conflict = excludes.some((item) => item.x === x && item.y === y) //ランダムに取得した座標が排除リストの中にあるかチェックをしている

        if (!conflict) { //ランダムに表示されるエサがスネークの位置とかぶってしまった場合を排除
            return { x, y };        
        }
    }
}

export const initFields = (fieldSize, snake) => {
    const fields = [] 
    for (let i = 0; i < fieldSize; i++) {
        const cols = new Array(fieldSize).fill('')
        fields.push(cols)
    }
    // fields[initialPosition.y][initialPosition.x] = 'snake' //初期位置
    fields[snake.y][snake.x] = 'snake'
    
    //エサ配置
    const food = getFoodPosition(fieldSize, [snake]);
    fields[food.y][food.x] = 'food'

    return fields // 作成した配列を返却
}

//xかyの値がマイナスでなくフィールドサイズより小さい座標に収まっていない場合はぶつかっていると判断してtrueを返す関数isCollision関数を定義している
export const isCollision = (fieldSize, position) => {
    if (position.y < 0 || position.x < 0) { 
        return true;
    }

if (position.y > fieldSize - 1 || position.x > fieldSize - 1) {
    return true;
    }

    return false;
};

export const isEatingMyself = (fields, position) => {
    return fields[position.y][position.x] === 'snake'
} 