var scene = [
    {
        'name':'START SCREEN',
        'context':'Example name',
        'tips':'Press enter to continue',
    },
    {
        'name':'Level 1',
        'backgroundLayer':[],
        'middleLayer':[],
        'foregroundLayer':[],
    },
    {
        'name':'Level 2',
        'backgroundLayer':[],
        'middleLayer':[],
        'foregroundLayer':[],
    },
    {
        'name':'Level 3',
        'backgroundLayer':[],
        'middleLayer':[],
        'foregroundLayer':[],
    },
    {
        'name':'ENDING SCREEN',
        'context':'Thx for playing!',
        'times':'Time: XX:XX:XX',
        'deaths':'Deaths: XX',
        'tips':'Press enter to continue',
    },
];

//scene[0] 启动场景
//scene[scene.length-1] 结束场景








//@创建地图的思路
/*
0.背景层    water
1.中间层
    1.碰撞层
    2.装饰层
    3.对象层
3.前景层 瀑布 会消失的块
*/


// 遍历scene数组的每个元素
for (let i = 0; i < scene.length; i++) {
    //console.log(scene[i].name);
    
}