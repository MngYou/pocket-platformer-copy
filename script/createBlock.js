var createBlock = function(data){
    center_map_girls = [];
    let GirdSize = data.GirdSize || 32;
    let textureData = data.textureData;
    let parent = data.parent;

    let center_map_girls_r = textureData[0].length;
    let center_map_girls_l = textureData.length;
    let center_map_girls_size = GirdSize;

    //console.log(textureData);
    textureData = transpose(textureData);
    //console.log(textureData);
    
    
    for (let i = 0; i < center_map_girls_l; i++) {
        center_map_girls.push([]);
        for (let j = 0; j < center_map_girls_r; j++) {
            center_map_girls[i][j] = createDiv(i*center_map_girls_size,j*center_map_girls_size,center_map_girls_size,center_map_girls_size,parent);
            //center_map_girls[i][j].style.border = '1px solid gray';
            center_map_girls[i][j].style.backgroundColor = 'black';
            center_map_girls[i][j].style.backgroundColor = getColor(textureData[i][j]);
            center_map_girls[i][j].value = textureData[i][j];
            //@显示颜色代码
            //center_map_girls[i][j].innerText = center_map_girls[i][j].value;
            center_map_girls[i][j].style.fontSize = '5px';

/*             let descriptionUI = {};
            center_map_girls[i][j].onmouseover = function(){
                //@画板瓷砖描述语区域
                descriptionUI = createDiv(0,0,getW(container),30,container);
                descriptionUI.style.left = 0;
                setY(descriptionUI,getH(container) - getH(descriptionUI)-10);
                descriptionUI.style.zIndex = 99;
                
                // 遍历itemData对象的每个属性
                for (let key in itemData) {
                    if (itemData.hasOwnProperty(key)) { // 确保我们只处理对象自身的属性，而不是原型链上的属性
                        const items = itemData[key].item; // 获取当前属性下的item对象
                        if(typeof(items[parent.itemName])!=='undefined'){
                            if(items[parent.itemName]['description']){
                                setText(descriptionUI,{text:`description:${items[parent.itemName]['description']}`,align:'left',lineHeight:50});
                            }
                        };
                    }
                }
            }
            center_map_girls[i][j].onmouseout = function(){
                descriptionUI.parentNode.removeChild(descriptionUI);
            } */
            
        }
    }
}

var changeBlock = function(data){
    let textureData = data.textureData;
    textureData = transpose(textureData);                       //二维数组行列置换
    let twoDimensionalArray = textureData;
    let oneDimensionalArray = twoDimensionalArray.flat();       //二维数组转一维数组
    let parent = data.parent;
    let result = oneDimensionalArray.join('');                  //一维数组合并成字符串
    for (let i = 0; i < parent.children.length; i++) {          //填充颜色
        parent.children[i].style.backgroundColor = 'black';
        parent.children[i].style.backgroundColor = getColor(result[i]);
        parent.children[i].value = result[i];
    }
    ////////////------------上面是瓷砖方块的更新------------
}
var changeBlock2Array = function(data){                         //二维瓷砖更新
    let parent = data.parent;
    let textureData = data.textureData;
    textureData = transpose(textureData);                       //二维数组行列置换
    textureData = transpose(textureData);                    
    //let twoDimensionalArray = textureData;
    //let oneDimensionalArray = twoDimensionalArray.flat();       //二维数组转一维数组
    //let result = oneDimensionalArray.join('');                  //一维数组合并成字符串
    console.log(textureData);
    for (let i = 0; i < parent.children.length; i++) {
        for (let j = 0; j < parent.children[0].length; j++) {
            console.log(textureData[i][j]);
            parent.children[i][j].style.backgroundColor = 'black';
            parent.children[i][j].style.backgroundColor = getColor(textureData[i][j]);
            //parent.children[i][j].value = textureData[i][j];
        }
        
    }
    ////////////------------上面是瓷砖方块的更新------------
}


