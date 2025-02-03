let widthForWindow = window.innerWidth;
let heightForWindow = window.innerHeight;
let hScale = 0; //-
let vScale = 0; //|


//@创建容器
let container = createDiv(0,0,1467,700,document.body);
setBgColor(container,'lightgray');
setBorder(container,'1px solid black');
hScale = widthForWindow / getW(container);
vScale = heightForWindow / getH(container);
container.style.transform = `scale(${hScale},${vScale})`; 
container.style.transformOrigin = 'top left';

//@创建工具箱
let buildTools_window = createDiv(0,0,200,600,container);
setBgColor(buildTools_window,'white');
setBorder(buildTools_window,'1px solid black');
title_text('build tools',buildTools_window,200,50);
let tools_container = createDiv(0,0,180,470,buildTools_window);
setBgColor(tools_container,'white');
setBorder(tools_container,'1px solid lightgray');
Center(tools_container,buildTools_window);
//@工具箱选项卡
let buildTools_taber = createDiv(0,0,180,40,tools_container);
setY(buildTools_taber,0);

let tabers = [];
tabers_index = 1;
let tabers_texts = [
    '🚪','💣','❀','➕'
];
for (let i = 0; i < 4; i++) {
    tabers[i] = createDiv(i%4*(180/4),0,180/4,40,buildTools_taber);
    setText(tabers[i],{text:tabers_texts[i],lineHeight:40,align:'center'});
    setBorder(tabers[i],'1px solid gray');
    setBgColor(tabers[i],'lightgrey');
    tabers[i].onclick = function(){
        //console.log(this.innerText);                            //工具箱选项卡
    
        for (let j = 0; j < tabers_texts.length; j++) {             //清空工具箱选项卡选中状态
            tabers[j].style.borderBottom = '1px solid black';
            setBgColor(tabers[j],'lightgray');
        }
        
        
        for (let i = 0; i < typeFrameArray.length; i++) {
            typeFrameArray[i][1].style.display = 'none';
        }
        switch (this.innerText) {
            case '🚪':
                tabers_index = 1;
                typeFrameArray[0][1].style.display = 'block';
                break;
                case '💣':
                    tabers_index = 2;
                    typeFrameArray[1][1].style.display = 'block';
                    break;
                    case '❀':
                        tabers_index = 3;
                        typeFrameArray[2][1].style.display = 'block';
                        break;
                        case '➕':
                            tabers_index = 4;
                            break;
        
            default:
                break;
        }
        tabers[tabers_index-1].style.borderBottom = 'none';
        setBgColor(tabers[tabers_index-1],'white');
        if(tabers_index == 4){
            return false;
        }
        创建工具箱元素();
    }
    tabers[i].onmouseover = function(){
        if(this.style.backgroundColor=='white'){
            return false;
        }
        setBgColor(this,'#BEBEBE');
    }
    tabers[i].onmouseout = function(){
        if(this.style.backgroundColor=='white'){
            return false;
        }
        setBgColor(this,'lightgray');
    }
}

tabers[0].style.borderBottom = 'none';
setBgColor(tabers[0],'white');
setTimeout(() => {
    tabers[0].click();
}, 60);





//@工具箱游戏开关按钮
var buildTools_button = createDiv(0,0,180,50,buildTools_window);
setBgColor(buildTools_button,'lightgray');
Center(buildTools_button,buildTools_window);
buildTools_button.style.top = buildTools_window.offsetHeight - buildTools_button.offsetHeight - 10+ 'px';
setText(buildTools_button,{text:'▲PLAY',lineHeight:buildTools_button.offsetHeight,align:'center'});
let buildTools_button_text = {
    'true':'▲ PLAY',
    'false':'| | STOP'
};
let buildTools_button_Boolean = true;
buildTools_button.onclick = function(){
    /////////////////////////////////////////////////////////////////////////////////////////////////////////
    for (let layer_index = 0; layer_index < level_editor_layer_key.length; layer_index++) {
        let arrayLevel = [];
    
        for (let i = 0; i < level_editor[level_editor_layer_key[layer_index]].length; i++) {
            let array = [];
            for (let j = 0; j < level_editor[level_editor_layer_key[layer_index]][i].length; j++) {
                array.push([]);
                for (let k = 0; k < level_editor[level_editor_layer_key[layer_index]][i][0].length; k++) {
                    if(typeof(level_editor[level_editor_layer_key[layer_index]][i][j][k].itemName)=='undefined'){
                        array[j][k] = '.';
                    }else{
                        array[j][k] = level_editor[level_editor_layer_key[layer_index]][i][j][k].itemName;
                    }
                }
            }
            arrayLevel.push(array);
        }
        arrayLevel.unshift([]);//在头部添加元素
        arrayLevel.push([]);
    
        for (let i = 0; i < arrayLevel.length; i++) {
            scene[i][level_editor_layer_key[layer_index]] = arrayLevel[i];
        }
    }



    
/*     const jsonString = JSON.stringify(scene);
    console.log(`var scene = ${jsonString}`);
    const jsonString2 = JSON.stringify(itemData);
    console.log(`var itemData = ${jsonString2}`);

    const c = jsonString + '\n' + jsonString2; */

    
    Game_Data.scene = scene;
    Game_Data.itemData = itemData;
    //////////////////////////////////////////////////////////////////
    isGamePaused = !isGamePaused;
    buildTools_button_Boolean = !buildTools_button_Boolean;
    setText(this,{text:buildTools_button_text[buildTools_button_Boolean]});
    

    if (!buildTools_button_Boolean) {
        let gameScene;
        let gameContainer = document.getElementById('game container');
        if (gameContainer!==null) {
            gameContainer.style.zIndex = 99;
            setTimeout(() => {
                let scene = game.scene.getScene('gameScene');
                scene.scene.manager.game.isPaused = isGamePaused;
                scene.clearLevelLayer();
                scene.createLevelLayer(0);
                scene.createPlayer();
            }, 100);
        }else{
            gameScene = createDiv(0,0,getW(editor),getH(editor),editor);
            gameScene.id = 'game container';
            require(
                [   
                    '../scenes/game',
                ],
                function() {    //js库前端加载模块
                
                    PhaserGame();
                
            });
            let PhaserGame = function(){
                const config = {
                    type: Phaser.CANVAS,
                    parent: gameScene,
                    width: getW(gameScene),
                    height: getH(gameScene),
                    pixelArt: true,
                    //scene: [Demo2,Demo]   //如果选择配置中 则默认启动 所以用场景管理器添加场景
                    physics: {
                        matter: {
                            gravity: {
                                x: 0,
                                y: 0.98//9.8n/kg
                            },
                        debug: true
                        }
                    },
                };
                
                game = new Phaser.Game(config);
                game.scene.add('gameScene', GameScene);
                game.scene.start('gameScene');
                setTimeout(() => {
                    let scene = game.scene.getScene('gameScene');
                    scene.scene.manager.game.isPaused = isGamePaused;
                    scene.clearLevelLayer();
                    scene.createLevelLayer(0);
                    scene.createPlayer();
                }, 100);
            }
        }
    }else{
        let gameScene = document.getElementById('game container');
        gameScene.style.zIndex = -1;
        //gameScene.parentNode.removeChild(gameScene);
    }

}
buildTools_button.onmouseover = function(){
    setBgColor(this,'#BEBEBE');
}
buildTools_button.onmouseout = function(){
    setBgColor(this,'lightgray');
}

//@创建游戏编辑区
let gameScreen_window = createDiv(0,0,800,600,container);
setBgColor(gameScreen_window,'white');
setBorder(gameScreen_window,'1px solid black');
ToRight(gameScreen_window,buildTools_window);
title_text('game screen',gameScreen_window,800,50);
let gameSceneControlUIContainer = createDiv(0,50,800,60,gameScreen_window);
setBgColor(gameSceneControlUIContainer,'white');
let contorlLeftButton = createDiv(10,0,40,50,gameSceneControlUIContainer);
setY(contorlLeftButton,getH(gameSceneControlUIContainer) - getH(contorlLeftButton));
setText(contorlLeftButton,{text:'👈',align:'center',lineHeight:50});
let sceneTitle = createDiv(0,0,180,50,gameSceneControlUIContainer);
setY(sceneTitle,getH(gameSceneControlUIContainer) - getH(sceneTitle));
setX(sceneTitle,getX(contorlLeftButton)+getW(contorlLeftButton));
setText(sceneTitle,{text:'Level 1',align:'center',lineHeight:50});
setBgColor(sceneTitle,'white');
let contorlRightButton = createDiv(10,0,40,50,gameSceneControlUIContainer);
setY(contorlRightButton,getH(gameSceneControlUIContainer) - getH(contorlRightButton));
setX(contorlRightButton,getW(sceneTitle)+getX(sceneTitle));
setText(contorlRightButton,{text:'👉',align:'center',lineHeight:50});
let contorlAddLevelButton = createDiv(10,0,40,50,gameSceneControlUIContainer);
setY(contorlAddLevelButton,getH(gameSceneControlUIContainer) - getH(contorlAddLevelButton));
setX(contorlAddLevelButton,getW(contorlRightButton)+getX(contorlRightButton)+10);
setText(contorlAddLevelButton,{text:'➕',align:'center',lineHeight:50});
let changeLevelSizeUI = createDiv(10,0,40,50,gameSceneControlUIContainer);
setY(changeLevelSizeUI,getH(gameSceneControlUIContainer) - getH(changeLevelSizeUI));
setX(changeLevelSizeUI,getW(gameSceneControlUIContainer) - getW(changeLevelSizeUI) - 10 - 40 - 10);
setText(changeLevelSizeUI,{text:'回',align:'center',lineHeight:50});
let changeWorldAppearanceUI = createDiv(10,0,40,50,gameSceneControlUIContainer);
setY(changeWorldAppearanceUI,getH(gameSceneControlUIContainer) - getH(changeWorldAppearanceUI));
setX(changeWorldAppearanceUI,getW(gameSceneControlUIContainer) - getW(changeWorldAppearanceUI) - 10);
setText(changeWorldAppearanceUI,{text:'🖼',align:'center',lineHeight:50});
//@向上翻页                             //实现上下翻页的效果不理想 不晓得为什么只有未创建的才可以 估计要移除不是隐形
contorlLeftButton.onclick = function(){
    //console.log(sceneIndex);
    if(sceneIndex==0){return false;};
    sceneIndex -= 1;
    页面切换(sceneIndex);
}
//@向下翻页
contorlRightButton.onclick = function(){
    //console.log(sceneIndex);
    if(sceneIndex==scene.length-1){return false;};
    sceneIndex += 1;
    页面切换(sceneIndex);
}
//@添加游戏关卡
contorlAddLevelButton.onclick = function(){
    //console.log(scene[scene.length-2]);//倒数第二个位置 标题则为 scene.length-1
    scene.splice(scene.length-1,0,
        {
            'name':`Level ${scene.length-1}`,
            'backgroundLayer':[],
            'middleLayer':[],
            'foregroundLayer':[],
            'levelArray':[],
        });
    sceneIndex = scene.length-2;
    创建地图编辑区域();
    页面切换(sceneIndex);
    levelPage = [];
    for (let i = 0+1; i < scene.length-1; i++) {
        var level = document.getElementById(`Level ${i}`);
        level.setAttribute('class','level');
        levelPage.push(level);
    }
}
//@修改level地图大小
changeLevelSizeUI.onclick = function(){
    let containerDiv = document.getElementById('CLS_container');
    if(containerDiv==null){
        let CLS_container = createDiv(0,0,400,300,container);
        CLS_container.id = 'CLS_container';
        setBorder(CLS_container,'1px solid lightgray');
        setBgColor(CLS_container,'white');
        inCenter(CLS_container,container);
        let CLS_container_Top = createDiv(0,0,400,50,CLS_container);
        let CLS_container_Middle = createDiv(10,50,380,200,CLS_container);
        let CLS_container_Bottom = createDiv(0,250,400,50,CLS_container);
        setBgColor(CLS_container_Top,'white');
        setBgColor(CLS_container_Middle,'white');
        setBgColor(CLS_container_Bottom,'white');
        CLS_container_Middle.style.borderTop = '1px solid lightgray';
        CLS_container_Middle.style.borderBottom = '1px solid lightgray';
        CLS_container_Middle.style.zIndex = 99;
        setText(CLS_container_Top,{text:'CHANGE LEVEL SIZE',lineHeight:50,align:'center'});
        let closeUI = createDiv(getW(CLS_container_Top) - 10 - 30,10,30,30,CLS_container_Top);
        setText(closeUI,{text:'X',align:'center',lineHeight:getH(closeUI)});
        closeUI.onmouseover = function(){
            setBgColor(this,'gray');
        }
        closeUI.onmouseout = function(){
            setBgColor(this,'lightgray');
        }
        closeUI.onclick = function(){
            this.parentNode.parentNode.parentNode.removeChild(this.parentNode.parentNode);
        }
        createSettingsUI('CLS_container_Middle_WIDTH',0,30,{title:"WIDTH(11-99):",context:24},0,CLS_container_Middle,'number',function(){});
        createSettingsUI('CLS_container_Middle_HEIGHT',0,30,{title:"HEIGHT(11-99):",context:14},1,CLS_container_Middle,'number',function(){});
        let OK_button = createDiv(10,10,185,30,CLS_container_Bottom);
        let CANCEL_button = createDiv(205,10,185,30,CLS_container_Bottom);
        setText(OK_button,{text:'OK',lineHeight:30,align:'center'});
        setBgColor(OK_button,'lightgray');
        setText(CANCEL_button,{text:'CANCEL',lineHeight:30,align:'center'});
        setBgColor(OK_button,'lightgray');
        setBgColor(CANCEL_button,'white');
        setBorder(OK_button,'1px solid lightgray');
        setBorder(CANCEL_button,'1px solid lightgray');
        OK_button.onmouseover = function(){
            setBgColor(this,'gray');
        }
        OK_button.onmouseout = function(){
            setBgColor(this,'lightgray');
        }
        CANCEL_button.onmouseover = function(){
            setBgColor(this,'gray');
        }
        CANCEL_button.onmouseout = function(){
            setBgColor(this,'white');
        }
        CANCEL_button.onclick = function(){
            closeUI.click();
        }
        OK_button.onclick = function(){
            let id = `Level ${sceneIndex}`;
            
            //修改地图大小
            for (let layer_index = 0; layer_index < level_editor_layer_key.length; layer_index++) {
                Level_Size_Width = CLS_container_Middle_WIDTH_input_text.value;
                Level_SIze_Height = CLS_container_Middle_HEIGHT_input_text.value;
                console.log(levelPage);
                for (let page_index = 0; page_index < levelPage.length; page_index++) {
                    let resizedArray = resizeArray(level_editor[level_editor_layer_key[layer_index]][page_index], Level_Size_Width, Level_SIze_Height);
                    let parentNode = document.getElementById(`Level ${page_index + 1}`).children;
                    createDivArray(resizedArray,page_index + 1,level_editor_layer_key[layer_index],parentNode[layer_index]);
                }
                console.log(level_editor);
            }
            closeUI.click();
            //////
            //Be aware:if you make your level smaller than it is,all objects outside the bounds will be deleted.
            //////
    
        }
    }else{
        containerDiv.parentNode.removeChild(containerDiv);
    }
}

//@修改世界外貌
changeWorldAppearanceUI.onclick = function(){
    let containerDiv = document.getElementById('CWA_container');
    if(containerDiv==null){                             //可以建立一个对象表，存储世界外貌和特效，再根据数据生成界面，这样方便界面UI设置
        let CWA_container = createDiv(0,0,400,600,container);                       //容器
        CWA_container.id = 'CWA_container';
        setBorder(CWA_container,'1px solid lightgray');
        setBgColor(CWA_container,'white');
        inCenter(CWA_container,container);
    
        let CWA_container_Top = createDiv(0,0,400,50,CWA_container);                //第一层
        setText(CWA_container_Top,{text:'CHANGE WORLD APPEARANCE',align:'center',lineHeight:50});
        setBgColor(CWA_container_Top,'white');
        let X_button = createDiv(getW(CWA_container) - 50,10,40,40,CWA_container);
        setText(X_button,{text:'X',align:'center',lineHeight:getH(X_button)});
        X_button.onclick = function(){
            CWA_container.parentNode.removeChild(CWA_container);
        }
    
        let CWA_container_Middle_1 = createDiv(0,50,400,150,CWA_container);         //第二层 背景色 前景色
        setBgColor(CWA_container_Middle_1,'white');
        let CWA_container_Middle_1_top = createDiv(10,10,380,50,CWA_container_Middle_1);
        setBgColor(CWA_container_Middle_1_top,'white');
        CWA_container_Middle_1_top.style.borderTop = '1px solid lightgray';
        let CWA_container_Middle_1_top_left = createDiv(0,0,50,50,CWA_container_Middle_1_top);
        setBgColor(CWA_container_Middle_1_top_left,'white');
        setText(CWA_container_Middle_1_top_left,{text:'🔺',align:'center',lineHeight:getH(CWA_container_Middle_1_top_left)});
        let CWA_container_Middle_1_top_right = createDiv(50,0,330,50,CWA_container_Middle_1_top);
        setText(CWA_container_Middle_1_top_right,{text:'GENERAL COLOR SETTINGS',align:'center',lineHeight:getH(CWA_container_Middle_1_top_right)});
        setBgColor(CWA_container_Middle_1_top_right,'white');
        let CWA_container_Middle_1_middle = createDiv(10,60,380,50,CWA_container_Middle_1);
        setBgColor(CWA_container_Middle_1_middle,'white');
        let CWA_container_Middle_1_middle_left = createDiv(0,0,190,30,CWA_container_Middle_1_middle);
        setText(CWA_container_Middle_1_middle_left,{text:'BACKGROUND-COLOR:',align:'center',lineHeight:getH(CWA_container_Middle_1_middle_left)});
        setBgColor(CWA_container_Middle_1_middle_left,'white');
        let CWA_container_Middle_1_middle_right = createDiv(190,5,190,30,CWA_container_Middle_1_middle);
        setBgColor(CWA_container_Middle_1_middle_right,'white');
        setBorder(CWA_container_Middle_1_middle_right,'1px solid lightgray');
        let CWA_container_Middle_1_bottom = createDiv(10,100,380,30,CWA_container_Middle_1);
        setBgColor(CWA_container_Middle_1_bottom,'white');
        let CWA_container_Middle_1_bottom_left = createDiv(0,0,190,30,CWA_container_Middle_1_bottom);
        setBgColor(CWA_container_Middle_1_bottom_left,'white');
        setText(CWA_container_Middle_1_bottom_left,{text:'TEXT-COLOR:',align:'center',lineHeight:getH(CWA_container_Middle_1_bottom_left)});
        let CWA_container_Middle_1_bottom_right = createDiv(190,5,190,30,CWA_container_Middle_1_bottom);
        setBgColor(CWA_container_Middle_1_bottom_right,'white');
        setBorder(CWA_container_Middle_1_bottom_right,'1px solid lightgray');
    
        let CWA_container_Middle_2 = createDiv(0,200,400,150,CWA_container);                //第三层        游戏过场特效    瓷砖淡出|屏幕淡出
        setBgColor(CWA_container_Middle_2,'white');
        let CWA_container_Middle_2_top = createDiv(10,10,380,50,CWA_container_Middle_2);
        setBgColor(CWA_container_Middle_2_top,'white');
        CWA_container_Middle_2_top.style.borderTop = '1px solid lightgray';
        let CWA_container_Middle_2_top_left = createDiv(0,0,50,50,CWA_container_Middle_2_top);
        setBgColor(CWA_container_Middle_2_top_left,'white');
        setText(CWA_container_Middle_2_top_left,{text:'🔺',align:'center',lineHeight:getH(CWA_container_Middle_2_top_left)});
        let CWA_container_Middle_2_top_right = createDiv(50,0,330,50,CWA_container_Middle_2_top);
        setText(CWA_container_Middle_2_top_right,{text:'TRANSITIONS',align:'center',lineHeight:getH(CWA_container_Middle_2_top_right)});
        setBgColor(CWA_container_Middle_2_top_right,'white');
        let CWA_container_Middle_2_middle = createDiv(10,60,380,50,CWA_container_Middle_2);
        setBgColor(CWA_container_Middle_2_middle,'white');
        let CWA_container_Middle_2_middle_left = createDiv(0,0,190,30,CWA_container_Middle_2_middle);
        setText(CWA_container_Middle_2_middle_left,{text:'LEVEL-TRANSITION:',align:'center',lineHeight:getH(CWA_container_Middle_2_middle_left)});
        setBgColor(CWA_container_Middle_2_middle_left,'white');
        let CWA_container_Middle_2_middle_right = createDiv(190,5,190,30,CWA_container_Middle_2_middle);            //要改成下拉菜单 项目：none fading tiles|瓷砖动画 screen fade|屏幕淡出
        setBgColor(CWA_container_Middle_2_middle_right,'white');
        setBorder(CWA_container_Middle_2_middle_right,'1px solid lightgray');
        let CWA_container_Middle_2_bottom = createDiv(10,100,380,30,CWA_container_Middle_2);
        setBgColor(CWA_container_Middle_2_bottom,'white');
        let CWA_container_Middle_2_bottom_left = createDiv(0,0,190,30,CWA_container_Middle_2_bottom);
        setBgColor(CWA_container_Middle_2_bottom_left,'white');
        setText(CWA_container_Middle_2_bottom_left,{text:'TRANSITION-LENGTH:',align:'center',lineHeight:getH(CWA_container_Middle_2_bottom_left)});
        let CWA_container_Middle_2_bottom_right = createDiv(190,5,190,30,CWA_container_Middle_2_bottom);        //要改成range 滑块  48毫秒完整的过场动画时间
        setBgColor(CWA_container_Middle_2_bottom_right,'white');
        setBorder(CWA_container_Middle_2_bottom_right,'1px solid lightgray');
    
        let CWA_container_Middle_3 = createDiv(10,350,380,50,CWA_container);                    //第四层 单关卡的背景色
        CWA_container_Middle_3.style.borderTop = '1px solid lightgray';
        setBgColor(CWA_container_Middle_3,'white');
        let CWA_container_Middle_3_left = createDiv(0,0,190,50,CWA_container_Middle_3);
        let CWA_container_Middle_3_right = createDiv(190,10,190,30,CWA_container_Middle_3);
        setBgColor(CWA_container_Middle_3_left,'white');
        setBgColor(CWA_container_Middle_3_right,'white');
        setText(CWA_container_Middle_3_left,{text:'LEVEL BACKGROUND-COLOR:',align:'center',lineHeight:getH(CWA_container_Middle_3_left),fontSize:12});
        setBorder(CWA_container_Middle_3_right,'1px solid lightgray');
    
        let CWA_container_Middle_4 = createDiv(10,400,380,150,CWA_container);                    //第五层 游戏的特效：下雨、雾、随机粒子、迷雾灯罩
        setBgColor(CWA_container_Middle_4,'white');
        let CWA_container_Middle_4_top = createDiv(0,0,380,50,CWA_container_Middle_4);
        setText(CWA_container_Middle_4_top,{text:'EFFECTS',lineHeight:getH(CWA_container_Middle_4_top)});
        let CWA_container_Middle_4_middle = createDiv(0,50,380,50,CWA_container_Middle_4);
        
        let CWA_container_Middle_4_bottom = createDiv(0,100,380,50,CWA_container_Middle_4);
        setText(CWA_container_Middle_4_bottom,{text:'ADD ➕',lineHeight:getH(CWA_container_Middle_4_bottom)});
        setBgColor(CWA_container_Middle_4_top,'white');
        setBgColor(CWA_container_Middle_4_middle,'white');
        setBgColor(CWA_container_Middle_4_bottom,'white');
    
    
        let CWA_container_Bottom = createDiv(0,550,400,50,CWA_container);                     //第六层  ok按钮
        setBgColor(CWA_container_Bottom,'white');
        let OK_button = createDiv(10,0,380,40,CWA_container_Bottom);   
        setText(OK_button,{text:'OK',align:'center',lineHeight:getH(OK_button)});
    }else{
        CWA_container.parentNode.removeChild(CWA_container);
    }

}



//@编辑区
let editor = createDiv(0,0,780,460,gameScreen_window);
setBgColor(editor,'red');
inXCenter(editor,gameScreen_window);
setY(editor,getH(gameScreen_window) - getH(editor) - 20);

