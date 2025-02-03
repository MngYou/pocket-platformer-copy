
//@工具箱数据
let itemData = {
    '1':{
        'type':'tiles',
        'count':22,
        'item':{
            'left top':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['BABABABA,AAAAAAAA,BA887773,AA887773,BA778886,AA778886,BA778886,AA336666']},
                'image':'tiles/left_top.png'}, 
            'middle top':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['BABABABA,AAAAAAAA,28887773,28887773,47778886,47778886,47778886,33333666']},
                'image':'tiles/middle_top.png'}, 
            'right top':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['BABABABA,AAAAAAAB,288877AA,288877AB,477788AA,477788AB,477788AA,333336AB']},
                'image':'tiles/right_top.png'}, 
            'left':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['BA224444,AA887773,BA887773,AA887773,BA778886,AA778886,BA778886,AA336666']},
                'image':'tiles/left.png'},  
            'middle':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['22224444,28887773,28887773,28887773,47778886,47778886,47778886,33336666']},
                'image':'tiles/middle.png'}, 
            'right':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['222244AA,288877AB,288877AA,288877AB,477788AA,477788AB,477788AA,333366AB']},
                'image':'tiles/right.png'}, 
            'left bottom':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['BA224444,AA887773,BA887773,AA887773,BA778886,AA778886,BAAAAAAA,ABABABAB']},
                'image':'tiles/left_bottom.png'}, 
            'middle bottom':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['22224444,28887773,28887773,28887773,47778886,47778886,AAAAAAAA,ABABABAB']},
                'image':'tiles/middle_bottom.png'}, 
            'right bottom':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['222244AA,288877AB,288877AA,288877AB,477788AA,477788AB,AAAAAAAA,ABABABAB']},
                'image':'tiles/right_bottom.png'}, 
            'top and bottom':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['BABABABA,AAAAAAAA,28887773,28887773,47778886,47778886,AAAAAAAA,BABABABA']},
                'image':'tiles/top_and_bottom.png'}, 
            'left and right':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['BA2244AB,AA8877AA,BA8877AB,AA8877AA,BA7788AB,AA7788AA,BA7788AB,AA3366AA']},
                'image':'tiles/left_and_right.png'}, 
            'all sides':{
                'tip':'平台瓷砖',
                'description':'Just a solid block.Hold CTRL in game screen to draw bigger areas.',
                'pixel':{'data':['BABABABA,AAAAAAAB,BA8877AA,AA8877AB,BA7788AA,AA7788AB,BAAAAAAA,ABABABAB']},
                'image':'tiles/all_sides.png'}, 
            'one way block':{
                'tip':'只有上面可以站立',
                'description':'The player can jump through it,but will land on it when he falls.',//玩家可以跳过它，但当他跌倒时会落在上面。
                'pixel':{'data':['.44..44.,33343334,53345334,.55..55.,........,........,........,........']},
                'image':'tiles/one_way_block.png'}, 
            'disappearing block':{
                'tip':'触碰后消失的瓷砖',
                'description':'A block that will disappear upon touching it.It will reappear after a certain time.',//一块一碰就会消失的东西过一段时间就会重新出现
                'pixel':{'data':['56886555,68888586,88886566,68866555,66665686,56656886,55556665,56655555']},
                'image':'tiles/disappearing_block.png'}, 
            'water':{
                'tip':'水方块',
                'description':"A passable block that slows down gravity and let's you jump infinitely inside it.Every object can be placed on it.",//一个可以通过的障碍物可以减缓引力让你无限跳进去。每个物体都可以放在上面。
                'pixel':{'data':['EEEEEEEE,EEEEEEEE,EFEEEEEE,EEEEEEEE,EEEEEFEE,EEEEEEEE,EEEEEEEE,EEEEEEEE','EEEEEEEE,EEEEEEEE,EEEEEEEE,EFEEEEEE,EEEEEEEE,EEEEEFEE,EEEEEEEE,EEEEEEEE']},
                'image':'tiles/water.png'},
            'red block':{
                'tip':'红砖块',
                'description':'There are red blocks and blue blocks.Only one them can be active at a time.By touching the switch(in the objects tab),the active tiles can be switched.',//有红色块和蓝色块。一次只能激活一个。通过触摸开关(在对象选项卡中) ，激活的瓷砖可以被切换
                'pixel':{'data':['44444444,43333336,43333336,43333336,43333336,43333336,43333336,46666666','33.33.33,3......3,........,3......3,3......3,........,3......3,33.33.33']},
                'image':'tiles/red_block.png'},
            'blue block':{
                'tip':'蓝砖块',
                'description':"There are red blocks and blue blocks.Only one them can be active at a time.By touching the switch(in the objects tab),the active tiles can be switched.",//有红色块和蓝色块。一次只能激活一个。通过触摸开关(在对象选项卡中) ，激活的瓷砖可以被切换
                'pixel':{'data':['FFFFFFFF,FEEEEEED,FEEEEEED,FEEEEEED,FEEEEEED,FEEEEEED,FEEEEEED,FDDDDDDD','DD.DD.DD,D......D,........,D......D,D......D,........,D......D,DD.DD.DD']},
                'image':'tiles/blue_block.png'},
            'red and blue switch':{
                'tip':'红蓝瓷砖开关',
                'description':"A switch for red/blue tiles.Can be activated by hitting it with your head,or if a stomper/cannon-ball/rocket hits it.",//红色/蓝色瓷砖的开关。可以通过用头撞击它来激活，或者当践踏者/炮弹/火箭弹撞击它时激活
                'squishAnimation':true,
                'pixel':{'data':['44444444,43333336,43222336,43233236,43222336,43233236,43333336,46666666','FFFFFFFF,FEEEEEED,FE2222ED,FE222EED,FE2EE2ED,FE222EED,FEEEEEED,FDDDDDDD']},
                'image':'tiles/red_and_blue_switch.png'},
            'treadmill':{
                'tip':'跑步机',
                'description':"It will move the player in a certain direction when he stands on it.Click on a set treadmill again to change it's direction.(Or press shift before placing it)",//当玩家站在上面的时候，它会向某个方向移动。再次点击一个固定的跑步机来改变它的方向。(或在放置前按 Shift)
                'pixel':{'data':['99911199,1CC99CC9,11999111,CCCCCCCC,99999999,9C1CC919,99999999,CCCCCCCC','11199911,9CC11CC1,99119999,CCCCCCCC,99999999,9C1CC919,99999999,CCCCCCCC']},
                'image':'tiles/treadmill.png'},
            'ice block':{
                'tip':'冰块',
                'description':"It's slippery.The player can't stick to it if walljump is active.",//它很滑，如果壁跳是活动的，玩家就不能坚持到底。
                'pixel':{'data':['FFFFFFFF,FEEEEEED,FEEFEEED,FEFEEFED,FEEEFEED,FEEFEEED,FEEEEEED,FDDDDDDD']},
                'image':'tiles/ice_block.png'},
            'foreground tile':{
                'tip':'前景瀑布',
                'description':"It will be displayed above tiles,objects and even the player.It doesn't have any collision.You can hide secret passages behind them.",//它将显示在瓷砖，对象，甚至播放器。没有任何碰撞。你可以把秘密通道藏在后面。
                'pixel':{'data':['EEEEEEEE,FEEFFEEF,EFFEEFFE,EEEEEEEE,EEEEEEEE,FEEFFEEF,EFFEEFFE,EEEEEEEE','EFFEEFFE,EEEEEEEE,EEEEEEEE,FEEFFEEF,EFFEEFFE,EEEEEEEE,EEEEEEEE,FEEFFEEF']},
                'image':'tiles/foreground_tile.png'},
            'disappearing foreground':{
                'tip':'会消失的前景瓷砖',
                'description':"It will be displayed above tiles,objects and even the player.Once the player touches it,the tile and all it's neighbours disappear.You can hide secrets behind it.",//它将显示在瓷砖，对象，甚至播放器上方。一旦玩家触摸它，瓷砖和它的所有邻居消失。你可以把秘密藏起来。
                'pixel':{'data':['22424444,28487773,24887773,28887773,47778886,47778846,47378486,33336466']},
                'image':'tiles/disappearing_foreground.png'},
        },
    },
    '2':{
        'type':'objects',
        'count':19,
        'item':{
            'start flag':{
                'description':'The starting point of a level. You also respawn here, if you die. <br/> If you create multiple start-flags, for non-linear games, you can click on a set start flag again, to declare it as the default start of a level.',
                'pixel':{'data':['233.....,23333...,2333333.,23333...,233.....,2.......,2.......,2.......']},
                'image':'objects/startflag.png'},
            'checkpoint':{
                'description':'If the player touches the checkpoint, he will respawn here after a death. If there are multiple checkpoints, the latest one the player touched will become the respawn point.',
                'pixel':{'data':['288.....,2888....,28888...,288888..,2888888.,2.......,2.......,2.......','288.....,28888...,2888888.,28888...,288.....,2.......,2.......,2.......']},
                'image':'objects/checkpoint.png'},
            'finish flag':{
                'description':'The goal of a level. If you touch it, by default you continue to the next level. If you want to specify a custom exit to a different level, click on a set finish flag again. <br/>',
                'pixel':{'data':['2AA.....,2AAAA...,2AAAAAA.,2AAAA...,2AA.....,2.......,2.......,2.......']},
                'image':'objects/finishflag.png'},
            'spike':{
                'description':'A spike. If you touch it, you die',
                'pixel':{'data':['....9...,...99...,..9119..,991C219.,.91CC199,..9119..,...99...,...9....']},
                'image':'objects/spike.png'},
            'trampoline':{
                'description':'A trampoline. You will jump approximately twice as high when you land on it.',
                'squishAnimation':true,
                'pixel':{'data':['........,........,43333334,43333334,..1192..,..CCCC..,..1192..,..CCCC..','43333334,43333334,..1192..,..CCCC..,..1192..,..CCCC..,..1192..,..CCCC..']},
                'image':'objects/trampoline.png'},
            'cannon':{
                'description':'A cannon. It shoots cannonballs at certain time intervals. Click on it after placing it again, to change the attributes of the individual cannon.',//cannonballs为超链接点击时可以修改其动画
                'squishAnimation':true,
                'pixel':{'data':['2...222.,22.2...2,2.2....2,2......2,2......2,2.2....2,22.2...2,2...222.']},
                'image':'objects/cannon.png'},
            'stomper':{
                'description':"A deadly hazard, that will fly torwards the player, if he is in it's way and move back to it's initial place once it hits a solid block. Can be rotated by clicking on a placed object again.",
                'squishAnimation':true,
                'pixel':{'data':['11.11.11,1C.CC.C1,..1111..,1C2112C1,1C3113C1,..1111..,1C.CC.C1,11.11.11']},
                'image':'objects/stomper.png'},
            'togglemine':{
                'description':'An object that is harmless at first, but once you step in and out of it, it becomes deadly.',
                'pixel':{'data':['........,...11...,..1..1..,.1....1.,.1....1.,..1..1..,...11...,........','...33...,..3..3..,.3....3.,3.2..2.3,3......3,.3....3.,..3..3..,...33...']},
                'image':'objects/togglemine.png'},
            'rocket launcher':{
                'description':'A rocket-launcher. It shoots rockets at certain time intervals that will follow the player. Click on it after placing it again, to change the attributes of the individual cannon.',//为超链接点击时可以修改其动画
                'squishAnimation':true,
                'rotateable':true,
                'pixel':{'data':['........,....11..,113311C.,111111CC,222222CC,223322C.,....22..,........']},
                'image':'objects/rocketlauncher.png'},
            'npc':{
                'description':'An object that can display a dialogue. Click on it again after placing it, to display the dialogue window.',
                'pixel':{'data':['........,88888886,87227276,87777776,87272276,66666666,...55...,...55...']},
                'image':'objects/npc.png'},
            'portal':{
                'description':'A portal with 2 exits.Just draw 2 portals on the game screen. The odd one will automatically be the first, the even one the second.',
                'squishAnimation':true,
                'pixel':{'data':['...22...,..DDDD..,.DDEEDD.,2DEFFED2,2DEFFED2,.DDEEDD.,..DDDD..,...22...','...22...,..6666..,.667766.,26788762,26788762,.667766.,..6666..,...22...']},
                'image':'objects/portal.png'},
            'collectible':{
                'description':'They can be placed to give the player an additional challenge. <br/> Inside the tool, the collectibles will reappear if you die or reset the level, in the exported game they are gone forever, once collected.',
                'pixel':{'data':['........,...22...,..2887..,..2887..,..2887..,..2887..,...77...,........','........,...22...,...28...,...28...,...28...,...28...,...88...,........']},
                'image':'objects/collectible.png'},
            'laser cannon':{
                'description':'A laser cannon. It shoots lasers until they hit a wall. Click on it after placing it again, to change the attributes of the individual laser cannon.',
                'squishAnimation':true,
                'pixel':{'data':['CCCCC5..,C5555C9.,C5555C91,C9449C92,C9339C92,C5555C91,C5555C9.,CCCCCC..']},
                'image':'objects/lasercannon.png'},
            'barrel':{
                'description':"A barrel. When the player touches it, he gets inside of it and stays there, until he presses the jump button - then he will be launched out of it in it's direction.",
                'squishAnimation':true,
                'pixel':{'data':['..C88C..,.817718.,C712617C,17222271,17222271,C712617C,.817718.,..C88C..']},
                'image':'objects/barrel.png'},
            'jump reset':{
                'description':'It resets your jump in air. It is deactivated upon touching the ground or wall.',
                'pixel':{'data':['..2222..,.2....2.,2..EE..2,2.EEEE.2,2..EE..2,2..EE..2,.2....2.,..2222..']},
                'image':'objects/jumpreset.png'},
            'autorun':{
                'description':"Activates auto-run mode upon touching. <br/> The auto-run can be stopped by the auto-run stopper tile. <br/> Jumping off a wall will change the run direction. Click on a set object again, to change it's default direction.",
                'pixel':{'data':['77....77,7......7,....7...,..7777..,..7777..,....7...,7......7,77....77','77....77,7......7,....6...,..6666..,..6666..,....6...,7......7,77....77']},
                'image':'objects/autorun.png'},
            'auto-run stopper':{
                'description':'This tile stops the auto-run activated by the auto-run sprite.',
                'pixel':{'data':['..4444..,.455554.,45455554,45545554,45554554,45555454,.455554.,..4444..','..4444..,.433334.,43433334,43343334,43334334,43333434,.433334.,..4444..']},
                'image':'objects/auto-runstopper.png'},
            'path':{
                'description':"Draw paths, put objects on top and the objects will follow them. Click on an already set path-point, while paths are selected in build-tools to adjust the path's attributes.",
                'pixel':{'data':['........,........,........,22.22.22,CC.CC.CC,........,........,........']},
                'image':'objects/path.png'},
            'rotating fireball':{
                'description':"Several fireballs will rotate around a center point. Click on it after placing it again, to change it's attributes.",
                'pixel':{'data':['..333...,.333333.,333....3,33..33..,3333883.,3388883.,.333333.,..333...','...333..,.333333.,.3888833,.3883333,..33..33,3....333,.333333.,...333..']},
                'image':'objects/rotatingfireball.png'},
        },
    },
    '3':{
        'type':'deco',//decorational装饰品
        'count':18,
        'item':{
            'deco 1':{
                'tip':'装饰：草丛',
                'description':'Just a decorational Element.',//只是一个装饰元素
                'pixel':{'data':['........,........,........,........,...A...A,.A.A.A.A,.AAAAA.A,AAAAAA.A']},
                'image':'deco/deco1.png'},
            'deco 2':{
                'tip':'装饰：小花',
                'description':'Just a decorational Element.',
                'pixel':{'data':['........,........,........,........,.....33.,.44.3..3,4..4.33.,.44..AA.']},
                'image':'deco/deco2.png'},
            'deco 3':{
                'tip':'装饰：大花',
                'description':'Just a decorational Element.',
                'pixel':{'data':['...22...,22.22.22,222DD222,...DD...,22E..E22,222EE222,...22...,........']},
                'image':'deco/deco3.png'},
            'deco 4':{
                'tip':'装饰：小草',
                'description':'Just a decorational Element.',
                'pixel':{'data':['.B.AA.B.,.BBAABB.,..BAAB..,...AA...,.B.AA.B.,.BBAABB.,..BAAB..,...AA...']},
                'image':'deco/deco4.png'},
            'deco 5':{
                'tip':'装饰：栅栏',
                'description':'Just a decorational Element.',
                'pixel':{'data':['........,........,5......6,57777776,5......6,57777776,5......6,57777776']},
                'image':'deco/deco5.png'},
            'deco 6':{
                'tip':'装饰：花瓶',
                'description':'Just a decorational Element.',
                'pixel':{'data':['C991199C,.C9119C.,..8888..,.CD44DC.,CC9119CC,CC9119CC,CC9119CC,.C9119C.']},
                'image':'deco/deco6.png'},
            'deco 7':{
                'tip':'装饰：瓷砖1',
                'description':'Just a decorational Element.',
                'pixel':{'data':['55555555,.5..5.5.,.5.5..5.,.5.55.5.,.5..5.5.,.5.5..5.,.5.55.5.,55555555']},
                'image':'deco/deco7.png'},
            'deco 8':{
                'tip':'装饰：瓷砖2',
                'description':'Just a decorational Element.',
                'pixel':{'data':['55555.55,55555.55,........,55.55555,55.55555,........,55555.55,55555.55']},
                'image':'deco/deco8.png'},
            'deco 9':{
                'tip':'装饰：火把🔥',
                'description':'Just a decorational Element.',
                'pixel':{'data':['...7....,..787...,.78287..,.78287..,.91119..,..919...,...9....,...9....','...6....,..686...,.68286..,.68286..,.91119..,..919...,...9....,...9....']},
                'image':'deco/deco9.png'},
            'deco 10':{
                'tip':'装饰：云☁',
                'description':'Just a decorational Element.',
                'pixel':{'data':['........,...22...,..2222..,.222222.,FF22222.,FF222222,.FFFFFF.,........']},
                'image':'deco/deco10.png'},
            'deco 11':{
                'tip':'装饰：发光体1',
                'description':'Just a decorational Element.',
                'pixel':{'data':['........,..4.....,.424....,..4..4..,....424.,..4..4..,.424....,..4.....','........,..C.....,.C4C....,..C..C..,....C4C.,..C..C..,.C4C....,..C.....']},
                'image':'deco/deco11.png'},
            'deco 12':{
                'tip':'装饰：发光体2',
                'description':'Just a decorational Element.',
                'pixel':{'data':['........,...D....,...E....,..EFE...,DEFFFED.,..EFE...,...E....,...D....','........,...C....,...D....,..DFD...,CDFFFDC.,..DFD...,...D....,...C....']},
                'image':'deco/deco12.png'},
            'deco 13':{
                'tip':'装饰：仙人掌🌵',
                'description':'Just a decorational Element.',
                'pixel':{'data':['...BA...,.B.BA...,.B.BA...,.BBBA.B.,...BA.B.,...BBBB.,...BA...,...BA...']},
                'image':'deco/deco13.png'},
            'deco 14':{
                'tip':'装饰：树🌳',
                'description':'Just a decorational Element.',
                'pixel':{'data':['..BBBB..,.BBABAB.,.BABAAB.,.BBAABB.,.BAA5AB.,..B56B..,...56...,...56...']},
                'image':'deco/deco14.png'},
            'deco 15':{
                'tip':'装饰：一坨屎',
                'description':'Just a decorational Element.',
                'pixel':{'data':['........,........,........,.....1..,.1......,....6...,..6666..,.666666.','........,........,........,..1.....,......1.,....6...,..6666..,.666666.']},
                'image':'deco/deco15.png'},
            'deco 16':{
                'tip':'装饰：小鸟🐦',
                'description':'Just a decorational Element.',
                'pixel':{'data':['........,........,.EEEE...,.EE.E...,88EEE...,.EEEEEEE,..EEEEE.,...88...','........,.EEEE...,8EE.E...,.8EEE...,8EEEEEEE,..EEEEE.,....8...,...88...']},
                'image':'deco/deco16.png'},
            'deco 17':{
                'tip':'装饰：雪人⛄',
                'description':'Just a decorational Element.',
                'pixel':{'data':['...22...,..2.12..,..2277..,6..22..6,.622.26.,.222222.,.222.22.,..2222..']},
                'image':'deco/deco17.png'},
            'deco 18':{
                'tip':'装饰：小怪👾',
                'description':'Just a decorational Element.',
                'pixel':{'data':['44....43,3.E2E2.3,.3DEDE3.,..3444..,...34...,..4344..,...34...,..4..4..','........,33....33,3.3434.3,.333333.,..3444..,...34...,..4344..,..4..4..']},
                'image':'deco/deco18.png'},
            
        },
    },
};//方法method 属性attribute



