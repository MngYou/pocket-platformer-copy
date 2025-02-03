
let Game_Data = {
    
};


var draw_pick = {
    pencil:{value:true,index:3},        //点触填充
    brush:{value:false,index:2},        //刷子填充
    bucket:{value:false,index:1},       //全部填充
    eraser:{value:false,index:0}        //橡皮擦
};

var colorPalette_take = -1;//取色板的颜色

var tabers_index = 0;   //工具箱选项卡索引
var typeFrameArray = [];         //工具箱的框架

var itemImage = [];                     //瓷砖块【整体】含64个小方块
var getTiled = {};                   //瓷砖块   点击时选择瓷砖
var allTileds = [];                     //所有的瓷砖集合


var getAnimationFrameIndex = 0; //点击animation关键帧的时候选择瓷砖

var draw_block_container = {};//64方块画板的容器
var  draw_64_blocks = [];//64个画板方块


var pixelData = [];                   //当前页的像素数据集合
var allPixelData = [];                        //所有像素数据的集合

var allKeyName = [];        //下拉列表用到的数据字典
var allKeyPixel = [];



var sceneIndex = 0;                         //当前场景


var GameBackgroundColor = 'black';
var GameForegroundColor = 'white';
var Level_Size_Width = 24;  //默认的场景方块列数
var Level_SIze_Height = 14; //默认的场景方块行数
var Tile_Size = 32;//默认的瓷砖大小

Game_Data.tileSize = Tile_Size;

var 游戏花费时间 = 0;
var 死亡次数 = 0;

let level_editor = {
    'backgroundLayer':[],
    'middleLayer':[],
    'foregroundLayer':[],
};            //每个关卡的编辑区容器

let level_editor_layer_key = [
    'backgroundLayer',
    'middleLayer',
    'foregroundLayer'
];
Game_Data.level_editor_layer_key = level_editor_layer_key;



let game;
let isGamePaused = !false;
let isPlayerMoveEnable = true;