var 创建地图编辑区域 = function(){
    地图编辑区({
        id:scene[sceneIndex].name,
        context:scene[sceneIndex].context,
        width:780,
        height:460, 
        parent:editor,
    },function(){
        if(scene[sceneIndex].name=='START SCREEN'){
            let text = scene[sceneIndex].context;
            text += '\n';
            text += scene[sceneIndex].tips;
            let element = document.getElementById('START SCREEN');
            let context = createDiv(0,0,getW(element),getH(element)/4,element);
            context.id = 'START SCREEN CONTEXT';
            setText(context,{text:text,align:'center',lineHeight:54,fontSize:36});
            inCenter(context,element);
            setBgColor(context,'transparent');
            setColor(context,GameForegroundColor);
        }
        if(scene[sceneIndex].name=='ENDING SCREEN'){
            let text = scene[sceneIndex].context;
            text += '\n';
            text += scene[sceneIndex].times;
            text += '\n';
            text += scene[sceneIndex].deaths;
            text += '\n';
            text += scene[sceneIndex].tips;
            let element = document.getElementById('ENDING SCREEN');
            let context = createDiv(0,0,getW(element),getH(element)/2,element);
            context.id = 'ENDING SCREEN CONTEXT';
            setText(context,{text:text,align:'center',lineHeight:54,fontSize:36});
            inCenter(context,element);
            setBgColor(context,'transparent');
            setColor(context,GameForegroundColor);
        }
        if(scene[sceneIndex].name.substr(0,5)=='Level'){
            let element = document.getElementById(scene[sceneIndex].name);
            element.style.overflow = 'auto';
            let Gird_Width_Size = Tile_Size||getW(element)/Level_Size_Width;
            let Gird_Height_Size = Tile_Size||getH(element)/Level_SIze_Height;
            let Gird_Size = (Gird_Width_Size > Gird_Height_Size) ? Gird_Width_Size : Gird_Height_Size;
            let draw_brush = false;
            let eraser = false;
            let layer_ = {
                'backgroundLayer':{},
                'middleLayer':{},
                'foregroundLayer':{},
            };

            for (let layer_index = 0; layer_index < level_editor_layer_key.length; layer_index++) {
                layer_[level_editor_layer_key[layer_index]] = createDiv(0,0,getW(element),getH(element),element);
                layer_[level_editor_layer_key[layer_index]].style.opacity = 0.1;
                setBgColor(layer_[level_editor_layer_key[layer_index]],'black');
                layer_[level_editor_layer_key[layer_index]].classList.add(level_editor_layer_key[layer_index]);
                let backgroundLayer = [];
                level_editor[level_editor_layer_key[layer_index]].push(backgroundLayer);
                for (let i = 0; i < Level_Size_Width; i++) {
                    backgroundLayer.push([]);
                    for (let j = 0; j < Level_SIze_Height; j++) {
                        backgroundLayer[i][j] = createDiv(i*Gird_Size,j*Gird_Size,Gird_Size,Gird_Size,layer_[level_editor_layer_key[layer_index]]);
                        setBgColor(backgroundLayer[i][j],'black');
                        setBorder(backgroundLayer[i][j],'1px solid lightgray');
                        let thati = i;
                        let thatj = j;
                        backgroundLayer[i][j].i = i,backgroundLayer[i][j].j = j;
                        backgroundLayer[i][j].onclick = function(){//点击地图单元格
                            if(eraser){
                                this.itemName = '';
                                this.innerHTML = '';
                            }
                            if(!draw_brush){return false;}
                            if (getTiled.itemName == this.itemName) {
                                let directionValue = 'right';                                                                   //用来在游戏中改变tile方向
                                let speedValue = 0;                                                                             //用来控制对象的速度
                                let rateValue = 0;                                                                              //用来控制发射速率
                                let durationValue = 0;                                                                          //持续时间
                                let laserDurationValue = 0;                                                                     //镭射持续时间
                                let pauseDurationValue = 0;                                                                     //镭射间隔时间
                                let CountValue = 0;                                                                             //火球数量
                                let textValue = [];                                                                             //npc文本内容
                                //console.log('已存在同名tile，现在打开属性窗口');
                                let attributeEditorWindow = createDiv(0,0,300,440,element);
                                setBgColor(attributeEditorWindow,'white');
                                setBorder(attributeEditorWindow,'1px solid lightgray');
                                attributeEditorWindow.onclick = function(){
                                    draw_brush = false;
                                }
                                makeDraggable(attributeEditorWindow);

                                let windowTitle = createDiv(0,0,300,50,attributeEditorWindow);
                                setText(windowTitle,{text:'属性编辑',fontSize:27,align:'center',lineHeight:50});

                                let close_Button = createDiv(0,0,32,32,attributeEditorWindow);
                                setBgColor(close_Button,'lightblue');
                                setText(close_Button,{text:'x',fontSize:27,align:'center',lineHeight:24,color:'red'});
                                setPosition(close_Button,getW(attributeEditorWindow) - getW(close_Button) - 10,10);
                                close_Button.onclick = function(){
                                    attributeEditorWindow.parentNode.removeChild(attributeEditorWindow);
                                }

                                let directionICON = createDiv(10,92,32,32,attributeEditorWindow);
                                setBgImage(directionICON,'./right.png');
                                //directionICON.style.textIndent = '2em';
                                let directionLabel = createDiv(52,92,200,32,attributeEditorWindow);
                                setText(directionLabel,{text:`direction:${directionValue}`,fontSize:27,lineHeight:27});

                                let tilePostion = createDiv(10,54,242,32,attributeEditorWindow);
                                let position = {x:i,y:j};//坐标没错 如果是按数量数数则需要加一                                      //通用属性 用来在游戏地编根据坐标判断哪一个tile
                                setText(tilePostion,{text:`x:${position.x},y:${position.y}`,align:'center',lineHeight:32});

                                let speedRange = document.createElement('input');
                                attributeEditorWindow.appendChild(speedRange);
                                speedRange.type = "range";
                                speedRange.min = 0;
                                speedRange.max = 100;
                                speedRange.value = 6;
                                setPosition(speedRange,10,140);
                                let speedLabel = createDiv(140,132,112,32,attributeEditorWindow);
                                setText(speedLabel,{text:`speed:${speedValue = 6}`,fontSize:23,lineHeight:27});
                                speedRange.addEventListener('input', function() {
                                  //console.log(speedRange.value);
                                  speedValue = speedRange.value;
                                  setText(speedLabel,{text:`speed:${speedValue}`,fontSize:23,lineHeight:27});
                                });
                                
                                let rateRange = document.createElement('input');
                                attributeEditorWindow.appendChild(rateRange);
                                rateRange.type = "range";
                                rateRange.min = 0;
                                rateRange.max = 200;
                                rateRange.value = 120;
                                setPosition(rateRange,10,172);
                                let rateLabel = createDiv(140,164,112,32,attributeEditorWindow);
                                setText(rateLabel,{text:`rate:${rateValue = 120}`,fontSize:23,lineHeight:27});
                                rateRange.addEventListener('input', function() {
                                  rateValue = rateRange.value;
                                  setText(rateLabel,{text:`rate:${rateValue}`,fontSize:23,lineHeight:27});
                                });

                                let durationRange = document.createElement('input');
                                attributeEditorWindow.appendChild(durationRange);
                                durationRange.type = "range";
                                durationRange.min = 0;
                                durationRange.max = 3000;
                                durationRange.value = 1000;
                                setPosition(durationRange,10,204);
                                let durationLabel = createDiv(140,196,152,32,attributeEditorWindow);
                                setText(durationLabel,{text:`duration:${durationValue = 1000}`,fontSize:23,lineHeight:27});
                                durationRange.addEventListener('input', function() {
                                    durationValue = durationRange.value;
                                    setText(durationLabel,{text:`duration:${durationValue}`,fontSize:23,lineHeight:27});
                                });
                                
                                let laserDurationRange = document.createElement('input');
                                attributeEditorWindow.appendChild(laserDurationRange);
                                laserDurationRange.type = "range";
                                laserDurationRange.min = 0;
                                laserDurationRange.max = 3000;
                                laserDurationRange.value = 1000;
                                setPosition(laserDurationRange,10,236);
                                let laserDurationLabel = createDiv(140,228,152,32,attributeEditorWindow);
                                setText(laserDurationLabel,{text:`laser:${laserDurationValue = 1000}`,fontSize:23,lineHeight:27});
                                laserDurationRange.addEventListener('input', function() {
                                    laserDurationValue = laserDurationRange.value;
                                    setText(laserDurationLabel,{text:`laser:${laserDurationValue}`,fontSize:23,lineHeight:27});
                                });
                                
                                let pauseDurationRange = document.createElement('input');
                                attributeEditorWindow.appendChild(pauseDurationRange);
                                pauseDurationRange.type = "range";
                                pauseDurationRange.min = 0;
                                pauseDurationRange.max = 3000;
                                pauseDurationRange.value = 3000;
                                setPosition(pauseDurationRange,10,268);
                                let pauseDurationLabel = createDiv(140,260,152,32,attributeEditorWindow);
                                setText(pauseDurationLabel,{text:`pause:${pauseDurationValue = 3000}`,fontSize:23,lineHeight:27});
                                pauseDurationRange.addEventListener('input', function() {
                                    pauseDurationValue = pauseDurationRange.value;
                                    setText(pauseDurationLabel,{text:`pause:${pauseDurationValue}`,fontSize:23,lineHeight:27});
                                });
                                
                                let countRange = document.createElement('input');
                                attributeEditorWindow.appendChild(countRange);
                                countRange.type = "range";
                                countRange.min = 0;
                                countRange.max = 10;
                                countRange.value = 3;
                                setPosition(countRange,10,300);
                                let countLabel = createDiv(140,292,152,32,attributeEditorWindow);
                                setText(countLabel,{text:`count:${countValue = 3}`,fontSize:23,lineHeight:27});
                                    countRange.addEventListener('input', function() {
                                        countValue = countRange.value;
                                    setText(countLabel,{text:`count:${countValue}`,fontSize:23,lineHeight:27});
                                });

                                let textarea = document.createElement('textarea');
                                attributeEditorWindow.appendChild(textarea);
                                setWH(textarea,278,64);
                                setPosition(textarea,10,324);
                                textarea.style.rows = 4; 
                                textarea.style.cols = 50;
                                textarea.placeholder="Please input the array with elements separated by semicolons." //"请输入用分号分隔的数组元素。"
                                let textButton = createDiv(getX(textarea) + getW(textarea) - 32,getY(textarea) + getH(textarea) - 32,32,32,attributeEditorWindow);
                                setText(textButton,{text:'➕',align:'center',lineHeight:30,fontSize:21});
                                setBgColor(textButton,'lightblue');
                                textButton.onclick = function(){
                                    textValue.push(textarea.value);
                                    textarea.value = '';
                                }

                                let OK_button = createDiv(0,0,200,50,attributeEditorWindow);
                                setBgColor(OK_button,'lightblue');
                                setRadius(OK_button,50);
                                inXCenter(OK_button,attributeEditorWindow);
                                setY(OK_button,getH(attributeEditorWindow) - getH(OK_button) - 2);
                                setText(OK_button,{text:'OKAY',align:'center',lineHeight:getH(OK_button)});
                                OK_button.onclick = function(){
                                    draw_brush = false;
                                    /* console.log(
                                        position,
                                        directionValue,
                                        speedValue,
                                        rateValue,
                                        durationValue,                  
                                        laserDurationValue,
                                        pauseDurationValue,
                                        CountValue,
                                        textValue,
                                    ); */
                                    let mapCellData = {
                                        position : position,
                                        directionValue : directionValue,
                                        speedValue : parseInt(speedValue),
                                        rateValue : parseInt(rateValue),
                                        durationValue : parseInt(durationValue), 
                                        laserDurationValue : parseInt(laserDurationValue),
                                        pauseDurationValue : parseInt(pauseDurationValue),
                                        CountValue : parseInt(countValue),
                                        textValue : textValue,
                                    };
                                    // 遍历itemData对象的每个属性
                                    for (let key in itemData) {
                                        if (itemData.hasOwnProperty(key)) {
                                            const items = itemData[key].item;
                                            for (let key2 in items) {
                                                if (key2 == getTiled.itemName) {
                                                    if(items[key2].mapCellDatas == undefined){
                                                        items[key2].mapCellDatas = [];
                                                        items[key2].mapCellDatas.push(mapCellData);
                                                    }else{
                                                        /* for (let i = 0; i < items[key2].mapCellDatas.length; i++) {
                                                            if (mapCellData.position == items[key2].mapCellDatas[i].position) {
                                                                items[key2].mapCellDatas[i] = mapCellData;
                                                            }else{
                                                                items[key2].mapCellDatas.push(mapCellData);
                                                            }
                                                        } */
                                                        items[key2].mapCellDatas.push(mapCellData);
                                                    }
                                                    

                                                }
                                                let datas = items[key2]['mapCellDatas'];
                                                //let jsonString = JSON.stringify(datas);
                                                //console.log(jsonString);
                                                if (items[key2]['mapCellDatas']!==undefined) {
                                                    let tempDatas = removeDuplicatePositions(datas);
                                                    items[key2]['mapCellDatas'] = tempDatas;
                                                }
                                            }
                                            //console.log(items);
                                        }
                                    }
                                    textValue = [];
                                    attributeEditorWindow.parentNode.removeChild(attributeEditorWindow);
                                }

                                let angleCount = 0;
                                directionICON.onclick = function(){
                                    draw_brush = false;
                                    angleCount++;
                                    let angle = 90*angleCount; //0 0 right || 1 90 down || 2 180 left || 3 270 up
                                    let v = angleCount % 4;
                                    switch (v) {
                                        case 1:
                                            directionValue = 'down';
                                            break;
                                            case 2:
                                                directionValue = 'left';
                                                break;
                                                case 3:
                                                    directionValue = 'up';
                                                    break;
                                                    case 0:
                                                        directionValue = 'right';
                                                        break;
                                        default:
                                            break;
                                    }
                                    setAngle(directionICON,angle);
                                    setAngle(backgroundLayer[i][j],angle);
                                    setText(directionLabel,{text:`direction:${directionValue}`,fontSize:27,lineHeight:27});
                                }
                                /* if (this.itemName == 'autoRun') {
                                    let direction = directionValue;//方向
                                    let speed = speedValue;//速度
                                }
                                if (this.itemName == 'barrel') {
                                    let direction = directionValue;//方向
                                    let speed = speedValue;//速度
                                }
                                if (this.itemName == 'stomper') {
                                    let direction = directionValue;//方向
                                    let speed = speedValue;//速度
                                }
                                if (this.itemName == 'rocket launcher') {
                                    let LaunchRate = LaunchRateValue;//发射速率
                                    let speed = speedValue;//速度
                                }
                                if (this.itemName == 'cannon') {
                                    let LaunchRate = LaunchRateValue;//发射速率
                                }
                                if (this.itemName == 'path') {
                                    let direction = directionValue;//方向
                                    let duration = durationValue;//持续时间
                                }
                                if (this.itemName == 'laser cannon') {
                                    let direction = directionValue;//方向
                                    let laserDuration = laserDurationValue;//镭射持续时间
                                    let pauseDuration = pauseDurationValue;//镭射间隔时间
                                }
                                if (this.itemName == 'rotating fireball') {
                                    let direction = directionValue;//方向
                                    let Count = CountValue; //火球数量
                                }
                                if (this.itemName == 'npc') {
                                    let text = textValue;//文本内容
                                } */
                            }
                            this.itemName = getTiled.itemName;
                            //setBorder(getTiled,'none');
                            copyDivContent(getTiled, this);
                        }
                        backgroundLayer[i][j].onmousedown = function(e){
                            if(e.button==0){
                                draw_brush = true;
                            }
                            if(e.button==2){
                                eraser = true;
                            }
                            this.click();
                        }
                        backgroundLayer[i][j].onmouseover = function(e){
                            this.click();
                        }
                        backgroundLayer[i][j].onmouseup = function(e){
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

                        backgroundLayer[i][j].addEventListener('touchstart', function(event) {
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
                        },{ passive: false });
                        
                        backgroundLayer[i][j].addEventListener('touchmove', function(event) {
                            // 如果手指移动，则清除长按计时器
                            clearTimeout(longPressTimer);
                            //console.log('touchmove');
                            //console.log(event.touches[0]);
                            let touchPointX = event.touches[0].pageX;
                            let touchPointY = event.touches[0].pageY;
                            let startPointX = 234 * hScale;
                            let startPointY = 122 * vScale;
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
                                backgroundLayer[xIndex][yIndex].click();
                            }
                        },{ passive: false });
                        
                        backgroundLayer[i][j].addEventListener('touchend', function(event) {
                            // 如果触摸结束，则清除长按计时器
                            clearTimeout(longPressTimer);
                            //console.log('touchend');
                            eraser = false;
                            draw_brush = false;
                        });
                        ///////////////////////////////////////////////////////////////////////////移动端
        
                    }
                    
                }
                let layers = [];
                for (let j = 0; j < level_editor_layer_key.length; j++) {
                    layers[j] = document.getElementsByClassName(level_editor_layer_key[j]);
                }
                for (let j = 0; j < layers[0].length; j++) {
                    layers[0][j].style.opacity = 1;//backgroundLayer
                }
                for (let j = 0; j < layers[1].length; j++) {
                    layers[1][j].style.opacity = 0.5;//middleLayer
                }
                for (let j = 0; j < layers[2].length; j++) {
                    layers[2][j].style.opacity = 0.25;//foregroundLayer
                }
            }
            let button_texts = ['背景层','中间层','前景层'];
            let buttons = [];
            for (let i = 0; i < button_texts.length; i++) {
                buttons[i] = createDiv(i*50,0,50,16,element.parentNode);
                buttons[i].classList.add('layer_toggle_buttons');
                setY(buttons[i],460);
                setBorder(buttons[i],'1px solid dimgray');
                setText(buttons[i],{text:button_texts[i],align:'center',lineHeight:16,fontSize:12});
                buttons[i].index = i;
                let isDisplay = true;
                buttons[i].onclick = function(){
                    isDisplay = !isDisplay;
                    let layers = [];
                    for (let j = 0; j < level_editor_layer_key.length; j++) {
                        layers[j] = document.getElementsByClassName(level_editor_layer_key[j]);
                    }
                    //console.log(layers[this.index]);
                    if(isDisplay){
                        for (let j = 0; j < layers[this.index].length; j++) {
                            layers[this.index][j].style.display = 'block';
                        }
                    }else{
                        for (let j = 0; j < layers[this.index].length; j++) {
                            layers[this.index][j].style.display = 'none';
                        }
                    }
                }
            }
            buttons[1].click();buttons[2].click(); 
        }
    });
    let buttons = document.getElementsByClassName('layer_toggle_buttons');
    for (let i = 0; i < buttons.length-2; i++) {
        buttons[i].parentNode.removeChild(buttons[i]);                      //保留三个按钮
    }
}

