function matrixTransform(matrix, transformConfig) {
  const n = matrix.length;
  const operations = {
      clear:(matrix, direction) => {
        for (let i = 0; i < matrix.length; i++) {
          for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = direction;
          }
        }
        return matrix;
      },
      mirror:(matrix, direction) => {
        if (direction === 'Horizontally') {
          // 创建一个新的二维数组，用于存放镜像后的结果
          let mirroredMatrix = matrix.map(row => [...row]);
          // 遍历每一行
          for (let i = 0; i < mirroredMatrix.length; i++) {
            // 反转当前行的元素
            mirroredMatrix[i].reverse();
          }
          return mirroredMatrix;
        } else if (direction === 'Vertically') {
          // 反转整个二维数组
          return matrix.reverse();
        } else {
            throw new Error('Invalid direction. Use "Horizontally" or "Vertically".');
        }
      },
      rotate: (matrix, direction) => {
          let transposedMatrix = matrix.map((row, colIndex) => {
              return row.map((_, rowIndex) => matrix[rowIndex][colIndex]);
          });
          if (direction === 'clockwise') {
              return transposedMatrix.map(row => row.reverse());
          } else if (direction === 'counterclockwise') {
              let rotatedOnce = operations.rotate(matrix, 'clockwise');
              let rotatedTwice = operations.rotate(rotatedOnce, 'clockwise');
              return operations.rotate(rotatedTwice, 'clockwise');
          } else {
              throw new Error('Invalid rotation direction. Use "clockwise" or "counterclockwise".');
          }
      },
      shiftRows: (matrix, direction) => {
          if (direction === 'up') {
              let shiftedMatrix = matrix.slice();
              let firstRow = shiftedMatrix.shift();
              shiftedMatrix.push(firstRow);
              return shiftedMatrix;
          } else if (direction === 'down') {
              let shiftedMatrix = matrix.slice();
              let lastRow = shiftedMatrix.pop();
              shiftedMatrix.unshift(lastRow);
              return shiftedMatrix;
          } else {
              throw new Error('Invalid direction. Use "up" or "down".');
          }
      },
      shiftColumns: (matrix, direction) => {
          if (direction === 'left') {
              return matrix.map(row => {
                  let shiftedRow = row.slice();
                  let firstCol = shiftedRow.shift();
                  shiftedRow.push(firstCol);
                  return shiftedRow;
              });
          } else if (direction === 'right') {
              return matrix.map(row => {
                  let shiftedRow = row.slice();
                  let lastCol = shiftedRow.pop();
                  shiftedRow.unshift(lastCol);
                  return shiftedRow;
              });
          } else {
              throw new Error('Invalid direction. Use "left" or "right".');
          }
      }
  };

  const { operation, direction, times = 1 } = transformConfig;
  if (typeof operations[operation] !== 'function') {
      throw new Error('Invalid operation. Use "clear","mirror","rotate", "shiftRows", or "shiftColumns".');
  }

  let resultMatrix = matrix;
  for (let i = 0; i < times; i++) {
      resultMatrix = operations[operation](resultMatrix, direction);
  }

  return resultMatrix;
}

/* // 使用示例
const originalMatrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

const transformConfigExample = {
  operation: 'rotate',
  direction: 'clockwise',
  times: 1
};

let result = matrixTransform(originalMatrix, transformConfigExample);
console.log(result);
result = matrixTransform(result, transformConfigExample);
console.log(result);
result = matrixTransform(result, transformConfigExample);
console.log(result); */

