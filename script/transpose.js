
function transpose(matrix) {            //二维数组行列互换
    if((matrix.length)==0){return false;}
    // 获取原始矩阵的行数和列数
    const rows = matrix.length;
    const cols = matrix[0].length;

    // 创建新的二维数组，行列索引互换
    const transposedMatrix = new Array(cols).fill(null).map(() => new Array(rows).fill(null));

    // 遍历原始矩阵并重新分配元素到新矩阵
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
        transposedMatrix[j][i] = matrix[i][j];
        }
    }

    return transposedMatrix;
}