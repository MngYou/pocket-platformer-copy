//操作面板空白容器 参数1 id 参数2回调函数用于创建内容
var 地图编辑区 = function(data,callback){
    let id = data.id,context = data.context,parent = data.parent,width = data.width,height = data.height;
    let element = document.getElementById(id);
    if(element==null){
        let element_container = createDiv(0,0,width,height,parent);
        element_container.id = id;
        setBgColor(element_container,GameBackgroundColor);
        callback();
    }
}


var 页面切换 = function(index){
    let stage = [];
    for (let i = 0; i < scene.length; i++) {
        let st = document.getElementById(scene[i].name);
        st.style.display = 'none';
        stage.push(st);
    }
    stage[index].style.display = 'block';
    setText(sceneTitle,{text:scene[index].name});
}