/* //矩阵变换操作【上下左右平移，顺时针逆时针旋转】
function matrixTransform(matrix, transformConfig) {
    const n = matrix.length;
    const operations = {
      rotate: (matrix, direction) => {
        let transposedMatrix = matrix.map((row, colIndex) => {
          return row.map((_, rowIndex) => matrix[rowIndex][colIndex]);
        });
        if (direction === 'clockwise') {
          return transposedMatrix.map(row => row.reverse());
        } else if (direction === 'counterclockwise') {
          // 逆时针旋转，通过三次顺时针旋转实现
          let rotatedOnce = operations.rotate(matrix, 'clockwise');
          let rotatedTwice = operations.rotate(rotatedOnce, 'clockwise');
          return operations.rotate(rotatedTwice, 'clockwise');
        } else {
          throw new Error('Invalid rotation direction. Use "clockwise" or "counterclockwise".');
        }
      },
      shiftRows: (matrix, direction) => {
        const n = matrix.length; // 假设矩阵大小为n x n
        if (direction === 'up') {
          console.log('right');
          // 复制矩阵，避免直接修改原矩阵
          let shiftedMatrix = matrix.slice();
          // 将第一行移动到最后一行
          let firstRow = shiftedMatrix.shift();
          shiftedMatrix.push(firstRow);
          return shiftedMatrix;
        } else if (direction === 'down') {
          console.log('down');
          // 复制矩阵，避免直接修改原矩阵
          let shiftedMatrix = matrix.slice();
          // 将最后一行移动到第一行
          let lastRow = shiftedMatrix.pop();
          shiftedMatrix.unshift(lastRow);
          return shiftedMatrix;
        } else {
          throw new Error('Invalid direction. Use "up" or "down".');
        }
      },
      shiftColumns: (matrix, direction) => {
        const n = matrix.length; // 假设矩阵大小为n x n
        if (direction === 'left') {
          console.log('left');
          return matrix.map(row => {
            // 复制每一行，避免直接修改原行
            let shiftedRow = row.slice();
            // 将第一列移动到最后一列
            let firstCol = shiftedRow.shift();
            shiftedRow.push(firstCol);
            return shiftedRow;
          });
        } else if (direction === 'right') {
          console.log('right');
          return matrix.map(row => {
            // 复制每一行，避免直接修改原行
            let shiftedRow = row.slice();
            // 将最后一列移动到第一列
            let lastCol = shiftedRow.pop();
            shiftedRow.unshift(lastCol);
            return shiftedRow;
          });
        } else {
          throw new Error('Invalid direction. Use "left" or "right".');
        }
      }
    };
  
    // 根据配置执行操作
    const { operation, direction, times = 1 } = transformConfig;
    if (typeof operations[operation] !== 'function') {
      throw new Error('Invalid operation. Use "rotate", "shiftRows", or "shiftColumns".');
    }
  
    // 重复执行操作指定的次数
    let resultMatrix = matrix;
    for (let i = 0; i < times; i++) {
      resultMatrix = operations[operation](resultMatrix, direction);
    }
  
    return resultMatrix;
  } */
  
/*   // 使用示例
  // 创建一个8x8的二维数组示例
  let matrix = Array.from({ length: 8 }, () => Array(8).fill(0));
  
  // 用一些值初始化矩阵
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      matrix[i][j] = i * 8 + j; // 用坐标值填充矩阵
    }
  }
  
  // 执行变换操作
  let transformConfig = {
    operation: 'rotate',
    direction: 'clockwise',
    times: 1
  };
  let transformedMatrix = matrixTransform(matrix, transformConfig);
  console.log('Transformed matrix:');
  console.log(transformedMatrix);
  transformedMatrix = matrixTransform(transformedMatrix, transformConfig);
  console.log('Transformed matrix:');
  console.log(transformedMatrix);
  transformedMatrix = matrixTransform(transformedMatrix, transformConfig);
  console.log('Transformed matrix:');
  console.log(transformedMatrix); */

/*   // 执行变换操作
  let transformConfig2 = {
    operation: 'rotate',
    direction: 'counterclockwise',
    times: 1
  };
  let transformedMatrix2 = matrixTransform(matrix, transformConfig2);
  console.log('Transformed matrix:');
  console.log(transformedMatrix2); */

