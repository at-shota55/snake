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

    return fields
}