var createDrawBlock = function(data){                                                           //创建画板
    let draw_brush = false;             //画笔刷子开关
    let eraser = false;                 //橡皮擦开关【右键开启】
    draw_64_blocks = center_map_girls = [];
    let GirdSize = data.GirdSize || 32;
    let textureData = data.textureData;
    let parent = data.parent;
 
    let center_map_girls_r = textureData[0].length;
    let center_map_girls_l = textureData.length;
    let center_map_girls_size = GirdSize;

    textureData = transpose(textureData);
    
    for (let i = 0; i < center_map_girls_l; i++) {
        center_map_girls.push([]);
        for (let j = 0; j < center_map_girls_r; j++) {
            center_map_girls[i][j] = createDiv(i*center_map_girls_size,j*center_map_girls_size,center_map_girls_size,center_map_girls_size,parent);
            center_map_girls[i][j].style.backgroundColor = 'black';
            center_map_girls[i][j].style.backgroundColor = getColor(textureData[i][j]);
            center_map_girls[i][j].value = textureData[i][j];
            setBorder(center_map_girls[i][j],'1px solid dimgray');
            //center_map_girls[i][j].innerText = center_map_girls[i][j].value;          //显示颜色代码
            //center_map_girls[i][j].style.color = getColor(textureData[i][j]);         //使字体透明
            center_map_girls[i][j].onclick = function(){
                //console.log(getTiled);
                if(colorPalette_take==-1){
                    let tempData = [];
                    for (let k = 0; k < parent.children.length; k++) {
                        tempData.push(parent.children[k].value);            //搜索value排查问题
                    }
                    //console.log(tempData);
                    let oneDimensionalArray = tempData;
                    let columnsCount = 8;
                    let twoDimensionalArray = [];
                    for (let i = 0; i < oneDimensionalArray.length; i += columnsCount) {
                    twoDimensionalArray.push(oneDimensionalArray.slice(i, i + columnsCount));
                    }
                    //console.log(twoDimensionalArray);
                    tempData = transpose(twoDimensionalArray);
                    //console.log(tempData);
    
                    // 使用map方法遍历二维数组的每个子数组
                    const newArray = tempData.map(subArray => {
                        // 使用join方法将子数组的元素连接成一个字符串
                        return subArray.join('');
                    });
                    //console.log(newArray);
                    let result = newArray.join(',');
                    //console.log(result);
                    textureData = result.split(',');
                    changeBlock({parent:getTiled,textureData:textureData});
    
                    //@处理itemData数据
                    //console.log(itemData);                                                  //编辑瓷砖块颜色
                    
                    // 遍历itemData对象的每个属性
                    for (let key in itemData) {
                      if (itemData.hasOwnProperty(key)) { // 确保我们只处理对象自身的属性，而不是原型链上的属性
                        const items = itemData[key].item; // 获取当前属性下的item对象
                        //console.log(key);                                           //123
                        if(typeof(items[parent.itemName])!=='undefined'){
                            //console.log(items[parent.itemName]['pixel']);
                            items[parent.itemName]['pixel'].data[getAnimationFrameIndex] = result;       //序列帧0     //更新itemData数据             
                                getTiled.click();//模拟点击当前瓷砖达到更新瓷砖纹理的目的
                                if(getAnimationFrameIndex==1){                          //如果当前在编辑动画关键帧的第二帧则需要更新第二帧瓷砖的画板块
                                    ani_blocks_group[getAnimationFrameIndex].click();
                                }
                            
                        };
                      }
                    }
                }
                if(colorPalette_take==-1&&!eraser){
                    return false;
                }
                if(eraser){
                    this.value = '.';
                    setBgColor(this,'black');
                }else{
                    this.value = colorPalette_take;
                    //this.innerText = this.value;                                          //显示颜色代码
                    setBgColor(this,getColor(this.value));
                }
                let tempData = [];
                for (let k = 0; k < parent.children.length; k++) {
                    tempData.push(parent.children[k].value);            //搜索value排查问题
                }
                //console.log(tempData);
                let oneDimensionalArray = tempData;
                let columnsCount = 8;
                let twoDimensionalArray = [];
                for (let i = 0; i < oneDimensionalArray.length; i += columnsCount) {
                twoDimensionalArray.push(oneDimensionalArray.slice(i, i + columnsCount));
                }
                //console.log(twoDimensionalArray);
                tempData = transpose(twoDimensionalArray);
                //console.log(tempData);

                // 使用map方法遍历二维数组的每个子数组
                const newArray = tempData.map(subArray => {
                    // 使用join方法将子数组的元素连接成一个字符串
                    return subArray.join('');
                });
                //console.log(newArray);
                let result = newArray.join(',');
                //console.log(result);
                textureData = result.split(',');
                changeBlock({parent:getTiled,textureData:textureData});

                //@处理itemData数据
                //console.log(itemData);                                                  //编辑瓷砖块颜色
                
                // 遍历itemData对象的每个属性
                for (let key in itemData) {
                  if (itemData.hasOwnProperty(key)) { // 确保我们只处理对象自身的属性，而不是原型链上的属性
                    const items = itemData[key].item; // 获取当前属性下的item对象
                    //console.log(key);                                           //123
                    if(typeof(items[parent.itemName])!=='undefined'){
                        //console.log(items[parent.itemName]['pixel']);
                        items[parent.itemName]['pixel'].data[getAnimationFrameIndex] = result;       //序列帧0     //更新itemData数据             
                            getTiled.click();//模拟点击当前瓷砖达到更新瓷砖纹理的目的
                            if(getAnimationFrameIndex==1){                          //如果当前在编辑动画关键帧的第二帧则需要更新第二帧瓷砖的画板块
                                ani_blocks_group[getAnimationFrameIndex].click();
                            }
                        
                    };
                  }
                }

            }


            center_map_girls[i][j].onmousedown = function(e){
                //console.log('mouesedown');
                if(e.button==0){eraser=false};
                if(e.button==2){eraser=true};
                draw_brush = true;
                this.click();
            }
            center_map_girls[i][j].onmouseover = function(){
                if(draw_brush){
                    this.click();
                }
            }
            center_map_girls[i][j].onmouseup = function(e){
                //console.log('mouseup');
                if(e.button!==2){eraser=false};
                draw_brush = false;
                this.click();
            }
        }
    }
}

