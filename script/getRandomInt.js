function getRandomInt(min, max) {
    // 确保min小于max
    min = Math.ceil(min);
    max = Math.floor(max);
    // 生成一个min和max之间的随机数，包含min和max
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }