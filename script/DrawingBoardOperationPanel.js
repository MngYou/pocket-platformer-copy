//操作面板空白容器 参数1 id 参数2回调函数用于创建内容
var 画板操作面板 = function(data,callback){
    let id = data.id,title = data.title,parent = data.parent,width = data.width,height = data.height,lineHeight = data.lineHeight;
    let element = document.getElementById(id);
    if(element==null){
        let element_container = createDiv(0,draw_tabers[3].offsetHeight+20,width,height,parent);
        
        setX(element_container,getW(parent));
        setX(element_container,getX(parent)-getW(element_container) - 25);
        element_container.style.zIndex = 99;

        setBorder(element_container,'1px solid black');
        element_container.setAttribute('id', id);
        setBgColor(element_container,'white');
        let element_container_title = createDiv(0,0,width,lineHeight,element_container);
        setBgColor(element_container_title,'white');
        element_container_title.style.borderBottom = '1px solid #BEBEBE';
        setText(element_container_title,{text:`${title}`,align:'center',lineHeight:getH(element_container_title)});
        let element_button = createDiv(0,0,30,30,element_container_title);
        setText(element_button,{text:'×',lineHeight:30,align:'center',fontSize:32});
        setX(element_button,width-30);
        element_button.onmouseover = function(){
            setColor(this,'red');
        }
        element_button.onmouseout = function(){
            setColor(this,'black');
        }
        element_button.onmousedown = function(){
            element_container.parentNode.removeChild(element_container);//卸载操作面板
        }
        callback();
    }else{
        element.parentNode.removeChild(element);
    }
}