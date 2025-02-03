/* function resizeArray(originalArray, newRows, newCols) {
    // 创建一个新的二维数组，大小为新行数和新列数
    const newArray = new Array(newRows);
    for (let i = 0; i < newRows; i++) {
      newArray[i] = new Array(newCols);
    }
  
    // 复制原始数组的值到新数组中
    for (let i = 0; i < originalArray.length && i < newRows; i++) {
      for (let j = 0; j < originalArray[i].length && j < newCols; j++) {
        newArray[i][j] = originalArray[i][j];
      }
    }
  
    return newArray;
  }
  
  // 示例使用
  const originalArray = [
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
    // ... 假设这是一个10x10的数组
  ];
  
  const resizedArray = resizeArray(originalArray, 11, 14);
  console.log(resizedArray); */


  function resizeArray(originalArray, newRows, newCols) {
    let Gird_Size = 32;
    //console.log(`width:${newRows},height:${newCols}`);
    // 创建一个新的二维数组，大小为新行数和新列数
    let newArray = [];
    for (let i = 0; i < newRows; i++) {
      newArray.push([]);
      for (let j = 0; j < newCols; j++) {
        let obj = document.createElement('div');
        setPosition(obj,i*Gird_Size,j*Gird_Size);
        setWH(obj,Gird_Size,Gird_Size);
        setBgColor(obj,'black');
        setBorder(obj,'1px solid lightgray');
        newArray[i][j] = obj;
        
      }
      
    }
  
    // 复制原始数组的值到新数组中
    for (let i = 0; i < originalArray.length && i < newRows; i++) {
      for (let j = 0; j < originalArray[i].length && j < newCols; j++) {
        newArray[i][j] = originalArray[i][j];
      }
    }
  
    return newArray;
  }





  
function createDivArray(divArray, sceneIndex,layer_key,parentNode) {
  level_editor[layer_key][sceneIndex-1] = divArray;
  //console.log(level_editor[layer_key][sceneIndex-1]);
  parentNode.innerHTML = ''; // 清空容器

  let editor_girds = [];
  editor_girds = level_editor[layer_key][sceneIndex-1];
  let draw_brush = false;
  let eraser = false;
  for (let i = 0; i < editor_girds.length; i++) {
      for (let j = 0; j < editor_girds[0].length; j++) {
          parentNode.appendChild(editor_girds[i][j]);
          setBgColor(editor_girds[i][j],'black');
          setBorder(editor_girds[i][j],'1px solid lightgray');
          editor_girds[i][j].i = i,editor_girds[i][j].j = j;
          editor_girds[i][j].onclick = function(){
              //console.log(getTiled.itemName);
              if(eraser){
                  this.itemName = '';
                  this.innerHTML = '';
              }
              if(!draw_brush){return false;}
              this.itemName = getTiled.itemName;
              //setBorder(getTiled,'none');
              copyDivContent(getTiled, this);
          }
          editor_girds[i][j].onmousedown = function(e){
              if(e.button==0){
                  draw_brush = true;
              }
              if(e.button==2){
                  eraser = true;
              }
              this.click();
          }
          editor_girds[i][j].onmouseover = function(e){
              this.click();
          }
          editor_girds[i][j].onmouseup = function(e){
              if(e.button==0){
                  draw_brush = false;
              }
              if(e.button==2){
                  eraser = false;
              }
              this.click();
          }

                        //////////////////////////////////////////////////////////////////////////移动端

                        let longPressTimer = null; // 用于长按检测的计时器

                        editor_girds[i][j].addEventListener('touchstart', function(event) {
                            // 清除之前可能存在的计时器
                            clearTimeout(longPressTimer);
                        
                            // 设置长按计时器，例如1秒后认为是长按
                            longPressTimer = setTimeout(function() {
                                // 长按逻辑处理
                                console.log('Long press detected!');
                                eraser = true;
                                draw_brush = false;
                            }, 1000);
                        
                            // 阻止默认滚动行为
                            event.preventDefault();
                            //console.log('touchstart');
                            draw_brush = true;
                        });
                        
                        editor_girds[i][j].addEventListener('touchmove', function(event) {
                            // 如果手指移动，则清除长按计时器
                            clearTimeout(longPressTimer);
                            //console.log('touchmove');
                            //console.log(event.touches[0]);
                            let touchPointX = event.touches[0].pageX;
                            let touchPointY = event.touches[0].pageY;
                            let startPointX = 234 * hScale;
                            let startPointY = 122 * vScale;
                            let Gird_Size =Tile_Size;
                            let endPointX = (234 + Gird_Size * Level_Size_Width) * hScale;
                            let endPointY = (122 + Gird_Size * Level_SIze_Height) * hScale;
                            let ts_w = touchPointX - startPointX;
                            let ts_h = touchPointY - startPointY;
                            let wGird = Gird_Size * hScale;
                            let hGird = Gird_Size * vScale;
                            let xIndex = Math.floor(ts_w/wGird);
                            let yIndex = Math.floor(ts_h/hGird);
                            //console.log(xIndex,yIndex);
                            if (touchPointX > startPointX && touchPointY > startPointY && touchPointX < endPointX && touchPointY < endPointY) {
                              editor_girds[xIndex][yIndex].click();
                            }
                        });
                        
                        editor_girds[i][j].addEventListener('touchend', function(event) {
                            // 如果触摸结束，则清除长按计时器
                            clearTimeout(longPressTimer);
                            //console.log('touchend');
                            eraser = false;
                            draw_brush = false;
                        });
                        ///////////////////////////////////////////////////////////////////////////移动端
          

      }
      
  }


}