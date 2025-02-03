var 工具箱笔刷 = function(){
    //@笔刷样式
    let draw_style = [
        '♦','🛢','🖌','🖊'//笔//刷子//填充//橡皮擦
    ];

    //@工具箱笔刷样式
    let draw_style_lable = createDiv(0,0,150,50,tools_container);
    setText(draw_style_lable,{text:'DRAW-STYLE:',align:'left',lineHeight:getH(draw_style_lable),fontSize:10});
    setBgColor(draw_style_lable,'white');
    draw_style_lable.style.top = tools_container.offsetHeight - draw_style_lable.offsetHeight - 10+ 'px';
    //draw_style_lable.style.fontSize = '12px';
    draw_style_lable.style.textIndent = '1.6em';

    //@创建笔刷
    let draw_tools = [];
    for (let i = 0; i < draw_style.length; i++) {
        draw_tools[i] = createDiv(getW(draw_style_lable)-5 - i * 20,0,20,50,draw_style_lable);
        setText(draw_tools[i],{text:draw_style[i],align:'center',lineHeight:50,fontSize:27});
        setBgColor(draw_tools[i],'white');
        draw_tools[i].style.textIndent = '0em';
        draw_tools[i].onclick = function(){
            switch (this.innerText) {
                case '🖊':
                    draw_pick['pencil'].value = !draw_pick['pencil'].value;
                    if(draw_pick['pencil'].value){
                        this.style.color = 'red';
                    }else{
                        this.style.color = 'black';
                    }
                    break;
                    case '🖌':
                        draw_pick['brush'].value = !draw_pick['brush'].value;
                        if(draw_pick['brush'].value){
                            this.style.color = 'red';
                        }else{
                            this.style.color = 'black';
                        }
                        break;
                        case '🛢':
                            draw_pick['bucket'].value = !draw_pick['bucket'].value;
                            if(draw_pick['bucket'].value){
                                this.style.color = 'red';
                            }else{
                                this.style.color = 'black';
                            }
                            break;
                            case '♦':
                                draw_pick['eraser'].value = !draw_pick['eraser'].value;
                                if(draw_pick['eraser'].value){
                                    this.style.color = 'red';
                                }else{
                                    this.style.color = 'black';
                                }
                                break;
            
                default:
                    break;
            }
        }
    }

    //选择笔刷
    for (var key in draw_pick) {
        if (draw_pick.hasOwnProperty(key)) {
            //console.log(draw_pick[key]);
            if(draw_pick[key].value){
                draw_tools[draw_pick[key].index].style.color = 'red';
            }
        }
    }
}