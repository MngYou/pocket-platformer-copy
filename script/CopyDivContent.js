// /**
//  * 复制一个div的内容到另一个div
//  * @param {string} sourceId - 源div的ID
//  * @param {string} targetId - 目标div的ID
//  */
// function copyDivContent(sourceDiv, targetDiv) {
  
//   // 检查源div和目标div是否存在
//   if (!sourceDiv || !targetDiv) {
//     console.error('源div或目标div未找到，请检查ID是否正确。');
//     return;
//   }


//   // 使用cloneNode方法复制源div的内容，包括子节点
//   const clonedContent = sourceDiv.cloneNode(true);
//   clonedContent.style.left = '0px';
//   clonedContent.style.top = '0px';
//   clonedContent.style.width = 27+'px';
//   clonedContent.style.height = targetDiv.style.height;
  
//   // 清空目标div的内容
//   targetDiv.innerHTML = '';


//   console.log(clonedContent);

//   // 将复制的内容添加到目标div中
//   targetDiv.appendChild(clonedContent);

//   // 如果需要，可以在这里处理额外的逻辑，例如复制事件监听器等
// }
//////////////////////////////////////////////////////////////////////上面是克隆的方法，但是在项目中会导出复制一个父级容器，需要处理下
/**
 * 复制一个div的内容到另一个div
 * @param {string} sourceId - 源div的ID
 * @param {string} targetId - 目标div的ID
 */
function copyDivContent(sourceDiv, targetDiv) {
  
  // 检查源div和目标div是否存在
  if (!sourceDiv || !targetDiv) {
    console.error('源div或目标div未找到，请检查ID是否正确。');
    return;
  }


  // 使用cloneNode方法复制源div的内容，包括子节点
  const clonedContent = sourceDiv.cloneNode(true);
  clonedContent.style.left = '0px';
  clonedContent.style.top = '0px';
  clonedContent.style.width = 27+'px';
  clonedContent.style.height = targetDiv.style.height;
  
  // 清空目标div的内容
  targetDiv.innerHTML = '';
  
  // 假设你已经通过某种方式获取到了外部的div元素
  // 例如，通过id选择器：document.getElementById('outerDiv')
  var outerDiv = clonedContent; // 选择你想要移除的外部div

  // 检查这个div是否有子元素
  if (outerDiv.hasChildNodes()) {
    // 存储所有子元素
    var childDivs = Array.from(outerDiv.childNodes);
    targetDiv.style.pointerEvents = 'auto';

    // 遍历所有子元素，并将它们插入到外部div的父元素中
    childDivs.forEach(function(childDiv) {
      // 将子元素插入到外部div的父元素中
      //outerDiv.parentNode.insertBefore(childDiv, outerDiv);
      // 将复制的内容添加到目标div中
      childDiv.style.pointerEvents = 'none';
      targetDiv.appendChild(childDiv);
    });

    // 最后，移除外部div
    //outerDiv.parentNode.removeChild(outerDiv);
  }


  // 如果需要，可以在这里处理额外的逻辑，例如复制事件监听器等
}
  
  // 使用示例
  // 假设你的HTML中有如下两个div：
  // <div id="source">源内容</div>
  // <div id="target"></div>
  
  // 调用函数复制内容
  //copyDivContent('source', 'target');