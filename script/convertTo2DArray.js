function convertTo2DArray(arr, chunkSize) {
    return arr.reduce((result, _, index) => {
      const chunkIndex = Math.floor(index / chunkSize);
      result[chunkIndex] = result[chunkIndex] || [];
      result[chunkIndex].push(arr[index]);
      return result;
    }, []);
  }
  
/*    // 示例
  const oneDimensionalArray = [1, 2, 3, 4, 5, 6];
  const twoDimensionalArray = convertTo2DArray(oneDimensionalArray, 3);
  console.log(twoDimensionalArray); // 输出: [[1, 2, 3], [4, 5, 6]]  */



  //@适用场景：当64个小方块要转换成矩阵时









 /*  function convertTo2DArray(array, { rows, cols }) {
    // 创建一个空的二维数组
    const twoDArray = [];
  
    // 确保一维数组的长度可以被rows和cols整除
    if (array.length !== rows * cols) {
      throw new Error('数组长度不能被行列数整除');
    }
  
    // 遍历一维数组，将其填充到二维数组中
    for (let i = 0; i < rows; i++) {
      // 创建一个新的一维数组作为二维数组的一行
      const row = [];
      for (let j = 0; j < cols; j++) {
        // 计算当前元素在一维数组中的索引
        const index = i * cols + j;
        // 将一维数组中的元素添加到当前行
        row.push(array[index]);
      }
      // 将当前行添加到二维数组中
      twoDArray.push(row);
    }
  
    return twoDArray;
  }
  
  // 示例用法
  const oneDArray = [1, 2, 3, 4, 5, 6];
  const dimensions = { rows: 2, cols: 3 };
  const twoDArray = convertTo2DArray(oneDArray, dimensions);
  console.log(twoDArray); */