let _i = 0;

var changeDrawBlock = function(data){  
    //if(getAnimationFrameIndex==1){return false;}
    let parent = data.parent;
    let target = data.target;
    let draw_blocks = [];
    draw_blocks = parent.children;
    for (let i = 0; i < draw_blocks.length; i++) {
        let color = getColor(target.children[i].value);
        setBgColor(draw_blocks[i],'black');
        setBgColor(draw_blocks[i],color);
        draw_blocks[i].value = target.children[i].value;
        //draw_blocks[i].innerText = draw_blocks[i].value;                  //显示颜色代码
        draw_blocks[i].style.color = color;                               //使字体透明
    }
}


var createPreviewImageBlock = function(parent,data){
    
    let textureData = data.split(',');
    let center_map_girls = [];
    let GirdSize = getW(parent)/8||32/8;
    let center_map_girls_r = textureData[0].length;
    let center_map_girls_l = textureData.length;
    let center_map_girls_size = GirdSize;

    textureData = transpose(textureData);

    for (let i = 0; i < center_map_girls_l; i++) {
        center_map_girls.push([]);
        for (let j = 0; j < center_map_girls_r; j++) {
            center_map_girls[i][j] = createDiv(i*center_map_girls_size,j*center_map_girls_size,center_map_girls_size,center_map_girls_size,parent);
            center_map_girls[i][j].style.backgroundColor = 'black';
            center_map_girls[i][j].style.backgroundColor = getColor(textureData[i][j]);
        }
    }
}


var changeEditorGirds = function(){                                 //游戏编辑区更新瓷砖
    // 遍历itemData对象的每个属性
    for (let key in itemData) {
        if (itemData.hasOwnProperty(key)) {
            const items = itemData[key].item;
            for (let key2 in items) {
                for (let layer_index = 0; layer_index < level_editor_layer_key.length; layer_index++) {
                    for (let n = 0; n < level_editor[level_editor_layer_key[layer_index]].length; n++) {
                        let editor_girds = level_editor[level_editor_layer_key[layer_index]][n];
                        for (let i = 0; i < editor_girds.length; i++) {
                            for (let j = 0; j < editor_girds[0].length; j++) {
                                if(editor_girds[i][j].itemName==key2){
                                    let textureStr = items[key2]['pixel']['data'][0];
                                    let textureDataArry = textureStr.split(',');
                                    //changeBlock({textureData:textureDataArry,parent:editor_girds[i][j].children[0]});//正常克隆后的更新
                                    changeBlock({textureData:textureDataArry,parent:editor_girds[i][j]});//优化克隆后的更新
                                }
                            }
                            
                        }
                    }
                }
            }
        }
    }
}