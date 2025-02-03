// 定义一个函数，用于创建和添加下拉列表到页面
function createDropdown(targetElement, optionsArray) {
    // 创建<select>元素
    const selectElement = document.createElement('select');
    selectElement.id = 'selectElement';

    // 设置下拉列表的宽度和高度
    selectElement.style.width = '180px';
    selectElement.style.height = '40px';
    selectElement.style.left = '10px';
    selectElement.style.top = '60px';

    // 设置扁平风格的灰色边缘样式
    selectElement.style.border = '1px solid black'; // #ccc 是一种浅灰色
    selectElement.style.backgroundColor = 'white';
    selectElement.style.borderRadius = '4px'; // 添加圆角样式

    // 可以添加一些内边距和外边距来改善视觉效果
    selectElement.style.padding = '0 10px'; // 添加左右内边距
    selectElement.style.margin = '0'; // 移除外边距

    // 为了使下拉列表中的文本居中，可以设置文本对齐样式
    selectElement.style.textAlign = 'left';
    selectElement.style.lineHeight = '40px'; // 使文本垂直居中

    // 如果需要，还可以添加一些过渡效果，使得用户与下拉列表交互时体验更平滑
    selectElement.style.transition = 'border-color 0.3s, background-color 0.3s';

    // 当下拉列表被聚焦时，可以改变边框颜色以提供视觉反馈
    selectElement.addEventListener('focus', function() {
    this.style.borderColor = '#007bff'; // 聚焦时变为深蓝色
    });

    selectElement.addEventListener('blur', function() {
    this.style.borderColor = 'black'; // 失去焦点时恢复为灰色
    });
  
    // 遍历选项数组，为每个选项创建一个<option>元素，并添加到<select>元素中
    optionsArray.forEach(function(option) {
      const optionElement = document.createElement('option');
      optionElement.value = option.value;
      optionElement.textContent = option.text;
      optionElement.style.backgroundColor = 'white';
      selectElement.appendChild(optionElement);
    });
  
    // 为下拉列表添加事件监听器，以便在用户选择不同选项时更新显示结果
    selectElement.addEventListener('change', function() {
      const selectedValue = selectElement.value; // 获取选中的选项的值
      updateSelectedDisplay(selectedValue); // 更新显示结果
    });
  
    // 把<select>元素添加到该容器中
    targetElement.appendChild(selectElement);
  
  }
  
  // 定义一个函数，用于更新选中的选项显示
  function updateSelectedDisplay(selectedValue) {
    //console.log(selectedValue);
    let selectElement = document.getElementById('selectElement');
    let selectedIndex = selectElement.selectedIndex
    let textureData = selectedValue.split(',');
    changeBlock({parent:getTiled,textureData:textureData});

    // 遍历itemData对象的每个属性
    for (let key in itemData) {
        if (itemData.hasOwnProperty(key)) {
            const items = itemData[key].item;
            //console.log(items);
            for (let key2 in items) {
                if(draw_block_container.itemName==key2){
                    items[key2].pixel.data[getAnimationFrameIndex] = allKeyPixel[selectedIndex];//更新数据
                    getTiled.click();
                    if(getAnimationFrameIndex==1){
                        ani_blocks_group[getAnimationFrameIndex].click();
                    }
                }
            }
        }
    }
  }