/*   // 执行变换操作
  let transformConfig3 = {
    operation: 'shiftRows',
    direction: 'up',
    times: 1
  };
  let transformedMatrix3 = matrixTransform(matrix, transformConfig3);
  console.log('Transformed matrix:');
  console.log(transformedMatrix3); */

/*   // 执行变换操作
  let transformConfig4 = {
    operation: 'shiftRows',
    direction: 'down',
    times: 1
  };
  let transformedMatrix4 = matrixTransform(matrix, transformConfig4);
  console.log('Transformed matrix:');
  console.log(transformedMatrix4);

  // 执行变换操作
  let transformConfig5 = {
    operation: 'shiftColumns',
    direction: 'left',
    times: 1
  };
  let transformedMatrix5 = matrixTransform(matrix, transformConfig5);
  console.log('Transformed matrix:');
  console.log(transformedMatrix5);
  // 执行变换操作
  let transformConfig6 = {
    operation: 'shiftColumns',
    direction: 'right',
    times: 1
  };
  let transformedMatrix6 = matrixTransform(matrix, transformConfig6);
  console.log('Transformed matrix:');
  console.log(transformedMatrix6); */

  

/*   var testBlocks = [];

  for (let i = 0; i < 8; i++) {
    testBlocks.push([]);
    for (let j = 0; j < 8; j++) {
      testBlocks[i][j] = createDiv(i*50,j*50+600,50,50,document.body);
      setBgColor(testBlocks[i][j],'black');
      setColor(testBlocks[i][j],'white');
      setText(testBlocks[i][j],{text:i*8+j,align:'center',lineHeight:50});
      testBlocks[i][j].onclick = function(){
        console.log(this);
      }
    }
  }

  
  // 执行变换操作

  let matrix = testBlocks;

  let transformConfig6 = {
    operation: 'shiftColumns',
    direction: 'right',
    times: 1
  };
  let transformedMatrix6 = matrixTransform(testBlocks, transformConfig6);
  //console.log('Transformed matrix:');
  //console.log(transformedMatrix6);


  //@获取元素在矩阵的索引位置
let indicesMap = transformedMatrix6.map((row, rowIndex) => {
  return row.map((item, colIndex) => {
    let v = item.innerText;
    setPosition(item,50*rowIndex,50*colIndex+600);
    return { rowIndex, colIndex, v};
  });
});
transformedMatrix6 = matrixTransform(transformedMatrix6, transformConfig6);
//console.log('Transformed matrix:');
//console.log(transformedMatrix6);


//@获取元素在矩阵的索引位置
indicesMap = transformedMatrix6.map((row, rowIndex) => {
return row.map((item, colIndex) => {
  let v = item.innerText;
  setPosition(item,50*rowIndex,50*colIndex+600);
  return { rowIndex, colIndex, v};
});
});

//console.log(`所有元素的索引位置：${JSON.stringify(indicesMap)}`); 


transformedMatrix6 = null;
//console.log(transformedMatrix6); */








//@镜像
function mirrorHorizontally(matrix) {
  // 创建一个新的二维数组，用于存放镜像后的结果
  let mirroredMatrix = matrix.map(row => [...row]);

  // 遍历每一行
  for (let i = 0; i < mirroredMatrix.length; i++) {
    // 反转当前行的元素
    mirroredMatrix[i].reverse();
  }

  return mirroredMatrix;
}

/* // 示例
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

let result = mirrorHorizontally(matrix);
console.log(result);
// 输出将会是：
// [
//   [3, 2, 1],
//   [6, 5, 4],
//   [9, 8, 7]
// ] */


function mirrorVertically(matrix) {
  // 反转整个二维数组
  return matrix.reverse();
}

/* // 示例
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
];

let verticalMirror = mirrorVertically(matrix);
console.log(verticalMirror);
// 输出将会是：
// [
//   [7, 8, 9],
//   [4, 5, 6],
//   [1, 2, 3]
// ] */