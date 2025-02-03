
var ARNE16 = {
    0: '#000',  // 黑色（Black）
    1: '#9D9D9D',  // 浅灰色（Light Grey）
    2: '#FFF',  // 白色（White）
    3: '#BE2633',  // 深红色（Dark Red）
    4: '#E06F8B',  // 浅粉色（Light Pink）
    5: '#493C2B',  // 深棕色（Dark Brown）
    6: '#A46422',  // 暗橙色（Dark Orange）
    7: '#EB8931',  // 浅橙色（Light Orange）
    8: '#F7E26B',  // 浅黄色（Light Yellow）
    9: '#2F484E',  // 深灰色（Dark Grey）
    A: '#44891A',  // 深绿色（Dark Green）
    B: '#A3CE27',  // 亮绿色（Bright Green）
    C: '#1B2632',  // 深蓝色（Dark Blue）
    D: '#005784',  // 深蓝色（Dark Blue）
    E: '#31A2F2',  // 亮蓝色（Bright Blue）
    F: '#B2DCEF'   // 浅蓝色（Light Blue）
};

var getColor = function(target){
    for (let key in ARNE16) {
        if (ARNE16.hasOwnProperty(key)) {
          if(key==target){
            return (ARNE16[key]);
          }
        }
    }
}