for (let i = 0; i < scene.length; i++) {
    sceneIndex = i;
    创建地图编辑区域();
}

sceneIndex = 1;
页面切换(sceneIndex);



var startPage = document.getElementById('START SCREEN');                    //获取启动页面
var endPage = document.getElementById('ENDING SCREEN');                     //获取结束页面
var levelPage = [];                                                         //获取关卡页面
for (let i = 0+1; i < scene.length-1; i++) {
    var level = document.getElementById(`Level ${i}`);
    level.setAttribute('class','level');
    levelPage.push(level);
}
//console.log(levelPage);




//@创建瓷砖编辑区
let draw_window = createDiv(0,0,200,600,container);
setBgColor(draw_window,'white');
setBorder(draw_window,'1px solid black');
ToRight(draw_window,gameScreen_window);
title_text('draw',draw_window,200,50);
//@画板容器
var draw_container = createDiv(0,0,180,248,draw_window);
setBgColor(draw_container,'white');
draw_container.style.borderTop = '1px solid lightgray';
draw_container.style.borderBottom = '1px solid lightgray';
setPosition(draw_container,(draw_window.offsetWidth-draw_container.offsetWidth)/2,110);
let draw_tabers = [];
let draw_tabers_text = [
    '🖊','🎨','🔧','亖'
];
let draw_tabers_gird_size = 180/5;
for (let i = 0; i < draw_tabers_text.length; i++) {
    draw_tabers[i] = createDiv(i%4*(draw_tabers_gird_size+10),10,draw_tabers_gird_size,40,draw_container);
    setText(draw_tabers[i],{text:draw_tabers_text[i],lineHeight:draw_tabers_gird_size,align:'center',fontSize:21});
    setBorder(draw_tabers[i],'1px solid lightgray');
    draw_tabers[i].onclick = function(){
        //console.log(this.innerText);                    //画板的工具选项卡   1.取色版2.随机颜色.纹理变换器4.所有图像
        switch (this.innerText) {
            case '🖊':
                let that = this;    
                画板操作面板({
                    id:'colorPalette',
                    title:'ARNE16',
                    width:180,
                    height:185, 
                    lineHeight:50,
                    parent:draw_container,
                },function(){
                    let colorPalette_girds = [];
                    let index = 0;                                                    //画板的选色笔
                    for (let key in ARNE16) {
                        if (ARNE16.hasOwnProperty(key)) {
                            //console.log(key);
                            //console.log(ARNE16[key]);
                            colorPalette_girds[index] = createDiv(25+index%4*32,54+Math.floor(index/4)*32,32,32,colorPalette);
                            setBgColor(colorPalette_girds[index],ARNE16[key]);
                            colorPalette_girds[index].value = key;
                            colorPalette_girds[index].innerText = key;
                            colorPalette_girds[index].onclick = function(){
                                //console.log(`${this.value}`);                               //取色板取色
                                colorPalette_take = this.value;
                                colorPalette.parentNode.removeChild(colorPalette);
                                setBgColor(that,getBgColor(this));                              //选色笔选色后改变背景色
                                setColor(that,invertColor(getBgColor(this)));                 //选色笔选色后改变前景色
                            }
                            index++;
                        }
                    }
                });

                break;
                case '🎨'://随机颜色
                let Array = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F'];
                    for (let i = 0; i < Array.length; i++) {
                        draw_tabers[0].value = (Array[getRandomInt(0,15)]);
                        colorPalette_take = draw_tabers[0].value;
                        setBgColor(draw_tabers[0],ARNE16[`${draw_tabers[0].value}`]);                              //选色笔选色后改变背景色
                        setColor(draw_tabers[0],invertColor(getBgColor(draw_tabers[0])));                 //选色笔选色后改变前景色
                    }
                    break;
                    case '🔧'://思路 跟创建方块一样传递父级容器然后进行偏移量操作
                        画板操作面板({
                            id:'transformBoard',
                            title:'TRANSFORM',
                            width:180,
                            height:185, 
                            lineHeight:50,
                            parent:draw_container,
                        },function(){
                            //transformBoard.style.opacity += 0.2;
                            let button_titles = [
                                '↙','⬆','↘',
                                '⬅','⬇','➡',
                                '||','三','🚮'
                            ];
                            let buttons = [];
                            for (let i = 0; i < button_titles.length; i++) {
                                buttons[i] = createDiv(35+i%3*40,61.5+Math.floor(i/3)*40,32,32,transformBoard);
                                setBgColor(buttons[i],'lightgray');
                                setText(buttons[i],{text:button_titles[i],fontSize:21,align:'center',lineHeight:32});
                                buttons[i].onclick = function(){                                //点击对应的按钮变换瓷砖方块
                                    let operation = '';
                                    let direction = '';
                                    switch (this.innerText) {
                                        case '↙':
                                            operation = 'rotate';
                                            direction = 'counterclockwise';
                                            break;
                                            case '⬆':
                                                operation = 'shiftRows';
                                                direction = 'up';
                                                break;
                                                case '↘':
                                                    operation = 'rotate';
                                                    direction = 'clockwise';
                                                    break;
                                                    case '⬅':
                                                        operation = 'shiftColumns';
                                                        direction = 'left';
                                                        break;
                                                        case '⬇':
                                                            operation = 'shiftRows';
                                                            direction = 'down';
                                                            break;
                                                            case '➡':
                                                                operation = 'shiftColumns';
                                                                direction = 'right';
                                                                break;
                                                                case '||'://水平镜像
                                                                    operation = 'mirror';
                                                                    direction = 'Horizontally';
                                                                    break;
                                                                    case '三'://垂直镜像
                                                                        operation = 'mirror';
                                                                        direction = 'Vertically';
                                                                        break;
                                                                        case '🚮'://清空画板
                                                                            operation = 'clear';
                                                                            direction = '.';
                                                                            break;
                                    
                                        default:
                                            break;
                                    }
                                    // 遍历itemData对象的每个属性
                                    for (let key in itemData) {
                                        if (itemData.hasOwnProperty(key)) {
                                            const items = itemData[key].item;
                                            //console.log(items);
                                            for (let key2 in items) {
                                                if(draw_block_container.itemName==key2){
                                                    let dataStr = items[key2].pixel.data[getAnimationFrameIndex];
                                                    console.log(dataStr);
                                                    let textureDataArry = dataStr.split(',');
                                                    console.log(textureDataArry);
                                                    let textureData = transpose(textureDataArry);
                                                    textureData = transpose(textureData);
                                                    console.log(textureData);
                                                    //console.log(textureData);
                                                    // 执行变换操作
                                                    let transformConfig = {
                                                        operation: operation,
                                                        direction: direction,
                                                        times: 1
                                                    };
                                                    let transformedMatrix = matrixTransform(textureData, transformConfig);
                                                    let twoDimensionalArray = transformedMatrix;
                                                    let oneDimensionalArray = twoDimensionalArray.flat();       //二维数组转一维数组
                                                    let result = oneDimensionalArray.join('');                  //一维数组合并成字符串
                
                                                    const chunkSize = 8; // 分组大小
                                                    const chunks = [];
                                                    for (let i = 0; i < result.length; i += chunkSize) {
                                                        // 获取从当前位置开始的chunkSize长度的子字符串
                                                        const chunk = result.substring(i, i + chunkSize);
                                                        chunks.push(chunk);
                                                    }
                                                    //console.log(chunks);  
                                                    let resultStr = chunks.join(',');
                                                    textureData = resultStr.split(',');
                                                    changeBlock({parent:getTiled,textureData:textureData});
                                                    
                                                    items[key2].pixel.data[getAnimationFrameIndex] = resultStr;  
                                                    console.log(items);
                                                    getTiled.click();
                                                    if(getAnimationFrameIndex==1){                          //如果当前在编辑动画关键帧的第二帧则需要更新第二帧瓷砖的画板块
                                                        ani_blocks_group[getAnimationFrameIndex].click();
                                                    }
                                                    //transformBoard.parentNode.removeChild(transformBoard);//卸载操作面板
                                                }
                                            }
                                        }
                                    }
                                }
                                
                            }
                        });
                        break;
                        case '亖':
                            画板操作面板({
                                id:'allImageBoard',
                                title:'PASTE ANOTHER SPRITE HERE',
                                width:450,
                                height:400, 
                                lineHeight:50,
                                parent:draw_container,
                            },function(){
                                let allImageTipBoard = createDiv(10,60,getW(allImageBoard)-20,50,allImageBoard);
                                setBgColor(allImageTipBoard,'white');
                                setText(allImageTipBoard,{text:'Select another sprite to start with, if you want to draw something similar',fontSize:16,align:'left',});

                                let allImageContainer = createDiv(0,110,420,280,allImageBoard);
                                inXCenter(allImageContainer,allImageBoard);
                                setBgColor(allImageContainer,'white');
                                let allImages = [];
                                let girdSize = 32;
                                for (let i = 0; i < allPixelData.length; i++) {
                                    allImages[i] = createDiv(i%10*(girdSize+10),Math.floor(i/10)*(girdSize+10),girdSize,girdSize,allImageContainer);
                                    setBorder(allImages[i],'1px solid black');
                                    setBgColor(allImages[i],'black');
                                    createPreviewImageBlock(allImages[i],allPixelData[i][0]);////
                                    allImages[i].index = i;
                                    allImages[i].onclick = function(){
                                        let textureData = allPixelData[this.index][0].split(',');
                                        changeBlock({parent:getTiled,textureData:textureData});

                                        // 遍历itemData对象的每个属性
                                        for (let key in itemData) {
                                            if (itemData.hasOwnProperty(key)) {
                                                const items = itemData[key].item;
                                                //console.log(items);
                                                for (let key2 in items) {
                                                    if(draw_block_container.itemName==key2){
                                                        items[key2].pixel.data[getAnimationFrameIndex] = allPixelData[this.index][0];//更新数据
                                                        getTiled.click();
                                                        if(getAnimationFrameIndex==1){
                                                            ani_blocks_group[getAnimationFrameIndex].click();
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        allImageBoard.parentNode.removeChild(allImageBoard);
                                    }
                                }
                                setH(allImageContainer,getY(allImages[allImages.length-1])+getH(allImages[allImages.length-1]));
                                setH(allImageBoard,getY(allImageContainer)+getH(allImageContainer) + 20);
                            });
                            break;
        
            default:
                break;
        }
    }
    
}

创建工具箱元素();

工具箱笔刷();

let selectListItems = [];
//console.log(allKeyName,allKeyPixel);
for (let i = 0; i < allKeyName.length; i++) {
    selectListItems.push(
        {
            text:allKeyName[i],
            value:allKeyPixel[i] 
        },
    );        
}
    //console.log(selectListItems);
createDropdown(draw_window, selectListItems);

//@画板动画序列帧展示区
var draw_animation_container = createDiv(0,0,180,180,draw_window);
setPosition(draw_animation_container,(draw_window.offsetWidth-draw_container.offsetWidth)/2,360);
setBgColor(draw_animation_container,'white');
draw_animation_container.style.borderBottom = '1px solid lightgray';
var draw_animation_title = createDiv(0,0,180,50,draw_animation_container);
setBgColor(draw_animation_title,'white');
setText(draw_animation_title,{text:'animation:',lineHeight:draw_animation_title.offsetHeight,align:'left'});
//@创建两个关键帧
var ani_blocks_group = [];
let ani_blocks = [];
let size = 4;

for (let i = 0; i < getTiled.pixelData.data.length; i++) {    //数组长度
    ani_blocks_group.push(createDiv(i*50,50,50,50,draw_animation_container));
    setBgColor(ani_blocks_group[i],'black');
    ani_blocks_group[i].setAttribute('class', 'ani_block_parent');
    let dataArray = getTiled.pixelData.data[i].split(',');
    dataArray = transpose(dataArray);
    for (let k = 0; k < dataArray.length; k++) {
        ani_blocks.push([]);
        for (let l = 0; l < dataArray[0].length; l++) {
            ani_blocks[k][l]  = createDiv(10+k*size,10+l*size,size,size,ani_blocks_group[i]);
            setBgColor(ani_blocks[k][l],'black');
            setBgColor(ani_blocks[k][l],getColor(dataArray[k][l])); 
            ani_blocks[k][l].value = dataArray[k][l];
            setText(ani_blocks[k][l],{text:dataArray[k][l],fontSize:3});
        }
    }
}
var changeAnimationBlock = function(){
    ani_blocks_group = [];
    let ani_blocks = [];
    let size = 4;
    let ani_blocks_group_class = document.getElementsByClassName('ani_block_parent');
    for (let i = 0; i < ani_blocks_group_class.length; i++) {
        ani_blocks_group_class[i].parentNode.removeChild(ani_blocks_group_class[i]);//清空动画帧
    }
    for (let i = 0; i < getTiled.pixelData.data.length; i++) {    //数组长度
        ani_blocks_group.push(createDiv(i*50,50,50,50,draw_animation_container));
        setBgColor(ani_blocks_group[i],'black');
        ani_blocks_group[i].setAttribute('class', 'ani_block_parent');
        ani_blocks_group[i].frame = i;
        ani_blocks_group[i].onclick = function(){
            //console.log(this.frame);
            getAnimationFrameIndex = this.frame;                //选择动画关键帧的瓷砖   选择动画瓷砖2时则getItemImage不可改变当只改变关键帧中的瓷砖
            changeDrawBlock_Launcher(this);
            //console.log(this);
        }
        let dataArray = getTiled.pixelData.data[i].split(',');
        dataArray = transpose(dataArray);
        for (let k = 0; k < dataArray.length; k++) {
            ani_blocks.push([]);
            for (let l = 0; l < dataArray[0].length; l++) {
                ani_blocks[k][l]  = createDiv(10+k*size,10+l*size,size,size,ani_blocks_group[i]);
                setBgColor(ani_blocks[k][l],'black');
                setBgColor(ani_blocks[k][l],getColor(dataArray[k][l]));
                ani_blocks[k][l].value = dataArray[k][l];
                setText(ani_blocks[k][l],{text:dataArray[k][l],fontSize:3});
            }
        }
    }
}

//@复选框UI
var checkbox = {
    squishAnimation:{},
    rotateable:{},
},label = {
    squishAnimation:{},
    rotateable:{},
};
let createCheckboxUI = function(id,text,index){//@挤压动画单选区
    let checkboxElement = createDiv(0,0,180,50,draw_window);
    checkboxElement.id = id;
    inXCenter(checkboxElement,draw_window);
    // 创建一个新的复选框元素
    checkbox[id] = document.createElement('input');
    checkbox[id].type = 'checkbox';
    // 创建一个新的标签元素来显示复选框的文本
    label[id] = document.createElement('label');
    setText(label[id],{text:text,fontSize:16,lineHeight:24});
    label[id].htmlFor = checkbox[id];
    setY(checkbox[id],15);
    setPosition(label[id],20,10);
    // 禁用复选框
    checkbox[id].disabled = true;
    setBgColor(checkboxElement,'white');
    setBgColor(label[id],'white');
    setY(checkboxElement,465+index*50);
    checkboxElement.appendChild(checkbox[id]);
    checkboxElement.appendChild(label[id]);
    

    // 添加事件监听器
    checkbox[id].addEventListener("change", function() {
    if (this.checked) {
        // 选中状态的处理
        console.log("Checkbox" + `${id}` + " is checked.");
    } else {
        // 未选中状态的处理
        console.log("Checkbox" + `${id}` + " is not checked.");
    }
    });
}

createCheckboxUI('squishAnimation','squish animation',0);
createCheckboxUI('rotateable','rotateable',1);




//@创建游戏设置区
let settings_window = createDiv(0,0,200,600,container);
setBgColor(settings_window,'white');
setBorder(settings_window,'1px solid black');
ToRight(settings_window,draw_window);
title_text('settings',settings_window,200,50);

var input = {
    'gameName':{},
    'endingMessage':{},
};
let createSettingsUI = function(id,x,y,text,index,parent,inputType,callback){
    let settingsElement = createDiv(x,y,180,30,parent);
    settingsElement.id = id;
    inXCenter(settingsElement,parent);
    setText(settingsElement,{text:text.title,lineHeight:30});
    setBgColor(settingsElement,'white');
    input[id] = document.createElement('input');
    setX(input[id],getX(settingsElement));
    setH(input[id],30);
    setBgColor(input[id],'white');
    input[id].type = inputType||'text';
    input[id].id = `${id}_input_text`;
    input[id].value = text.context;
    input[id].style.textIndent = '5px';
    setY(settingsElement,getY(settingsElement) + index*65);
    setY(input[id],getY(settingsElement)+getH(settingsElement));
    parent.appendChild(input[id]);
    callback();
}

createSettingsUI('gameName',0,60,{title:"GAME'S NAME",context:'Example name'},0,settings_window,'',function(){//修改启动页面的文本内容
    gameName_input_text.addEventListener('input', function() {
        scene[0].context = this.value;
        let text = scene[0].context;
        text += '\n';
        text += scene[0].tips;
        let element = document.getElementById('START SCREEN CONTEXT');
        setText(element,{text:text});
    });
});
createSettingsUI('endingMessage',0,60,{title:"Ending Message",context:'Thx for playing!'},1,settings_window,'',function(){//修改结束页面的文本内容
    endingMessage_input_text.addEventListener('input', function() {
        scene[scene.length-1].context = this.value;
        let text = scene[scene.length-1].context;
        text += '\n';
        text += scene[scene.length-1].times;
        text += '\n';
        text += scene[scene.length-1].deaths;
        text += '\n';
        text += scene[scene.length-1].tips;
        let element = document.getElementById('ENDING SCREEN CONTEXT');
        setText(element,{text:text});
    });
});

createSettingsUI('AddMusicUrl',0,60,{title:"ADD MUSIC URL",context:''},2,settings_window,'',function(){
    let AddMusiclButton = createDiv(0,0,180,40,settings_window);
    AddMusiclButton.id = 'AddMusiclButton';
    setBorder(AddMusiclButton,'lightgray');
    setText(AddMusiclButton,{text:'ADD SONG',align:'center',lineHeight:40});
    setPosition(AddMusiclButton,getX(input['AddMusicUrl']),getY(input['AddMusicUrl'])+getH(input['AddMusicUrl'])+10);
    AddMusiclButton.onclick = function(){//添加音乐
    }
    AddMusiclButton.addEventListener('click', function() {
        let button = this;
        if (this.innerText == 'ADD SONG') {
            // 创建一个input元素
            var fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'audio/*';
            
            // 监听input元素的change事件
            fileInput.addEventListener('change', function() {
                var file = this.files[0];
                if (file) {
                    // 创建一个audio元素用于播放音乐
                    //var audio = new Audio();
                    // 读取文件并设置为audio的src
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        //audio.src = e.target.result;
                        //console.log(e.target.result);
                        Game_Data.bgMusicBase64 = {
                            'name':file.name,
                            'value':e.target.result,
                        };
                        // 音频加载完成后自动播放
                        //audio.play();
                        let obj = new Sound(e.target.result,'bgmusic',true);
                        obj.loadedSrc();
                        bgmusic.play();
                    };
                    // 将文件转换为Data URL
                    reader.readAsDataURL(file);
                    
                    // 打印文件信息
                    //console.log('文件名:', file.name);
                    //console.log('文件大小:', file.size);
                    //console.log('文件类型:', file.type);
                    AddMusicUrl_input_text.value = file.name;
                    setText(button,{text:'DELETE SONG'});
                }
            });
        
            // 触发input元素的点击事件，允许用户选择文件
            fileInput.click();
        }else{
            let bgmusic = document.getElementById('bgmusic');
            bgmusic.parentNode.removeChild(bgmusic);
            setText(this,{text:'ADD SONG'});
            AddMusicUrl_input_text.value = ''
            Game_Data.bgMusicBase64 = {
                'name':'','value':'',
            };
        }
    });
    AddMusiclButton.onmouseover = function(){
        setBgColor(this,'#BEBEBE');
    }
    AddMusiclButton.onmouseout = function(){
        setBgColor(this,'lightgray');
    }
});

//@上传下载游戏数据按钮
let importAndExportContainer = createDiv(0,0,180,110,settings_window);
inXCenter(importAndExportContainer,settings_window);
setY(importAndExportContainer,310);
setBgColor(importAndExportContainer,'white');
importAndExportContainer.style.borderTop = '1px solid lightgray';
importAndExportContainer.style.borderBottom = '1px solid lightgray';
let importButton = createDiv(0,0,180,40,settings_window);
inXCenter(importButton,settings_window);
setY(importButton,320);
let exportButton = createDiv(0,0,180,40,settings_window);
inXCenter(exportButton,settings_window);
setY(exportButton,getY(importButton)+getH(importButton) + 10);
setText(importButton,{text:'IMPROT',align:'center',lineHeight:40});
setText(exportButton,{text:'EXPORT',align:'center',lineHeight:40});
importButton.onclick = function(){//导入数据
}
importButton.addEventListener('click', function() {
    // 创建一个input元素
    var fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'text/*';
    
    // 监听input元素的change事件
    fileInput.addEventListener('change', function() {
        var file = this.files[0];
        if (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                //console.log(e.target.result);
                var content = e.target.result;
                
                // 创建一个script元素
                var script = document.createElement('script');
                script.type = 'text/javascript';
                //script.textContent = content;//text
                script.src = content;//url
                //console.log(content);
                
                // 将script元素添加到文档中
                document.head.appendChild(script);

                // 使用onload事件判断脚本是否加载完成
                script.onload = function() {
                    //console.log('External script has been loaded.');
                    //console.log(Game_Data);
                    //@修改背景音乐
                    let AddMusicUrl_input_text = document.getElementById('AddMusicUrl_input_text');
                    if (typeof(Game_Data.bgMusicBase64)=='undefined') {
                        console.log(`Game_Data.bgMusicBase64 is undefined`);
                    }else{
                        AddMusicUrl_input_text.value = Game_Data.bgMusicBase64.name;
                        let obj = new Sound(Game_Data.bgMusicBase64.value,'bgmusic',true);
                        obj.loadedSrc();
                        bgmusic.play();
                        let AddMusiclButton = document.getElementById('AddMusiclButton');
                        setText(AddMusiclButton,{text:'DELETE SONG'});
                    }

                    scene = Game_Data.scene;
                    itemData = Game_Data.itemData;
                    //@遍历itemData对象的每个属性
                    for (let key in itemData) {
                        if (itemData.hasOwnProperty(key)) {
                            const items = itemData[key].item;
                            for (let key2 in items) {
                                let length = items[key2]['pixel']['data'].length;
                                allKeyName.push(key2);
                                allKeyPixel.push(items[key2]['pixel']['data'][0]);
                                if(length==1){
                                    allPixelData.push(items[key2]['pixel']['data']);
                                }else if(length==2){
                                    let array1 = [items[key2]['pixel']['data'][0]];
                                    let array2 = [items[key2]['pixel']['data'][1]];
                                    allPixelData.push(array1);
                                    allPixelData.push(array2);
                                }
                            }
                        }
                    }
                    //@修改启动页面文本内容
                    gameName_input_text.value = scene[0].context;
                    let text = scene[0].context;
                    text += '\n';
                    text += scene[0].tips;
                    setText(document.getElementById('START SCREEN CONTEXT'),{text:text});
                    //@修改结束页面文本内容
                    endingMessage_input_text.value = scene[scene.length-1].context;
                    let text2 = scene[scene.length-1].context;
                    text2 += '\n';
                    text2 += scene[scene.length-1].times;
                    text2 += '\n';
                    text2 += scene[scene.length-1].deaths;
                    text2 += '\n';
                    text2 += scene[scene.length-1].tips;
                    setText(document.getElementById('ENDING SCREEN CONTEXT'),{text:text2});

                    //////////////////////////////////////////////瓷砖区逻辑更新
                    //itemData = Game_Data.itemData;
                    let tilesScrollbars = document.getElementsByClassName('tiles-scrollbar');
                    //console.log(tilesScrollbars);
                    for (let i = 0; i < tilesScrollbars.length; i++) {
                        //let pixelData = [];
                        let itemName = [];
                        let jsonData = Game_Data.itemData[`${i+1}`].item;
                        // 使用for...in循环遍历对象
                        for (var key in jsonData) {
                            itemName.push(key);
/*                             if (jsonData.hasOwnProperty(key)) {
                                pixelData.push(jsonData[key].pixel);
                            } */
                        }
                        //console.log(itemName);
                        //console.log(tilesScrollbars[i].children);
                        for (let j = 0; j < tilesScrollbars[i].children.length; j++) {
                            //console.log(tilesScrollbars[i].children[j]);
                            //console.log(Game_Data.itemData[i+1]['item'][itemName[j]]['pixel']);
                            let textureStr = Game_Data.itemData[i+1]['item'][itemName[j]]['pixel']['data'][0];
                            let textureDataArry = textureStr.split(',');
                            changeBlock({textureData:textureDataArry,parent:tilesScrollbars[i].children[j]});
                            changeDrawBlock({parent:draw_block_container,target:tilesScrollbars[0].children[0]});
                            let tempColor = colorPalette_take;
                            colorPalette_take = -1;
                            draw_block_container.children[0].click();
                            colorPalette_take = tempColor;
                        }
                        
                    }
                    ////////////////////////////////////////////////瓷砖区逻辑更新

                    ////////////////////////////////////////////////地编区逻辑更新
                    let levelClass = document.getElementsByClassName('level');
                    //console.log(levelClass[0]);

                    let levelMapDatas = [];
                    for (let i = 1; i < scene.length - 1; i++) {
                        levelMapDatas[i] = scene[i];
                    }
                    levelMapDatas.shift();

                    //console.log(allTileds);

                    //console.log(levelMapDatas);
                    for (let i = 0; i < levelMapDatas.length; i++) {//根据映射关系进行赋值
                        //console.log(levelMapDatas[i]);
                        //console.log(levelClass[i]);
                        for (let j = 0; j < level_editor_layer_key.length; j++) {
                            let oneDimensionalArray = levelMapDatas[i][level_editor_layer_key[j]].flat();       //二维数组转一维数组  
                            //console.log(oneDimensionalArray);
                            //console.log(levelClass[i].children[j]);
                            for (let k = 0; k < oneDimensionalArray.length; k++) {
                                //levelClass[i].children[j].children[k].innerText = oneDimensionalArray[k];
                                //levelClass[i].children[j].children[k].style.color = 'white';
                                for (let l = 0; l < allTileds.length; l++) {
                                    if(oneDimensionalArray[k]==allTileds[l].itemName){
                                        //console.log(oneDimensionalArray[k]);
                                        copyDivContent(allTileds[l], levelClass[i].children[j].children[k]);
                                        levelClass[i].children[j].children[k].itemName = allTileds[l].itemName; 
                                    }
                                    
                                }
                            }
                        }
                    }
                };

            };
            
            reader.onerror = function() {
                console.error('Error reading the file.');
            };
            // 将文件转换为Data URL
            reader.readAsDataURL(file);
            
            // 读取文件内容
            //reader.readAsText(file);
            
            // 打印文件信息
            //console.log('文件名:', file.name);
            //console.log('文件大小:', file.size);
            //console.log('文件类型:', file.type);
        }
    });

    // 触发input元素的点击事件，允许用户选择文件
    fileInput.click();
});
importButton.onmouseover = function(){
    setBgColor(this,'#BEBEBE');
}
importButton.onmouseout = function(){
    setBgColor(this,'lightgray');
}
exportButton.onclick = function(){//导出数据

    //@backgroundLayer

    for (let layer_index = 0; layer_index < level_editor_layer_key.length; layer_index++) {
        let arrayLevel = [];
    
        for (let i = 0; i < level_editor[level_editor_layer_key[layer_index]].length; i++) {
            let array = [];
            for (let j = 0; j < level_editor[level_editor_layer_key[layer_index]][i].length; j++) {
                array.push([]);
                for (let k = 0; k < level_editor[level_editor_layer_key[layer_index]][i][0].length; k++) {
                    if(typeof(level_editor[level_editor_layer_key[layer_index]][i][j][k].itemName)=='undefined'){
                        array[j][k] = '.';
                    }else{
                        array[j][k] = level_editor[level_editor_layer_key[layer_index]][i][j][k].itemName;
                    }
                }
            }
            arrayLevel.push(array);
        }
        arrayLevel.unshift([]);//在头部添加元素
        arrayLevel.push([]);
    
        for (let i = 0; i < arrayLevel.length; i++) {
            scene[i][level_editor_layer_key[layer_index]] = arrayLevel[i];
        }
    }



    
/*     const jsonString = JSON.stringify(scene);
    console.log(`var scene = ${jsonString}`);
    const jsonString2 = JSON.stringify(itemData);
    console.log(`var itemData = ${jsonString2}`);

    const c = jsonString + '\n' + jsonString2; */

    Embedded();
    
    /* Game_Data.scene = scene;
    Game_Data.itemData = itemData;
    const jsonString = `Game_Data = ${JSON.stringify(Game_Data)}`;
    //console.log(`${jsonString}`);

    let textObj = jsonString;

    // 将HTML内容转换为Blob对象
    var blob = new Blob([textObj], { type: 'text/text' });//text/html
    //console.log(blob);
    // 创建一个指向该Blob的URL
    var url = URL.createObjectURL(blob);
    // 创建一个临时的a标签用于下载
    var a = document.createElement('a');
    a.href = url;
    a.download = '/s/exported.js';//.html
    // 将a标签添加到文档中，并模拟点击以触发下载
    document.body.appendChild(a);
    a.click();
    // 清理：移除a标签，并释放Blob对象
    document.body.removeChild(a);
    URL.revokeObjectURL(url); */

}
exportButton.onmouseover = function(){
    setBgColor(this,'#BEBEBE');
}
exportButton.onmouseout = function(){
    setBgColor(this,'lightgray');
}

//@播放音乐
//var shortSwooshBase64 = Base64Sounds.shortSwooshBase64;
//console.log(shortSwooshBase64);
//let music = new Sound(shortSwooshBase64,'musicio');
//music.loadedSrc();
//musicio.play();






/* function takeScreenshotOfDivWithHtml2Canvas(tiled,target) {
    html2canvas(tiled).then(canvas => {
        // 将canvas的内容转换为图像URL
        var imageDataURL = canvas.toDataURL('image/png'); //img.src
        target.style.backgroundImage = `url(${imageDataURL})`;
        target.style.backgroundSize = '100% 100%';
    });
}  */



function removeDuplicatesByPosition(array) {//该函数接收一个对象数组，并返回一个新的数组，其中包含没有重复 position 的对象 保留最后项
    let uniqueArr = [];
    let lastSeen = {};
  
    for (let i = array.length - 1; i >= 0; i--) {
      let currentItem = array[i];
      if (!lastSeen[currentItem.position]) {
        uniqueArr.unshift(currentItem);
        lastSeen[currentItem.position] = currentItem;
      }
    }
  
    return uniqueArr;
  }




  function bubbleSort(arr) {
    // 记录数组的长度
    let n = arr.length;
    // 外层循环控制遍历次数
    for (let i = 0; i < n - 1; i++) {
        // 内层循环控制每次遍历的比较
        for (let j = 0; j < n - i - 1; j++) {
            // 相邻元素两两比较，如果前一个比后一个大，则交换它们
            if (arr[j] > arr[j + 1]) {
                // 交换 arr[j] 和 arr[j + 1]
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    // 返回排序后的数组
    return arr;
}

/* // 示例数组
let myArray = [64, 34, 25, 12, 22, 11, 90];
let sortedArray = bubbleSort(myArray);
console.log(sortedArray); // 输出: [11, 12, 22, 25, 34, 64, 90] */




function removeDuplicatePositions(array) {
    if (array==undefined) {
        return false;
    }
    const uniquePositions = new Map(); // 使用Map来存储每个不同position的最后一个对象
    array.forEach(item => {
        const positionKey = JSON.stringify(item.position); // 将position对象转换为字符串作为Map的键
        if (!uniquePositions.has(positionKey)) {
            // 如果Map中没有这个position，添加到Map中
            uniquePositions.set(positionKey, item);
        } else {
            // 如果Map中已经有了这个position，更新为当前遍历到的对象
            uniquePositions.set(positionKey, item);
        }
    });

    // 将Map转换回数组
    return Array.from(uniquePositions.values());
}

/* // 你的原始数组
const originalArray = [
    {"position":{"x":20,"y":5},"directionValue":"right","speedValue":6,"rateValue":120,"durationValue":1000,"laserDurationValue":1000,"pauseDurationValue":3000,"CountValue":0,"textValue":[]},
    {"position":{"x":18,"y":6},"directionValue":"right","speedValue":6,"rateValue":120,"durationValue":1000,"laserDurationValue":1000,"pauseDurationValue":3000,"CountValue":0,"textValue":[]},
    {"position":{"x":16,"y":8},"directionValue":"right","speedValue":6,"rateValue":120,"durationValue":1000,"laserDurationValue":1000,"pauseDurationValue":3000,"CountValue":0,"textValue":[]},
    {"position":{"x":12,"y":9},"directionValue":"right","speedValue":6,"rateValue":120,"durationValue":1000,"laserDurationValue":1000,"pauseDurationValue":3000,"CountValue":0,"textValue":[]},
    {"position":{"x":12,"y":9},"directionValue":"right","speedValue":6,"rateValue":120,"durationValue":1000,"laserDurationValue":1000,"pauseDurationValue":3000,"CountValue":0,"textValue":["飒飒"]}
];

// 调用函数并打印结果
const resultArray = removeDuplicatePositions(originalArray);
console.log(resultArray); */