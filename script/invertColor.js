function invertColor(color) {
    // 获取元素的当前颜色值
  
    // 将颜色值从rgb()或rgba()格式转换为整数数组
    var rgb = color.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/).slice(1).map(Number);
  
    // 计算补色
    var invertedRgb = rgb.map(function (value, index) {
      return 255 - value;
    });
  
    // 设置新的前景色
    //element.style.color = 'rgb(' + invertedRgb.join(',') + ')';
    return 'rgb(' + invertedRgb.join(',') + ')';
  }