// 遍历itemData对象的每个属性
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



//@创建地图的思路
/*
0.背景层    water
1.碰撞层
2.装饰层
3.对象层
4.前景层 瀑布 会消失的块
*/





//编辑器提示语
this.proTips = [
    "Delete elements from the game and draw screen with the right mouse.",
    "Use import/export as a save/load function, to continue working on your game later on.",
    "Some elements, like canons, have changeable attributes. Click on them in the game screen again to see the options.",
    "Player can be dragged around the game screen in build mode.",
    "On high levels, camera can be moved vertically with the mouse wheel.",
    "Cannonballs and rockets can trigger the red/blue switch.",
    "Stompers can collide with each other",
    "Press shift in build mode to rotate the currently selected object (if it's rotateable)",
    "Hold CTRL to draw bigger areas of objects on the screen. Hold CTRL + right mouse to delete bigger areas.",
]



//边缘砖块描述语
//"Will display on the edge of the game screen",

//A cannonball.

//A rocket. The <span class='textAsLink' onclick=\"DrawSectionHandler.changeSelectedSprite({ target: { value:  'Rocket launcher'} }, true)\">rocket launcher</span> shoots it.



//A laser. The <span class='textAsLink' onclick=\"DrawSectionHandler.changeSelectedSprite({ target: { value:  'Laser cannon'} }, true)\">laser cannon</span> shoots it. <br/>