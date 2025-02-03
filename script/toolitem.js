var changeDrawBlock_Launcher;
var 创建工具箱元素 = function(){
    let element = document.getElementById('tiles');
    if(element==null){

        let createBlock_Launcher = function(index,pixel,parentNode){
            ////////////////////////////////////////////////////////////////////////////////////////////pixel数据创建div网格系统
            //需要每个子数据全部创建div，不然第一页之后的div都无法正常使用，先创建，再根据每页数量进行对应的排列
            let textureStr = pixel||pixelData[index].data[0];
            let textureDataArry = textureStr.split(',');
            createBlock({textureData:textureDataArry,parent:parentNode,GirdSize:itemImageSize/8});
            ////////////////////////////////////////////////////////////////////////////////////////////
        }
        let changeBlock_Launcher = function(nextIndex,parentNode){
            ////////////////////////////////////////////////////////////////////////////////////////////pixel数据创建div网格系统
            let textureStr = pixelData[nextIndex].data[0];
            let textureDataArry = textureStr.split(',');
            changeBlock({textureData:textureDataArry,parent:parentNode});
            ////////////////////////////////////////////////////////////////////////////////////////////
        }
        let createDrawBlock_Launcher = function(index){
            ////////////////////////////////////////////////////////////////////////////////////////////pixel数据创建div网格系统
            let textureStr = pixelData[index].data[0];
            let textureDataArry = textureStr.split(',');
            createDrawBlock({textureData:textureDataArry,parent:draw_block_container,GirdSize:20});
            ////////////////////////////////////////////////////////////////////////////////////////////
        }
        changeDrawBlock_Launcher = function(target){
            ////////////////////////////////////////////////////////////////////////////////////////////pixel数据创建div网格系统
            changeDrawBlock({parent:draw_block_container,target:target});
            ////////////////////////////////////////////////////////////////////////////////////////////
        }
    
        //@创建工具箱元素
        let itemImageSrc = [];
        pixelData = [];
        itemName = [];
        let jsonData = itemData[`${tabers_index}`].item;
        // 使用for...in循环遍历对象
        for (var key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                itemImageSrc.push(jsonData[key].image);
                pixelData.push(jsonData[key].pixel);
                itemName.push(key);
            }
        }
        
        
        let step = 18,page = 0;                                             
    //重新构思瓷砖区域
    //根据不同的瓷砖集合生成不同的框架  瓷砖 对象 前景    id即itemdata的type
    //根据不同的数量/18 生成 多个框架   第一页 第二页 第三页 etc... id即page+翻页index
    //然后根据翻页置顶层级
    
    
        let itemImageSize = 32;//getW(item_container)/4;
    
    
        
        //@瓷砖容器
        let item_container = createDiv(0,0,150,300,tools_container);
        setBgColor(item_container,'#F8F8F8');
        //item_container.style.borderTop = '1px solid black';
        item_container.style.borderBottom = '1px solid lightgray';
        Center(item_container,tools_container);
        setPosition(item_container,item_container.offsetLeft-10,item_container.offsetTop-40);
    
    /*     //@创建瓷砖
        for (let i = 0; i < step; i++) {
            itemImage[i] = createDiv(100,0,itemImageSize,itemImageSize,item_container);
            itemImage[i].pixelData = pixelData[i];
        }
        let mw = (item_container.offsetWidth - (itemImageFrameArray[0][1][0].offsetWidth*3+20))/2;
        let mh = (item_container.offsetHeight - (itemImageFrameArray[0][1][0].offsetHeight*6+50))/2
        for (let i = 0; i < step; i++) {
            setPosition(itemImage[i],mw + i%3*(itemImageSize+10),mh + Math.floor(i/3)*(itemImageSize+10));
            createBlock_Launcher(i);
            itemImage[i].itemName = itemName[i];
            //@//鼠标点击选择瓷砖
            itemImage[i].onclick = function(){                                      //选中瓷砖
                //console.log(`name:${this.itemName},`,this.pixelData);
                for (let j = 0; j < itemImage.length; j++) {
                    setBorder(itemImage[j],'none');
                    setBorder(this,'2px solid black');
                }
                draw_block_container.itemName = this.itemName;
                changeBlock_Launcher(i,i);
                checkboxUIState(itemImage[i]);
                changeDrawBlock_Launcher(this);
                getTiled = this;                                        //选择瓷砖
                changeAnimationBlock();
                changeEditorGirds();
                
            }
        }
        setBorder(itemImage[0],'2px solid black'); */
    
        // 遍历itemData对象的每个属性
        let tileFrame = {};
        let typeFrame = {};
        let countFrame = {};
        let pixelFrame = {};
        let itemNameFrame = {};
        let itemImageFrame = {};
        for (let key in itemData) {
            if (itemData.hasOwnProperty(key)) {
                const items = itemData[key];
                //console.log(items.type);//在这里创建三个框架 瓷砖 对象 装饰
                //框架
                typeFrame[items.type] = createDiv(0,0,150,400,tools_container);
                typeFrame[items.type].setAttribute('id',items.type);
                setBgColor(typeFrame[items.type],'#F8F8F8');
                typeFrame[items.type].style.borderBottom = '1px solid lightgray';
                Center(typeFrame[items.type],tools_container);
                setPosition(typeFrame[items.type],typeFrame[items.type].offsetLeft-10,typeFrame[items.type].offsetTop-40);

                countFrame[items.type] = [];
                pixelFrame[items.type] = [];
                itemNameFrame[items.type] = [];
                itemImageFrame[items.type] = [];
                for (let key2 in items) {
                    //console.log(items);
                    switch (key2) {
                        case 'type':
                            setText(typeFrame[items.type],{text:items[key2],align:'center',lineHeight:50});
                            break;
                            case 'count':
                                countFrame[items.type].push(items[key2]);
                                break;
                                case 'item':
                                    let tileds = items[key2];
                                    //console.log(tileds);
                                    for (let name in tileds) {
                                        //console.log(tileds[name]);//tileds[name].image .pixel .tip .description
                                        //console.log(tileds[name].pixel);  //分解再下面创建框架
                                        pixelFrame[items.type].push(tileds[name].pixel);
                                        itemNameFrame[items.type].push(name);
                                        itemImageFrame[items.type].push({});
                                    }
                                    break;
                    
                        default:
                            break;
                    }
                    //console.log(items[key2]);
                }
                
                //@瓷砖容器
                tileFrame[items.type] = createDiv(0,40,150,280,typeFrame[items.type]);
                tileFrame[items.type].style.overflowY = 'scroll';
                tileFrame[items.type].classList.add('tiles-scrollbar');
                setBgColor(tileFrame[items.type],'transparent');
            }
            
        }
        //console.log(typeFrame);
        //console.log(countFrame);
        //console.log(pixelFrame);
        //console.log(itemNameFrame);
        //console.log(itemImageFrame);
    
        let type = [
            'tiles','objects','deco'
        ];
    
        typeFrameArray = [];
        for (const key in typeFrame) {
            typeFrameArray.push([key, typeFrame[key]]);
        }
        const tileFrameArray = [];
        for (const key in tileFrame) {
            tileFrameArray.push([key, tileFrame[key]]);
        }
        //console.log(tileFrameArray[0][1]);
        const countFrameArray = [];
        for (const key in countFrame) {
            countFrameArray.push([key, countFrame[key]]);
        }
        const pixelFrameArray = [];
        for (const key in pixelFrame) {
            pixelFrameArray.push([key, pixelFrame[key]]);
        }
        const itemNameFrameArray = [];
        for (const key in itemNameFrame) {
            itemNameFrameArray.push([key, itemNameFrame[key]]);
        }
        const itemImageFrameArray = [];
        for (const key in itemImageFrame) {
            itemImageFrameArray.push([key, itemImageFrame[key]]);
        }
    
        //console.log(typeFrameArray);
        //console.log(countFrameArray);
        //console.log(pixelFrameArray);
        //console.log(itemNameFrameArray);
        //console.log(itemImageFrameArray);
    
    
        for (let i = 0; i < tileFrameArray.length; i++) {
            //console.log(countFrame[type[i]]);
            for (let j = 0; j < countFrameArray[i][1][0]; j++) {
                itemImageFrameArray[i][1][j] = createDiv(100,0,itemImageSize,itemImageSize,tileFrameArray[i][1]);
                itemImageFrameArray[i][1][j].pixelData = pixelFrameArray[i][1][j];
            }
            //console.log(typeFrameArray[i][1]);
            //console.log(countFrameArray[i][1][0]);
            //console.log(pixelFrameArray[i]);
            //console.log(itemNameFrameArray[i]);
            //console.log(itemImageFrameArray[i][1]);
            let mwFrame = (tileFrameArray[i][1].offsetWidth - (itemImageFrameArray[i][1][0].offsetWidth*3+20))/2;
            let mhFrame = (tileFrameArray[i][1].offsetHeight - (itemImageFrameArray[i][1][0].offsetHeight*6+90))/2
            let count = countFrameArray[i][1][0];
            for (let k = 0; k < count; k++) {   //分层架构
                //console.log(itemImageFrameArray[i][1][k].pixelData);
                setPosition(itemImageFrameArray[i][1][k],mwFrame + k%3*(itemImageSize+10),mhFrame + Math.floor(k/3)*(itemImageSize+10));
                createBlock_Launcher(k,itemImageFrameArray[i][1][k].pixelData.data[0],itemImageFrameArray[i][1][k]);
                itemImageFrameArray[i][1][k].itemName = itemNameFrameArray[i][1][k];
                itemImageFrameArray[i][1][k].setAttribute('itemImage',itemNameFrameArray[i][1][k]);
                //@//鼠标点击选择瓷砖
                allTileds.push(itemImageFrameArray[i][1][k]);
                
                itemImageFrameArray[i][1][k].onclick = function(){                                      //选中瓷砖
                    //console.log(`name:${this.itemName},`,this.pixelData);
                    //console.log(this);
                    for (let l = 0; l < itemImageFrameArray.length; l++) {                  //清空框选状态
                        for (let m = 0; m < itemImageFrameArray[l][1].length; m++) {  
                            setBorder(itemImageFrameArray[l][1][m],'none');
                        }
                    }
                    setBorder(this,'2px solid black');                                      //框选选中瓷砖
                    draw_block_container.itemName = this.itemName;
                    changeBlock_Launcher(i,itemImageFrameArray[0][1][0]);
                    checkboxUIState(this);
                    changeDrawBlock_Launcher(this);
                    getTiled = this;                                        //选择瓷砖
                    changeAnimationBlock();
                    changeEditorGirds();
                    draw_block_container.click();

                    ////////////////////////////////////////加载json数据后的瓷砖更新
                    
                    let tempColor = colorPalette_take;
                    colorPalette_take = -1;
                    draw_block_container.children[0].click();
                    colorPalette_take = tempColor;
                    
                }
            }
        }
        setBorder(itemImageFrameArray[0][1][0],'2px solid black');              //第1个框架第一个方块框选
    
        //@创建瓷砖画板
        draw_block_container = createDiv(10,70,160,160,draw_container);
        setBgColor(draw_block_container,'black');
        draw_block_container.itemName = itemImageFrameArray[0][1][0].itemName;
    
    
        getTiled = itemImageFrameArray[0][1][0];                                        //默认选择瓷砖
        createDrawBlock_Launcher(0);
    
    
        let checkboxUIState = function(parent){
            ////////////------------下面是挤压动画/旋转动画【瓷砖本体】的UI------------
            
            // 遍历itemData对象的每个属性
            for (let key in itemData) {
                if (itemData.hasOwnProperty(key)) { // 确保我们只处理对象自身的属性，而不是原型链上的属性
                    const items = itemData[key].item; // 获取当前属性下的item对象
                    if(typeof(items[parent.itemName])!=='undefined'){
                        if(items[parent.itemName]['squishAnimation']){
                            checkbox['squishAnimation'].checked = true;
                            checkbox['squishAnimation'].disabled = false;                  //激活复选框
                        }else{
                            checkbox['squishAnimation'].checked = false;
                            checkbox['squishAnimation'].disabled = true;                   //禁用复选框
                        }
                        if(items[parent.itemName]['rotateable']){
                            checkbox['rotateable'].checked = true;
                            checkbox['rotateable'].disabled = false;                  //激活复选框
                        }else{
                            checkbox['rotateable'].checked = false;
                            checkbox['rotateable'].disabled = true;                   //禁用复选框
                        }
                    };
                }
            }
            
        }  
    }  


}
