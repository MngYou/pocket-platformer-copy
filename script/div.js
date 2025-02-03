var getX = function(obj){
    return obj.offsetLeft;
}
var getY = function(obj){
    return obj.offsetTop;
}
var setX = function(obj,x){
    obj.style.left = x + 'px';
}
var setY = function(obj,y){
    obj.style.top = y + 'px';
}
var getW = function(obj){
    return obj.offsetWidth;
}
var getH = function(obj){
    return obj.offsetHeight;
}
var setW = function(obj,w){
    obj.style.width = w + 'px';
}
var setH = function(obj,h){
    obj.style.height = h + 'px';
}
var setPosition = function(obj,x,y){
    obj.style.left = x + 'px';
    obj.style.top = y + 'px';
}
var setColor = function(obj,color){
    obj.style.color = color;
}
var setBgColor = function(obj,color){
    obj.style.backgroundColor = color;
}
var getBgColor = function(obj){
    return obj.style.backgroundColor;
}
var setBgImage = function(obj,src){
    obj.style.backgroundImage = `url(${src})`;
    obj.style.backgroundSize = '100% 100%';
}
var setBorder = function(obj,border){
    obj.style.border = border;
}
var setWH = function(obj,w,h){
    obj.style.width = w + 'px';
    obj.style.height = h + 'px';
}
var setParent = function(obj,parent){
    parent.appendChild(obj);
}
var createDiv = function(x,y,w,h,p){
    let obj = document.createElement('div');
    setPosition(obj,x,y);
    setWH(obj,w,h);
    setParent(obj,p);
    return obj;
}

var Center = function(a,b){
    a.style.left = b.offsetLeft + (b.offsetWidth - a.offsetWidth)/2 + 'px';
    a.style.top = b.offsetTop + (b.offsetHeight - a.offsetHeight)/2 + 'px';
}
var inCenter = function(a,b){
    a.style.left =(b.offsetWidth - a.offsetWidth)/2 + 'px';
    a.style.top = (b.offsetHeight - a.offsetHeight)/2 + 'px';
}
var inXCenter = function(a,b){
    a.style.left =(b.offsetWidth - a.offsetWidth)/2 + 'px';
}

var ToRight = function(AlignObj,GameObj){
    setX(AlignObj,getX(GameObj) + getW(GameObj)+20);
}

var setText = function(obj,data){
    //setText(buildTools_window_title,{text:'build tools',align:'center',lineHeight:getH(buildTools_window_title)});
    obj.innerText = data.text;
    obj.style.textAlign = data.align;
    obj.style.lineHeight = data.lineHeight + 'px';
    obj.style.color = data.color;
    obj.style.fontSize = data.fontSize + 'px';
    
}
var title_text = function(text,parent,w,h){
    let title = createDiv(0,0,w,h,parent);
    setBorder(title,'1px solid black');
    setBgColor(title,'gray');
    setText(title,{text:`${text}`,align:'center',lineHeight:getH(title),color:'white'});
}
var setAlpha = function(obj,value){
    obj.style.opacity = value;
}


var setAngle = function(obj,angle){
    obj.style.transform = `rotate(${angle}deg)`;
}

var setRadius = function(obj,radius){
    obj.style.borderRadius = radius + 'px';
}