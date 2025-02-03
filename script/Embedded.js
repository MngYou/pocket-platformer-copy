function Embedded(){
    //1.style.css
    const css = `*{
    margin: 0%;
    padding: 0%;
    background-color: lightgray;
    position: absolute;
    cursor:pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
.tiles-scrollbar::-webkit-scrollbar {
    width: 0;
    background-color: transparent; 
  }
  `;
    //2.index.html
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>platform editor</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdn.bootcdn.net/ajax/libs/phaser/3.80.0/phaser.min.js"></script>
    <script src="PolygonCollider.js"></script>
    <script src="exported.js"></script>
</head>
<body> 
    <div id="game"></div>
    <script>
        var scene = Game_Data.scene;
        var itemData = Game_Data.itemData;
        var Tile_Size = Game_Data.Tile_Size;
        var level_editor_layer_key = Game_Data.level_editor_layer_key;
        let isPlayerMoveEnable = true;
        let Cloumn = scene[1].backgroundLayer.length;
        let Row = scene[1].backgroundLayer[0].length;
            // 你可以通过JavaScript来禁止右键菜单
            document.addEventListener('contextmenu', function(e) {
                e.preventDefault();
            });
    </script>
    <script>
    </script>
    <script src="game.js"></script>
    <script src="main.js"></script>
</body>
</html>`;
    //3. game.js
    const game = `class GameScene extends Phaser.Scene {
    moveSpeed = 6;
    jumpSpeed = 7;
    shape2dCollider = new PolygonCollider();
    textureKeys = [];
    isLeftKeyDown = false;
    allKeyName = ['left top', 'middle top', 'right top', 'left', 'middle', 'right', 'left bottom', 'middle bottom', 'right bottom', 'top and bottom', 'left and right', 'all sides', 'one way block', 'disappearing block', 'red block', 'blue block', 'red and blue switch', 'treadmill', 'ice block', 'spike', 'trampoline', 'cannon', 'stomper', 'npc', 'laser cannon'];
    treadmillTimerIDs = [];
    levelIndex = 0;
    mapTiles = [];
    initPlayerXY = {
        x: 0,
        y: 0
    };
    intoNextScene = false;
    collectedCount = 0;
    constructor() {
        super({
            key: 'gameScene',
            physics: {
                default: 'matter',
                matter: {
                    debug: !true
                }
            }
        })
    }
    preload() {
        let pixelDatas = [];
        for (let key in itemData) {
            if (itemData.hasOwnProperty(key)) {
                const items = itemData[key].item;
                for (let key2 in items) {
                    pixelDatas.push(items[key2]['pixel']['data']);
                    let pixelDataArray = pixelDatas[pixelDatas.length - 1][0].split(',');
                    let dudeData = pixelDataArray;
                    this.textures.generate(key2, {
                        data: dudeData,
                        pixelWidth: 4,
                        pixelHeight: 4
                    });
                    this.textureKeys.push({
                        key1: key2
                    });
                    if (pixelDatas[pixelDatas.length - 1].length > 1) {
                        let pixelDataArray = pixelDatas[pixelDatas.length - 1][1].split(',');
                        let dudeData = pixelDataArray;
                        this.textures.generate(key2 + '2', {
                            data: dudeData,
                            pixelWidth: 4,
                            pixelHeight: 4
                        });
                        this.textureKeys[this.textureKeys.length - 1].key2 = key2 + '2'
                    }
                }
            }
        }
        this.pixel = {
            'blackbackground': '00000000,00000000,00000000,00000000,00000000,00000000,00000000,00000000',
            'player_idle': '........,..DDDD..,.DDDDDDD,..42646.,..44444.,..3333..,.4.33.4.,..6..6..',
            'player_jump': '..DDDD.D,.DDDDDD.,..42545.,..44444.,.433334.,...337..,..7.....,........',
            'player_walk1': '..DDDD.D,.DDDDDD.,..42545.,..44444.,..33334.,.43337..,..7.....,........',
            'player_walk2': '........,..DDDD..,.DDDDDDD,..42545.,..44444.,..3333..,.4633.4.,....6...',
            'spike': '....2...,...22...,..2222..,..2222..,.222222.,.222222.,22222222,22222222',
            'rocket': '........,.....2..,....22..,33222287,33111187,....11..,.....1..,........',
            'cannon ball': '..2222..,.244442.,24442442,24444242,24444442,24444442,.244442.,..2222..',
            'tipBoard': '...22...,..2222..,.222222.,22222222,........,........,........,........',
            'laser': '........,........,..8...8.,..3...3.,.3.3.3.3,8...8...,........,........',
            'laser2': '........,........,8...8...,3...3...,.3.3.3.3,..8...8.,........,........',
            'laser_': '..7.....,...3....,....37..,...3....,..7.....,...3....,....37..,...3....',
            'laser_2': '....37..,...3....,..7.....,...3....,....37..,...3....,..7.....,...3....',
        };
        let pixelDataArray = this.pixel.blackbackground.split(',');
        let dudeData = pixelDataArray;
        this.textures.generate('blackbackground', {
            data: dudeData,
            pixelWidth: 400,
            pixelHeight: 400
        });
        pixelDataArray = this.pixel.player_idle.split(',');
        dudeData = pixelDataArray;
        this.textures.generate('player_idle', {
            data: dudeData,
            pixelWidth: 4,
            pixelHeight: 4
        });
        pixelDataArray = this.pixel.player_jump.split(',');
        dudeData = pixelDataArray;
        this.textures.generate('player_jump', {
            data: dudeData,
            pixelWidth: 4,
            pixelHeight: 4
        });
        pixelDataArray = this.pixel.player_walk1.split(',');
        dudeData = pixelDataArray;
        this.textures.generate('player_walk1', {
            data: dudeData,
            pixelWidth: 4,
            pixelHeight: 4
        });
        pixelDataArray = this.pixel.player_walk2.split(',');
        dudeData = pixelDataArray;
        this.textures.generate('player_walk2', {
            data: dudeData,
            pixelWidth: 4,
            pixelHeight: 4
        });
        pixelDataArray = this.pixel.spike.split(',');
        dudeData = pixelDataArray;
        this.textures.generate('spike_', {
            data: dudeData,
            pixelWidth: 32 / 9,
            pixelHeight: 32 / 9
        });
        pixelDataArray = this.pixel.rocket.split(',');
        dudeData = pixelDataArray;
        this.textures.generate('rocket', {
            data: dudeData,
            pixelWidth: 32 / 9,
            pixelHeight: 32 / 9
        });
        pixelDataArray = this.pixel["cannon ball"].split(',');
        dudeData = pixelDataArray;
        this.textures.generate('cannon ball', {
            data: dudeData,
            pixelWidth: 32 / 9,
            pixelHeight: 32 / 9
        });
        pixelDataArray = this.pixel["tipBoard"].split(',');
        dudeData = pixelDataArray;
        this.textures.generate('tipBoard', {
            data: dudeData,
            pixelWidth: 32 / 9,
            pixelHeight: 32 / 9
        });
        pixelDataArray = this.pixel["laser"].split(',');
        dudeData = pixelDataArray;
        this.textures.generate('laser', {
            data: dudeData,
            pixelWidth: 32 / 9,
            pixelHeight: 32 / 9
        });
        pixelDataArray = this.pixel["laser2"].split(',');
        dudeData = pixelDataArray;
        this.textures.generate('laser2', {
            data: dudeData,
            pixelWidth: 32 / 9,
            pixelHeight: 32 / 9
        });
        pixelDataArray = this.pixel["laser_"].split(',');
        dudeData = pixelDataArray;
        this.textures.generate('laser_', {
            data: dudeData,
            pixelWidth: 32 / 9,
            pixelHeight: 32 / 9
        });
        pixelDataArray = this.pixel["laser_2"].split(',');
        dudeData = pixelDataArray;
        this.textures.generate('laser_2', {
            data: dudeData,
            pixelWidth: 32 / 9,
            pixelHeight: 32 / 9
        })
    }
    create() {
        let that = this;
        let sceneIndex = 0; //@START SCREEN
        (function(that) {
            let sceneIndex = 0;
            that.startPage = that.add.group();
            let bg = that.add.image(0, 0, 'blackbackground').setOrigin(0.5);
            let context_text = scene[sceneIndex].context;
            let tips_text = scene[sceneIndex].tips;
            let content = that.add.text(100, 100, context_text, {
                fill: 'red',
                fontSize: 36
            }).setOrigin(0.5, 0.5);
            let tips = that.add.text(100, 100, tips_text, {
                fill: 'red',
                fontSize: 36
            }).setOrigin(0.5, 0.5);
            content.setPosition(that.game.config.width / 2, that.game.config.height / 2.5);
            tips.setPosition(that.game.config.width / 2, that.game.config.height / 1.75);
            that.startPage.add(bg);
            that.startPage.add(content);
            that.startPage.add(tips);
            that.startPage.setVisible(true)
        })(this);
        this.levelMapDatas = [];
        for (let i = 1; i < scene.length - 1; i++) {
            this.levelMapDatas[i] = scene[i]
        }
        this.levelMapDatas.shift();
        let gamePage = this.add.group();
        let bg = this.add.image(0, 0, 'blackbackground').setOrigin(0.5);
        gamePage.add(bg);
        this.clearLevelLayer();
        this.createLevelLayer(0);
        this.createPlayer(); //@ENDING SCREEN
        (function(that) {
            let sceneIndex = scene.length - 1;
            that.endPage = that.add.group();
            let bg = that.add.image(0, 0, 'blackbackground').setOrigin(0.5);
            let context_text = scene[sceneIndex].context;
            let times_text = scene[sceneIndex].times;
            let deaths_text = scene[sceneIndex].deaths;
            let tips_text = scene[sceneIndex].tips;
            let content = that.add.text(100, 100, context_text, {
                fill: 'white',
                fontSize: 36
            }).setOrigin(0.5, 0.5);
            let times = that.add.text(100, 100, times_text, {
                fill: 'white',
                fontSize: 36
            }).setOrigin(0.5, 0.5);
            let deaths = that.add.text(100, 100, deaths_text, {
                fill: 'white',
                fontSize: 36
            }).setOrigin(0.5, 0.5);
            let tips = that.add.text(100, 100, tips_text, {
                fill: 'white',
                fontSize: 36
            }).setOrigin(0.5, 0.5);
            content.setPosition(that.game.config.width / 2, that.game.config.height / 3.5);
            times.setPosition(that.game.config.width / 2, that.game.config.height / 2.25);
            deaths.setPosition(that.game.config.width / 2, that.game.config.height / 1.7);
            tips.setPosition(that.game.config.width / 2, that.game.config.height / 1.35);
            that.endPage.add(bg);
            that.endPage.add(content);
            that.endPage.add(times);
            that.endPage.add(deaths);
            that.endPage.add(tips);
            that.endPage.setVisible(false)
        })(this); //@键盘事件
        this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER).on('down', enterKeyDown, this);

        function enterKeyDown() {
            console.log('Enter key was pressed!');
            sceneIndex++;
            switch (sceneIndex) {
                case 1:
                    this.startPage.setVisible(false);
                    break;
                case scene.length - 1:
                    this.endPage.setVisible(true);
                    break;
                default:
                    break
            }
        }
        let autoTimerID;
        this.matter.world.on('collisionstart', (event, bodyA, bodyB) => {
            if (bodyA.label == 'rotating fireball' && bodyB.label == 'player') {
                this.createPlayer()
            }
            if (bodyA.label == 'autorun' && bodyB.label == 'player') {
                console.log(bodyA.gameObject);
                bodyB.gameObject.autoRunEnable = true;
                autoTimerID = setInterval(() => {
                    let v = 1;
                    if (bodyA.gameObject.direction == 'right') {
                        v = -1
                    } else {
                        v = 1
                    }
                    bodyB.gameObject.x += bodyA.gameObject.speed * v
                }, 16);
                bodyB.gameObject.autoTimerIDs.push(autoTimerID);
                if (bodyB.gameObject.autoTimerIDs.length > 1) {
                    clearInterval(bodyB.gameObject.autoTimerIDs[0]);
                    bodyB.gameObject.autoTimerIDs.shift()
                }
            }
            if (bodyA.label == 'auto-run stopper' && bodyB.label == 'player') {
                if (bodyB.gameObject.autoRunEnable) {
                    bodyB.gameObject.x = bodyA.gameObject.x;
                    bodyB.gameObject.y = bodyA.gameObject.y;
                    bodyB.gameObject.autoRunEnable = false;
                    for (let i = 0; i < bodyB.gameObject.autoTimerIDs.length; i++) {
                        clearInterval(bodyB.gameObject.autoTimerIDs[i])
                    }
                }
            }
            if (bodyA.label == 'jump reset' && bodyB.label == 'player') {
                console.log(bodyA.gameObject)
            }
            if (bodyB.label == 'player') {
                let barrels = this.getSpritesByKey('barrel');
                if (barrels.length > 0) {
                    for (let i = 0; i < barrels.length; i++) {
                        if (bodyA.label == 'jump reset') {
                            console.log('reset');
                            barrels[i].inBarrel = false;
                            this.player.inBarrel = false;
                            this.player.body.ignoreGravity = false;
                            this.player.canTwinceJump = true;
                            this.player.twinceJumpEnable = true;
                            this.player.x = bodyA.gameObject.x;
                            this.player.y = bodyA.gameObject.y;
                            clearInterval(barrels[i].timerID);
                            return false
                        }
                        barrels[i].inBarrel = false;
                        this.player.inBarrel = false;
                        this.player.body.ignoreGravity = false;
                        clearInterval(barrels[i].timerID)
                    }
                }
            }
            if (bodyA.label == 'laser' && bodyB.label == 'player') {
                this.createPlayer()
            }
            if (bodyA.label == 'portal' && bodyB.label == 'player') {
                let portalImports = this.getSpritesByKey('portal');
                let portalExports = this.getSpritesByKey('portal2');
                for (let i = 0; i < portalImports.length; i++) {
                    if (portalImports[i].x == bodyA.gameObject.x && portalImports[i].y == bodyA.gameObject.y) {
                        let x = 1;
                        if (this.isLeftKeyDown) {
                            x = 1
                        } else {
                            x = -1
                        }
                        bodyB.gameObject.x = portalExports[i].x + bodyA.gameObject.width * x;
                        bodyB.gameObject.y = portalExports[i].y
                    }
                }
                for (let i = 0; i < portalExports.length; i++) {
                    if (portalExports[i].x == bodyA.gameObject.x && portalExports[i].y == bodyA.gameObject.y) {
                        let x = -1;
                        if (this.isLeftKeyDown) {
                            x = 1
                        } else {
                            x = -1
                        }
                        bodyB.gameObject.x = portalImports[i].x + bodyA.gameObject.width * x;
                        bodyB.gameObject.y = portalImports[i].y
                    }
                }
            }
            if (bodyA.label == 'trampoline' && bodyB.label == 'player') {
                bodyB.gameObject.setVelocityY(-15);
                this.animationFromPixelData(bodyA.gameObject, ['trampoline', 'trampoline2'], 1, 45, 'trampoline')
            }
            if (bodyA.label == 'finish flag' && bodyB.label == 'player') {
                this.levelIndex += 1;
                this.clearLevelLayer();
                this.createLevelLayer(this.levelIndex);
                this.createPlayer();
            }
            if (bodyA.label == 'checkpoint' && bodyB.label == 'player') {
                this.initPlayerXY.x = bodyA.gameObject.x;
                this.initPlayerXY.y = bodyA.gameObject.y
            }
            if (bodyA.label == 'spike' && bodyB.label == 'player') {
                this.createPlayer()
            }
            if (bodyA.label == 'stomper' && bodyB.label == 'player') {
                this.createPlayer()
            }
            if (bodyA.label == 'togglemine' && bodyB.label == 'player') {
                if (bodyA.gameObject.LaunchEnable == false) {
                    this.time.addEvent({
                        delay: 300,
                        callback: () => {
                            let texture = that.textures.get('togglemine2');
                            let frame = texture.get(0);
                            bodyA.gameObject.setTexture(texture);
                            bodyA.gameObject.setFrame(frame);
                            bodyA.gameObject.LaunchEnable = true
                        },
                        loop: false
                    })
                }
                if ((bodyA.gameObject.texture.key == 'togglemine2')) {
                    this.createPlayer();
                    let texture = that.textures.get('togglemine');
                    let frame = texture.get(0);
                    bodyA.gameObject.setTexture(texture);
                    bodyA.gameObject.setFrame(frame);
                    bodyA.gameObject.LaunchEnable = false
                }
            }
            if (bodyA.label == 'disappearing foreground' && bodyB.label == 'player') {
                let tween = that.tweens.add({
                    targets: bodyA.gameObject,
                    alpha: 0,
                    duration: 500,
                    repeat: 0,
                    hold: 0,
                    repeatDelay: 0,
                    ease: 'linear',
                    onComplete: function() {
                        tween.destroy();
                        tween = null;
                        setTimeout(() => {
                            bodyA.gameObject.setAlpha(1)
                        }, 2000)
                    }
                })
            }
            if ((bodyA.label == 'red and blue switch' && bodyB.label == 'player')) {
                if (bodyA.bounds.max.y <= bodyB.gameObject.y) {
                    let blue_block = this.getSpritesByKey('blue block');
                    let red_block = this.getSpritesByKey('red block');
                    if (blue_block.length > 0) {
                        for (let i = 0; i < blue_block.length; i++) {
                            let texture = this.textures.get('blue block2');
                            let frame = texture.get(0);
                            blue_block[i].setTexture(texture);
                            blue_block[i].setFrame(frame);
                            blue_block[i].setSensor(true);
                            texture = this.textures.get('red block');
                            frame = texture.get(0);
                            let red_block = this.getSpritesByKey('red block2');
                            for (let i = 0; i < red_block.length; i++) {
                                red_block[i].setTexture(texture);
                                red_block[i].setFrame(frame);
                                red_block[i].setSensor(false)
                            }
                        }
                    }
                    if (red_block.length > 0) {
                        for (let i = 0; i < red_block.length; i++) {
                            let texture = this.textures.get('red block2');
                            let frame = texture.get(0);
                            red_block[i].setTexture(texture);
                            red_block[i].setFrame(frame);
                            red_block[i].setSensor(true);
                            texture = this.textures.get('blue block');
                            frame = texture.get(0);
                            let blue_block = this.getSpritesByKey('blue block2');
                            for (let i = 0; i < blue_block.length; i++) {
                                blue_block[i].setTexture(texture);
                                blue_block[i].setFrame(frame);
                                blue_block[i].setSensor(false)
                            }
                        }
                    }
                    if (bodyA.gameObject.texture.key == 'red and blue switch') {
                        let switch_block = this.getSpritesByKey('red and blue switch');
                        if (switch_block.length > 0) {
                            let texture = this.textures.get('red and blue switch2');
                            let frame = texture.get(0);
                            for (let i = 0; i < switch_block.length; i++) {
                                switch_block[i].setTexture(texture);
                                switch_block[i].setFrame(frame)
                            }
                        }
                    } else {
                        let switch_block = this.getSpritesByKey('red and blue switch2');
                        if (switch_block.length > 0) {
                            let texture = this.textures.get('red and blue switch');
                            let frame = texture.get(0);
                            for (let i = 0; i < switch_block.length; i++) {
                                switch_block[i].setTexture(texture);
                                switch_block[i].setFrame(frame)
                            }
                        }
                    }
                }
            }
            if ((bodyA.label == 'disappearing block' && bodyB.label == 'player')) {
                bodyA.xPrev = bodyA.gameObject.x;
                bodyA.yPrev = bodyA.gameObject.y;
                let tween = that.tweens.add({
                    targets: bodyA.gameObject,
                    displayHeight: 1,
                    duration: 500,
                    repeat: 0,
                    hold: 0,
                    repeatDelay: 0,
                    ease: 'linear',
                    onComplete: function() {
                        console.log('动画结束');
                        bodyA.gameObject.setPosition(bodyA.xPrev, that.matter.world.walls.top.bounds.min.y)
                    }
                });
                setTimeout(() => {
                    console.log(bodyA.xPrev, bodyA.yPrev);
                    bodyA.gameObject.setPosition(bodyA.xPrev, bodyA.yPrev);
                    let tween = that.tweens.add({
                        targets: bodyA.gameObject,
                        displayHeight: 32,
                        duration: 500,
                        repeat: 0,
                        hold: 0,
                        repeatDelay: 0,
                        ease: 'linear',
                    })
                }, 1500)
            }
        });
        this.matter.world.on('collisionactive', function(event, bodyA, bodyB) {
            if (bodyA.label == 'barrel' && bodyB.label == 'player') {
                if (bodyA.gameObject.inBarrel == false) {
                    bodyB.gameObject.x = bodyA.gameObject.x;
                    bodyB.gameObject.y = bodyA.gameObject.y;
                    bodyB.gameObject.setVelocityY(0);
                    bodyA.gameObject.LaunchEnable = true;
                    bodyA.gameObject.inBarrel = true;
                    bodyB.gameObject.inBarrel = true;
                    bodyB.gameObject.body.ignoreGravity = true
                }
            }
            if (bodyA.label == 'collectible' && bodyB.label == 'player') {
                console.log('collectible');
                that.collectedCount++;
                bodyA.gameObject.destroy()
            }
            if ((bodyA.label == 'water' && bodyB.label == 'player')) {
                bodyB.gameObject.setVelocityY(0)
            }
            if ((bodyA.label == 'ice block' && bodyB.label == 'player')) {
                let speed = 0;
                if (bodyB.gameObject.direction == 'left') {
                    speed = -3
                } else if (bodyB.gameObject.direction == 'right') {
                    speed = 3
                }
                bodyB.gameObject.x += speed
            }
            if ((bodyA.label == 'treadmill' && bodyB.label == 'player')) {
                if (bodyB.gameObject == null) {
                    return false
                }
                bodyB.gameObject.x += 10
            }
            if ((bodyA.label == 'npc' && bodyB.label == 'player')) {
                bodyA.gameObject.tipBoard.setAlpha(1)
            }
        });
        this.matter.world.on('collisionend', function(event, bodyA, bodyB) {
            if ((bodyA.label == 'npc' && bodyB.label == 'player')) {
                bodyA.gameObject.tipBoard.setAlpha(0)
            }
        });
        let isKeyEnable = true;
        this.input.keyboard.on('keydown', function(event) {
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.UP) {
                //console.log('jump');
                if (this.player.twinceJumpEnable) {
                    if (this.player.canTwinceJump && !this.player.inBarrel) {
                        this.player.setVelocityY(-this.jumpSpeed);
                        this.player.canTwinceJump = false
                    }
                }
                //console.log('barrel');
                let barrels = this.getSpritesByKey('barrel');
                if (barrels.length > 0) {
                    for (let i = 0; i < barrels.length; i++) {
                        if (barrels[i].LaunchEnable && barrels[i].inBarrel) {
                            console.log(true);
                            barrels[i].timerID = setInterval(() => {
                                let v = 1;
                                let d = 0;
                                switch (barrels[i].direction) {
                                    case 'left':
                                        v = -1;
                                        d = 0;
                                        break;
                                    case 'right':
                                        v = 1;
                                        d = 0;
                                        break;
                                    case 'up':
                                        v = -1;
                                        d = 1;
                                        break;
                                    case 'down':
                                        v = 1;
                                        d = 1;
                                        break;
                                    default:
                                        break
                                }
                                let LaunchSpeed = barrels[i].speed;
                                if (d == 0) {
                                    this.player.setVelocityY(0);
                                    that.player.x += LaunchSpeed * v
                                } else {
                                    this.player.setVelocityX(0);
                                    that.player.y += LaunchSpeed * v
                                }
                                barrels[i].LaunchEnable = false
                            }, 16)
                        }
                    }
                }
            }
            if (event.keyCode === Phaser.Input.Keyboard.KeyCodes.SPACE) {
                console.log('空格键被按下');
                let npcs = that.getSpritesByKey('npc');
                if (isKeyEnable) {
                    for (let i = 0; i < npcs.length; i++) {
                        if (npcs[i].tipBoard.alpha == 1) {
                            isPlayerMoveEnable = false;
                            console.log(npcs[i].tipBoard.typerTexts[npcs[i].tipBoard.typerTextIndex]);
                            let temStr = npcs[i].tipBoard.typerTexts[npcs[i].tipBoard.typerTextIndex];
                            let typerTimerIndex = 0;
                            let typerTimerID = setInterval(() => {
                                typerTimerIndex++;
                                npcs[i].tipBoard.typerWindow.innerText = temStr.substr(0, typerTimerIndex);
                                if (temStr.length == typerTimerIndex) {
                                    clearInterval(typerTimerID);
                                    if (npcs[i].tipBoard.typerTextIndex >= npcs[i].tipBoard.typerTexts.length) {
                                        npcs[i].tipBoard.typerTextIndex = 0;
                                        isKeyEnable = false;
                                        setTimeout(() => {
                                            setAlpha(npcs[i].tipBoard.typerWindow, 0);
                                            isPlayerMoveEnable = true;
                                            isKeyEnable = true
                                        }, 1000)
                                    }
                                }
                            }, 300);
                            setAlpha(npcs[i].tipBoard.typerWindow, 1);
                            npcs[i].tipBoard.typerTextIndex++
                        }
                    }
                }
            }
        }, this)
        let gw = this.game.config.width;
        let gh = this.game.config.height;
        let scaleX = gw / window.innerWidth;
        let scaleY = gh / window.innerHeight;
        console.log(scaleX, scaleY);
        document.getElementById('game').style.transform = 'scale(' + 1/scaleX + ',' + 1/scaleY + ')'
        onresize = function() {
            let gw = that.game.config.width;
            let gh = that.game.config.height;
            let scaleX = gw / window.innerWidth;
            let scaleY = gh / window.innerHeight;
            console.log(scaleX, scaleY);
            document.getElementById('game').style.transform = 'scale(' + 1/scaleX + ',' + 1/scaleY + ')'
        }
    }
    update(time, delta) {
        let that = this;
        if (typeof this.player == 'undefined') {
            return false
        }
        if (isPlayerMoveEnable) {
            this.playerMoveController()
        }
        let paths = this.getSpritesByKey('path');
        let enemyKeys = ['spike', 'middle top'];
        for (let enemyIndex = 0; enemyIndex < enemyKeys.length; enemyIndex++) {
            let enemys = this.getSpritesByKey(enemyKeys[enemyIndex]);
            if (paths.length > 0 && enemys.length > 0) {
                if (paths[0].LaunchCount == 0) {
                    for (let i = 0; i < paths.length; i++) {
                        for (let j = 0; j < enemys.length; j++) {
                            if (this.isOverlaping(paths[i], enemys[j])) {
                                this.tweens.add({
                                    targets: enemys[j],
                                    x: paths[paths.length - 1].x + j * 32,
                                    y: paths[paths.length - 1].y,
                                    ease: 'Sine.easeInOut',
                                    duration: paths[0].duration,
                                    yoyo: false,
                                    repeat: 0,
                                    onComplete: function() {
                                        that.tweens.add({
                                            targets: enemys[j],
                                            x: paths[0].x + j * 32,
                                            y: paths[0].y,
                                            duration: paths[0].duration,
                                            ease: 'Sine.easeInOut',
                                            repeat: 0,
                                            yoyo: false,
                                            onComplete: function() {
                                                paths[0].LaunchCount = 0
                                            }
                                        })
                                    }
                                })
                            }
                        }
                    }
                }
                paths[0].LaunchCount++
            }
        }
        let laserCannons = this.getSpritesByKey('laser cannon');
        if (laserCannons[0] && laserCannons[0] !== undefined) {
            if (laserCannons[0].LaunchCount == 0) {
                for (let i = 0; i < laserCannons.length; i++) {
                    switch (laserCannons[i].direction) {
                        case 'left':
                            let laserTimerID_left = setInterval(() => {
                                laserCannons[i].laser = this.matter.add.sprite(laserCannons[i].x - 32, laserCannons[i].y, 'laser', null, {
                                    'label': 'laser',
                                    'isSensor': true,
                                    'isStatic': true,
                                    friction: 0,
                                    restitution: 0,
                                });
                                laserCannons[i].laser.setOrigin(0.5, 0.5);
                                laserCannons[i].laser.setDepth(0.75);
                                laserCannons[i].laser.setFixedRotation();
                                laserCannons[i].LaunchCount = 0;
                                laserCannons[i].laser.laserDuration = laserCannons[i].laserDuration;
                                laserCannons[i].laser.setDepth(0.09);
                                laserCannons[i].laser.setDisplaySize(this.game.config.width, laserCannons[i].laser.height);
                                laserCannons[i].laser.x -= laserCannons[i].width * 11.8;
                                laserCannons[i].laser.laserTimerID = laserTimerID_left;
                                laserCannons[i].laser.rect = {
                                    x: 0,
                                    y: laserCannons[i].y,
                                    width: laserCannons[i].x,
                                    height: laserCannons[i].height
                                };
                                this.animationFromPixelData(laserCannons[i].laser, ['laser', 'laser2'], -1, 60)
                            }, laserCannons[i].pauseDuration);
                            break;
                        case 'right':
                            let laserTimerID_right = setInterval(() => {
                                laserCannons[i].laser = this.matter.add.sprite(laserCannons[i].x + 32, laserCannons[i].y, 'laser', null, {
                                    'label': 'laser',
                                    'isSensor': true,
                                    'isStatic': true,
                                    friction: 0,
                                    restitution: 0,
                                });
                                laserCannons[i].laser.setOrigin(0.5, 0.5);
                                laserCannons[i].laser.setDepth(0.75);
                                laserCannons[i].laser.setFixedRotation();
                                laserCannons[i].LaunchCount = 0;
                                laserCannons[i].laser.laserDuration = laserCannons[i].laserDuration;
                                laserCannons[i].laser.setDepth(0.09);
                                laserCannons[i].laser.setDisplaySize(this.game.config.width, laserCannons[i].laser.height);
                                laserCannons[i].laser.x += laserCannons[i].width * 11.8;
                                laserCannons[i].laser.laserTimerID = laserTimerID_right;
                                laserCannons[i].laser.rect = {
                                    x: laserCannons[i].x + 32,
                                    y: laserCannons[i].y,
                                    width: laserCannons[i].x + laserCannons[i].laser.width * 25,
                                    height: laserCannons[i].height
                                };
                                this.animationFromPixelData(laserCannons[i].laser, ['laser', 'laser2'], -1, 60)
                            }, laserCannons[i].pauseDuration);
                            break;
                        case 'up':
                            let laserTimerID_up = setInterval(() => {
                                laserCannons[i].laser = this.matter.add.sprite(laserCannons[i].x, laserCannons[i].y - 32, 'laser_', null, {
                                    'label': 'laser',
                                    'isSensor': true,
                                    'isStatic': true,
                                    friction: 0,
                                    restitution: 0,
                                });
                                laserCannons[i].laser.setOrigin(0.5, 0.5);
                                laserCannons[i].laser.setDepth(0.75);
                                laserCannons[i].laser.setFixedRotation();
                                laserCannons[i].LaunchCount = 0;
                                laserCannons[i].laser.laserDuration = laserCannons[i].laserDuration;
                                laserCannons[i].laser.setDepth(0.09);
                                laserCannons[i].laser.setDisplaySize(laserCannons[i].laser.width, this.game.config.height);
                                laserCannons[i].laser.y -= laserCannons[i].height * 6.8;
                                laserCannons[i].laser.laserTimerID = laserTimerID_up;
                                laserCannons[i].laser.rect = {
                                    x: laserCannons[i].x,
                                    y: 0,
                                    width: laserCannons[i].width,
                                    height: laserCannons[i].y
                                };
                                this.animationFromPixelData(laserCannons[i].laser, ['laser', 'laser_2'], -1, 60)
                            }, laserCannons[i].pauseDuration);
                            break;
                        case 'down':
                            let laserTimerID_down = setInterval(() => {
                                laserCannons[i].laser = this.matter.add.sprite(laserCannons[i].x, laserCannons[i].y + 32, 'laser_', null, {
                                    'label': 'laser',
                                    'isSensor': true,
                                    'isStatic': true,
                                    friction: 0,
                                    restitution: 0,
                                });
                                laserCannons[i].laser.setOrigin(0.5, 0.5);
                                laserCannons[i].laser.setDepth(0.75);
                                laserCannons[i].laser.setFixedRotation();
                                laserCannons[i].LaunchCount = 0;
                                laserCannons[i].laser.laserDuration = laserCannons[i].laserDuration;
                                laserCannons[i].laser.setDepth(0.09);
                                laserCannons[i].laser.setDisplaySize(laserCannons[i].laser.width, this.game.config.height);
                                laserCannons[i].laser.y += laserCannons[i].height * 6.8;
                                laserCannons[i].laser.laserTimerID = laserTimerID_down;
                                laserCannons[i].laser.rect = {
                                    x: laserCannons[i].x,
                                    y: laserCannons[i].y + 32,
                                    width: laserCannons[i].width,
                                    height: laserCannons[i].y + laserCannons[i].laser.height * 20,
                                };
                                this.animationFromPixelData(laserCannons[i].laser, ['laser', 'laser_2'], -1, 60)
                            }, laserCannons[i].pauseDuration);
                            break;
                        default:
                            break
                    }
                }
                laserCannons[0].LaunchCount++
            }
        }
        let lasers = this.getSpritesByKey('laser');
        if (lasers.length > 0) {
            for (let i = 0; i < lasers.length; i++) {
                let timerID = setTimeout(() => {
                    lasers[i].destroy();
                    clearInterval(lasers[i].laserTimerID);
                    clearTimeout(timerID)
                }, lasers[i].laserDuration)
            }
            for (let i = 0; i < lasers.length; i++) {
                if (this.isOverlaping(lasers[i].rect, this.player)) {
                    this.createPlayer()
                }
            }
        }
        let portals = this.getSpritesByKey('portal');
        if (portals[0] && portals[0] !== undefined) {
            if (portals[0].LaunchEnable) {
                portals[0].LaunchEnable = false;
                for (let i = 0; i < portals.length; i++) {
                    console.log(i);
                    if (i % 2 == 0) {} else {
                        let texture = this.textures.get('portal2');
                        let frame = texture.get(0);
                        portals[i].setTexture(texture);
                        portals[i].setFrame(frame)
                    }
                }
            }
        }
        let cannonLaunchers = this.getSpritesByKey('cannon');
        for (let i = 0; i < cannonLaunchers.length; i++) {
            cannonLaunchers[i].LaunchCount++;
            if (cannonLaunchers[i].LaunchCount % cannonLaunchers[i].LaunchRate == 0) {
                console.log('生成cannon');
                let xV = 0;
                let yV = 0;
                if (cannonLaunchers[i].direction == 'left') {
                    xV = -32
                }
                if (cannonLaunchers[i].direction == 'right') {
                    xV = 32
                }
                if (cannonLaunchers[i].direction == 'up') {
                    yV = -32
                }
                if (cannonLaunchers[i].direction == 'down') {
                    yV = 32
                }
                let cannonBall = this.matter.add.sprite(cannonLaunchers[i].x + xV, cannonLaunchers[i].y + yV, 'cannon ball', null, {
                    'label': 'cannon ball',
                    'isSensor': true,
                    'isStatic': true,
                    friction: 0,
                    restitution: 0,
                });
                cannonBall.setOrigin(0.5, 0.5);
                cannonBall.setDepth(0.75);
                cannonBall.setFixedRotation();
                cannonBall.direction = cannonLaunchers[i].direction
            }
        }
        let cannonBalls = this.getSpritesByKey('cannon ball');
        for (let i = 0; i < cannonBalls.length; i++) {
            if (cannonBalls[i].direction == 'left') {
                cannonBalls[i].x -= 10
            }
            if (cannonBalls[i].direction == 'right') {
                cannonBalls[i].x += 10
            }
            if (cannonBalls[i].direction == 'up') {
                cannonBalls[i].y -= 10
            }
            if (cannonBalls[i].direction == 'down') {
                cannonBalls[i].y += 10
            }
            if (cannonBalls.length > 0) {
                if (cannonBalls[i].x + cannonBalls[i].width <= 0 || cannonBalls[i].x > this.game.config.width || cannonBalls[i].y + cannonBalls[i].height <= 0 || cannonBalls[i].y > this.game.config.height) {
                    cannonBalls[i].destroy();
                    cannonBalls.splice(i, 1)
                }
                if (cannonBalls[i] !== undefined) {
                    if (this.isColliding(cannonBalls[i], this.player)) {
                        cannonBalls[i].destroy();
                        this.createPlayer()
                    }
                }
            }
        }
        let rocketlaunchers = this.getSpritesByKey('rocket launcher');
        for (let i = 0; i < rocketlaunchers.length; i++) {
            let tempAngle = this.calculateAngle(rocketlaunchers[i].x, rocketlaunchers[i].y, this.player.x, this.player.y);
            rocketlaunchers[i].setAngle(tempAngle);
            rocketlaunchers[i].LaunchCount++;
            if (rocketlaunchers[i].LaunchCount % rocketlaunchers[i].LaunchRate == 0) {
                let rocket = this.createObjectCBetweenAAndB(rocketlaunchers[i], this.player, 'rocket', null);
                rocket.setBody({
                    'isSensor': true,
                    'isStatic': true,
                });
                rocket.label = 'rocket'
            }
        }
        let rockets = this.getSpritesByKey('rocket');
        for (let i = 0; i < rockets.length; i++) {
            let tempAngle = this.calculateAngle(rockets[i].x, rockets[i].y, this.player.x, this.player.y);
            this.moveTowardTarget(rockets[i], this.player, 3, tempAngle + 180);
            for (let j = 0; j < this.allKeyName.length; j++) {
                let keyTiles = this.getSpritesByKey(this.allKeyName[j]);
                for (let k = 0; k < keyTiles.length; k++) {
                    if (rockets[i] !== undefined) {
                        if (this.isColliding(rockets[i], keyTiles[k])) {
                            rockets[i].destroy();
                            rockets.splice(i, 1)
                        }
                    }
                }
            }
            if (rockets[i] !== undefined) {
                if (this.isColliding(rockets[i], this.player)) {
                    rockets[i].destroy();
                    this.createPlayer()
                }
            }
        }
        let stompers = this.getSpritesByKey('stomper');
        if (stompers.length > 0) {
            for (let i = 0; i < stompers.length; i++) {
                let direction = '';
                let stomper = stompers[i];
                if (stomper instanceof Phaser.GameObjects.Sprite) {
                    direction = this.determineDirection(this.player, stomper);
                    if (direction && stomper.hasOwnProperty('LaunchCount')) {
                        if (stomper.LaunchCount > 0) {
                            return false
                        }
                        if (direction == '正东' && stomper.direction == 'right' || direction == '正西' && stomper.direction == 'left') {
                            stomper.LaunchCount++;
                            let tempX = this.player.x,
                                tempY = this.player.y,
                                tempX2 = stomper.x,
                                tempY2 = stomper.y;
                            let tween = this.tweens.add({
                                targets: stomper,
                                x: tempX,
                                duration: 1000,
                                ease: 'Power1',
                                repeat: 0,
                                yoyo: false,
                                onComplete: function() {
                                    that.tweens.add({
                                        targets: stomper,
                                        x: tempX2,
                                        duration: 3000,
                                        ease: 'Power1',
                                        repeat: 0,
                                        yoyo: false,
                                        onComplete: function() {
                                            tween.destroy();
                                            tween = null;
                                            stomper.LaunchCount = 0
                                        }
                                    })
                                }
                            })
                        }
                        if (direction == '正南' && stomper.direction == 'down' || direction == '正北' && stomper.direction == 'up') {
                            stomper.LaunchCount++;
                            let tempX = this.player.x,
                                tempY = this.player.y,
                                tempX2 = stomper.x,
                                tempY2 = stomper.y;
                            let tween = this.tweens.add({
                                targets: stomper,
                                y: tempY,
                                duration: 1000,
                                ease: 'Power1',
                                repeat: 0,
                                yoyo: false,
                                onUpdate: function() {},
                                onComplete: function() {
                                    that.tweens.add({
                                        targets: stomper,
                                        y: tempY2,
                                        duration: 3000,
                                        ease: 'Power1',
                                        repeat: 0,
                                        yoyo: false,
                                        onUpdate: function() {},
                                        onComplete: function() {
                                            tween.destroy();
                                            tween = null;
                                            stomper.LaunchCount = 0
                                        }
                                    })
                                }
                            })
                        }
                    }
                }
            }
        }
        let oneWayBlocks = this.getSpritesByKey('one way block');
        for (let i = 0; i < oneWayBlocks.length; i++) {
            var isAbove = this.player.y + this.player.height < oneWayBlocks[i].y;
            var isBelow = this.player.y > oneWayBlocks[i].y + oneWayBlocks[i].height;
            if (isAbove) {
                var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y + this.player.height, oneWayBlocks[i].x, oneWayBlocks[i].y);
                if (distance <= 25 || distance >= 0) {
                    oneWayBlocks[i].setSensor(false)
                }
            }
            if (isBelow) {
                var distance = Phaser.Math.Distance.Between(this.player.x, this.player.y + this.player.height, oneWayBlocks[i].x, oneWayBlocks[i].y);
                if (distance >= 25) {
                    oneWayBlocks[i].setSensor(true)
                }
            }
        }
    }
    playerMoveController() {
        this.player.setVelocityX(0);
        let barrels = this.getSpritesByKey('barrel');
        if (barrels.length > 0) {
            for (let i = 0; i < barrels.length; i++) {
                if (barrels[i].inBarrel) {
                    return false
                }
            }
        }
        this.player.moveSate = 0;
        if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP))) {
            if (this.player.body.velocity.y === 0) {
                this.player.setVelocityY(-this.jumpSpeed);
                this.player.direction = 'up';
                this.player.canTwinceJump = true;
                this.player.moveSate = 1
            }
        }
        if (this.player.autoRunEnable) {
            return false
        }
        if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT))) {
            this.player.setVelocityX(-this.moveSpeed);
            this.isLeftKeyDown = false;
            this.player.direction = 'left';
            this.player.flipX = true;
            this.player.moveSate = 2
        } else if (this.input.keyboard.checkDown(this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT))) {
            this.player.setVelocityX(this.moveSpeed);
            this.isLeftKeyDown = true;
            this.player.direction = 'right';
            this.player.flipX = false;
            this.player.moveSate = 2
        }
        switch (this.player.moveSate) {
            case 0:
                this.player.anims.play('player_idle', true);
                break;
            case 1:
                this.player.anims.play('player_jump', true);
                break;
            case 2:
                this.player.anims.play('player_walk', true);
                break;
            default:
                break
        }
    }
    clearLevelLayer() {
        this.mapTiles.forEach(function(tile) {
            this.tweens.each(tween => {
                if (tween.targets[0] === tile) {
                    tween.stop()
                }
            });
            tile.destroy()
        }, this)
    }
    createLevelLayer(levelIndex) {
        let CountValue = 3;
        let directionValue = "left";
        let durationValue = 1000;
        let laserDurationValue = 500;
        let pauseDurationValue = 2000;
        let position = {
            x: 7,
            y: 10
        };
        let rateValue = 120;
        let speedValue = 6;
        let textValue = [];
        let boundW = 32 * Cloumn;
        let boundH = 32 * Row;
        this.matter.world.setBounds(0, 0, boundW, boundH);
        this.cameras.main.setBounds(0, 0, boundW, boundH);
        this.cameras.main.setZoom(1);
        for (let layer_index = 0; layer_index < level_editor_layer_key.length; layer_index++) {
            for (let k = 0; k < this.levelMapDatas[levelIndex][level_editor_layer_key[layer_index]].length; k++) {
                for (let l = 0; l < this.levelMapDatas[levelIndex][level_editor_layer_key[layer_index]][k].length; l++) {
                    let mark = this.levelMapDatas[levelIndex][level_editor_layer_key[layer_index]][k][l];
                    if (mark !== '.') {
                        let sensorBoolean = false;
                        let tileScaleX = 1;
                        let tileScaleY = 1;
                        if (mark == 'left top') {}
                        if (mark == 'middle top') {}
                        if (mark == 'right top') {}
                        if (mark == 'left') {}
                        if (mark == 'middle') {}
                        if (mark == 'right') {}
                        if (mark == 'left bottom') {}
                        if (mark == 'middle bottom') {}
                        if (mark == 'right bottom') {}
                        if (mark == 'top and bottom') {}
                        if (mark == 'left and right') {}
                        if (mark == 'all sides') {}
                        if (mark == 'one way block' || mark == 'water' || mark == 'foreground tile' || mark == 'disappearing foreground' || mark == 'trampoline' || mark == 'start flag' || mark == 'finish flag' || mark == 'checkpoint' || mark == 'togglemine' || mark == 'rocket launcher' || mark == 'npc' || mark == 'portal' || mark == 'collectible' || mark == 'barrel' || mark == 'jump reset' || mark == 'autorun' || mark == 'auto-run stopper' || mark == 'path' || mark == 'rotating fireball') {
                            sensorBoolean = true
                        }
                        if (mark == 'disappearing block' || mark == 'treadmill' || mark == 'ice block' || mark == 'spike' || mark == 'cannon' || mark == 'laser cannon') {
                            sensorBoolean = false
                        }
                        this.tile = this.matter.add.sprite(16 + k * 32, 16 + l * 32, mark, null, {
                            'label': mark,
                            'isSensor': sensorBoolean,
                            'isStatic': true,
                            friction: 0,
                            restitution: 0,
                        });
                        this.tile.setOrigin(0.5, 0.5);
                        this.tile.setScale(tileScaleX, tileScaleY);
                        this.tile.world.drawDebug = false;
                        this.tile.setDepth(0.25);
                        this.mapTiles.push(this.tile);
                        if (mark == 'foreground tile' || mark == 'disappearing foreground') {
                            this.tile.setDepth(1)
                        }
                        for (let i = 0; i < 18; i++) {
                            if (mark == 'deco' + i+1) {
                                this.tile.setDepth(0);
                                this.tile.body.destroy()
                            }
                        }
                        if (mark == 'blue block') {
                            let texture = this.textures.get('blue block2');
                            let frame = texture.get(0);
                            this.tile.setTexture(texture);
                            this.tile.setFrame(frame);
                            this.tile.setSensor(true)
                        }
                        for (let i = 0; i < this.textureKeys.length; i++) {
                            if (this.textureKeys[i].key2 !== undefined) {
                                if (mark == this.textureKeys[i].key1 && mark !== 'red block' && mark !== 'blue block' && mark !== 'red and blue switch' && mark !== 'trampoline' && mark !== 'togglemine' && mark !== 'portal') {
                                    this.animationFromPixelData(this.tile, [this.textureKeys[i].key1, this.textureKeys[i].key2], -1, 120)
                                }
                            }
                        }
                        if (mark == 'start flag') {
                            this.initPlayerXY.x = this.tile.x;
                            this.initPlayerXY.y = this.tile.y
                        }
                        if (mark == 'spike') {}
                        if (mark == 'togglemine') {
                            this.tile.LaunchEnable = false
                        }
                        if (mark == 'npc') {
                            this.tile.tipBoard = this.add.sprite(this.tile.x, this.tile.y - this.tile.height / 2, 'tipBoard');
                            this.tile.tipBoard.setAlpha(0);
                            this.tile.tipBoard.typerTexts = ['一闪一闪亮晶晶', '天上都是小星星', '不要问我星星有几颗', '我会告诉你很多'];
                            this.tile.tipBoard.typerTextIndex = 0;
                            let gameContainer = document.getElementById('game container');
                            this.tile.tipBoard.typerWindow = createDiv(0, 0, this.game.config.width - 64, this.game.config.height / 2, gameContainer);
                            inXCenter(this.tile.tipBoard.typerWindow, gameContainer);
                            setBgColor(this.tile.tipBoard.typerWindow, 'transparent');
                            setAlpha(this.tile.tipBoard.typerWindow, 0);
                            setColor(this.tile.tipBoard.typerWindow, 'blue');
                            this.tile.tipBoard.typerWindow.style.fontSize = '21px';
                            this.tile.tipBoard.typerWindow.style.lineHeight = '27px';
                            this.tile.tipBoard.typerWindow.style.textAlign = 'center'
                        }
                        if (mark == 'portal') {
                            this.tile.LaunchEnable = true
                        }
                        for (let key in itemData) {
                            if (itemData.hasOwnProperty(key)) {
                                const items = itemData[key].item;
                                for (let key2 in items) {
                                    if (key2 == mark) {
                                        if (items[key2].mapCellDatas !== undefined) {
                                            if (items[key2].mapCellDatas.length > 0) {
                                                for (let i = 0; i < items[key2].mapCellDatas.length; i++) {
                                                    if ((items[key2].mapCellDatas[i].position.x == {
                                                        x: k,
                                                        y: l
                                                    }.x && items[key2].mapCellDatas[i].position.y == {
                                                        x: k,
                                                        y: l
                                                    }.y)) {
                                                        console.log(items[key2].mapCellDatas[i]);
                                                        CountValue = items[key2].mapCellDatas[i].CountValue;
                                                        directionValue = items[key2].mapCellDatas[i].directionValue;
                                                        durationValue = items[key2].mapCellDatas[i].durationValue;
                                                        laserDurationValue = items[key2].mapCellDatas[i].laserDurationValue;
                                                        pauseDurationValue = items[key2].mapCellDatas[i].pauseDurationValue;
                                                        position = items[key2].mapCellDatas[i].position;
                                                        rateValue = items[key2].mapCellDatas[i].rateValue;
                                                        speedValue = items[key2].mapCellDatas[i].speedValue;
                                                        textValue = items[key2].mapCellDatas[i].textValue
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    let angle = 0;
                                    let objArray = ['stomper', 'rotating fireball', 'path', 'autorun', 'barrel', 'laser cannon', 'rocket launcher', 'cannon'];
                                    for (let i = 0; i < objArray.length; i++) {
                                        if (objArray[i] == mark) {
                                            switch (directionValue) {
                                                case 'left':
                                                    angle = 180;
                                                    break;
                                                case 'right':
                                                    angle = 0;
                                                    break;
                                                case 'down':
                                                    angle = 90;
                                                    break;
                                                case 'up':
                                                    angle = 270;
                                                    break;
                                                default:
                                                    break
                                            }
                                            this.tile.setAngle(angle)
                                        }
                                    }
                                    if (mark == 'cannon') {
                                        this.tile.direction = directionValue;
                                        this.tile.LaunchRate = rateValue;
                                        this.tile.LaunchCount = 0
                                    }
                                    if (mark == 'rocket launcher') {
                                        this.tile.speed = speedValue;
                                        this.tile.LaunchRate = rateValue;
                                        this.tile.LaunchCount = 0
                                    }
                                    if (mark == 'laser cannon') {
                                        this.tile.LaunchCount = 0;
                                        this.tile.direction = directionValue;
                                        this.tile.laserDuration = laserDurationValue;
                                        this.tile.pauseDuration = pauseDurationValue
                                    }
                                    if (mark == 'barrel') {
                                        this.tile.direction = directionValue;
                                        this.tile.speed = speedValue;
                                        this.tile.setDepth(0.75);
                                        this.tile.LaunchEnable = false;
                                        this.tile.inBarrel = false
                                    }
                                    if (mark == 'autorun') {
                                        this.tile.direction = directionValue;
                                        this.tile.speed = speedValue
                                    }
                                    if (mark == 'path') {
                                        this.tile.setScale(1, 0.5);
                                        this.tile.duration = durationValue;
                                        this.tile.LaunchCount = 0
                                    }
                                    if (mark == 'rotating fireball') {
                                        let direction = '';
                                        if (directionValue == 'left') {
                                            direction = 'backwards'
                                        } else {
                                            direction = 'forwards'
                                        }
                                        this.tile.direction = direction;
                                        this.createRotatingFireball(mark, k, l, sensorBoolean, CountValue)
                                    }
                                    if (mark == 'stomper') {
                                        this.tile.LaunchCount = 0;
                                        this.tile.direction = directionValue;
                                        this.tile.speed = speedValue
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    createPlayer() {
        this.player = this.matter.add.sprite(300, 50, 'player_idle', null, {
            'label': 'player',
        });
        this.player.setMass(100);
        this.player.setFixedRotation();
        this.player.setVelocity(0, 0);
        this.player.setDepth(0.5);
        this.cameras.main.startFollow(this.player, true);
        let startFlag = this.getSpriteByKey('start flag');
        this.player.x = this.initPlayerXY.x;
        this.player.y = this.initPlayerXY.y;
        this.player.canTwinceJump = false;
        this.player.twinceJumpEnable = true;
        this.player.inBarrel = false;
        this.player.autoRunEnable = false;
        this.player.autoTimerIDs = [];
        this.anims.create({
            key: 'player_idle',
            frames: [{
                key: 'player_idle',
                start: 0
            }, ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'player_jump',
            frames: [{
                key: 'player_jump',
                start: 0
            }, ],
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'player_walk',
            frames: [{
                key: 'player_walk1',
                start: 0
            }, {
                key: 'player_walk2',
                start: 0
            }, ],
            frameRate: 10,
            repeat: -1
        });
        this.player.anims.play('player_idle', true);
        this.player.moveSate = 0;
        this.game.events.emit('spriteCreated', this.player);
        this.game.events.on('spriteCreated', function() {
            let sprites = this.getSpritesByKey('player_idle');
            for (let i = 0; i < sprites.length - 1; i++) {
                sprites[i].destroy()
            }
        }, this)
    }
    getSpriteByKey(key) {
        return this.children.list.find(function(child) {
            return child instanceof Phaser.GameObjects.Sprite && child.texture.key === key
        })
    }
    getSpritesByKey(key) {
        return this.children.list.filter(function(child) {
            return child instanceof Phaser.GameObjects.Sprite && child.texture.key === key
        })
    }
    animationFromPixelData(sprite, frameKeys, repeat = -1, time, endFrame = null) {
        let frame_1 = frameKeys[0];
        let frame_2 = frameKeys[1];
        let texture, frame;
        let timerCount = 0;
        let timerID = setInterval(() => {
            if (!sprite.active) {
                clearInterval(timerID)
            }
            if (sprite.texture.key == frame_1) {
                texture = this.textures.get(frame_2)
            } else {
                texture = this.textures.get(frame_1)
            }
            frame = texture.get(0);
            if (sprite.active !== false) {
                sprite.setTexture(texture);
                sprite.setFrame(frame);
                timerCount++
            }
            if (repeat == timerCount) {
                clearInterval(timerID);
                if (endFrame !== null) {
                    setTimeout(() => {
                        texture = this.textures.get(endFrame);
                        frame = texture.get(0);
                        sprite.setTexture(texture);
                        sprite.setFrame(frame)
                    }, time * 2)
                }
            }
        }, time * 2)
    };
    calculateAngle(x1, y1, x2, y2) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let angleInRadians = Math.atan2(dy, dx);
        let angleInDegrees = angleInRadians * (180 / Math.PI);
        angleInDegrees = (angleInDegrees + 360) % 360;
        return angleInDegrees
    }
    calculateDirection(x1, y1, x2, y2) {
        let dx = x2 - x1;
        let dy = y2 - y1;
        let angleInRadians = Math.atan2(dy, dx);
        let angleInDegrees = angleInRadians * (180 / Math.PI);
        angleInDegrees = (angleInDegrees + 360) % 360;
        let direction;
        if (angleInDegrees < 45 || angleInDegrees >= 315) {
            direction = '东'
        } else if (angleInDegrees < 135) {
            direction = '南'
        } else if (angleInDegrees < 225) {
            direction = '西'
        } else {
            direction = '北'
        }
        return direction
    }
    determineDirection(objectA, objectB) {
        if (objectA.y >= objectB.y + objectB.height) {
            if (objectA.x + objectA.width >= objectB.x && objectA.x <= objectB.x + objectB.width) {
                return '正南'
            }
        } else if (objectA.y + objectA.height <= objectB.y) {
            if (objectA.x + objectA.width >= objectB.x && objectA.x <= objectB.x + objectB.width) {
                return '正北'
            }
        } else if (objectA.x >= objectB.x + objectB.width) {
            if (objectA.y + objectA.height >= objectB.y && objectA.y <= objectB.y + objectB.height) {
                return '正东'
            }
        } else if (objectA.x + objectA.width <= objectB.x) {
            if (objectA.y + objectA.height >= objectB.y && objectA.y <= objectB.y + objectB.height) {
                return '正西'
            }
        }
    }
    createObjectCBetweenAAndB(objectA, objectB, textureKey, frame) {
        if (!(objectA instanceof Phaser.GameObjects.GameObject) || !(objectB instanceof Phaser.GameObjects.GameObject)) {
            console.error('objectA and objectB must be Phaser Game Objects');
            return
        }
        let angle = Phaser.Math.Angle.Between(objectA.x, objectA.y, objectB.x, objectB.y) + Math.PI;
        let offset = 20;
        let cx = objectA.x + Math.cos(angle) * offset;
        let cy = objectA.y + Math.sin(angle) * offset;
        let objectC = this.matter.add.sprite(cx, cy, textureKey, frame);
        return objectC
    }
    moveTowardTarget(objectA, objectB, speed, angle) {
        const dx = objectB.x - objectA.x;
        const dy = objectB.y - objectA.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const nx = dx / distance;
        const ny = dy / distance;
        objectA.setVelocityX(nx * speed);
        objectA.setVelocityY(ny * speed);
        objectA.setAngularVelocity(0);
        objectA.setAngle(angle)
    }
    isColliding(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y
    }
    isOverlaping(rect1, rect2) {
        if (rect1.x + rect1.width <= rect2.x) {
            return false
        }
        if (rect1.x >= rect2.x + rect2.width) {
            return false
        }
        if (rect1.y + rect1.height <= rect2.y) {
            return false
        }
        if (rect1.y >= rect2.y + rect2.height) {
            return false
        }
        return true
    }
    createRotatingFireball(mark, k, l, sensorBoolean, countValue) {
        this.tile.fireBallCount = countValue;
        let startValue = 0;
        let endValue = 0;
        if (this.tile.direction == 'forwards') {
            startValue = 0;
            endValue = 1
        } else {
            startValue = 1;
            endValue = 0
        }
        this.tile.fireBalls = [];
        this.curve = [];
        this.path = [];
        for (let i = 1; i < this.tile.fireBallCount; i++) {
            this.tile.fireBalls[i] = this.matter.add.sprite(16 + k * 32, 16 + l * 32, mark, null, {
                'label': mark,
                'isSensor': sensorBoolean,
                'isStatic': true,
                friction: 0,
                restitution: 0,
            });
            this.tile.fireBalls[i].setOrigin(0.5, 0.5);
            console.log(this.tile.fireBalls[i]);
            this.curve[i] = new Phaser.Curves.Ellipse(this.tile.x, this.tile.y, 32 * i, 32 * i);
            this.path[i] = {
                t: 0,
                vec: new Phaser.Math.Vector2()
            };
            let index = i;
            this.path[index].t = startValue;
            let fireBall = this.tile.fireBalls[i];
            this.tweens.add({
                targets: this.path[index],
                t: endValue,
                ease: 'Linear',
                duration: 2000,
                repeat: -1,
                yoyo: !true,
                onUpdate: () => {
                    this.curve[index].getPoint(this.path[index].t, this.path[index].vec);
                    fireBall.setPosition(this.path[index].vec.x, this.path[index].vec.y)
                }
            })
        }
    }
}`;
    //4. main.js
    const main = `
const config = {
    type: Phaser.CANVAS,
    parent: game,
    width: 32 * Cloumn,
    height: 32 * Row,
    pixelArt: true,
    physics: {
        matter: {
            gravity: {
                x: 0,
                y: 0.98
            },
        debug: !true
        }
    },
};
game = new Phaser.Game(config);
game.scene.add('gameScene', GameScene);
game.scene.start('gameScene');`;
    //5. PolygonCollider.js
    const PolygonCollider = `class PolygonCollider {
    constructor() {
        this.dot = this.dot.bind(this);
        this.cross = this.cross.bind(this);
        this.projectPolygon = this.projectPolygon.bind(this)
    }
    dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y
    }
    cross(v1, v2) {
        return v1.x * v2.y - v1.y * v2.x
    }
    getNormal(p1, p2) {
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const crossProduct = this.cross({
            x: 0,
            y: 0
        }, {
            x: dx,
            y: dy
        });
        const normal = {
            x: crossProduct * -dy,
            y: crossProduct * dx
        };
        return normal
    }
    projectPolygon(polygon, normal) {
        let min = Infinity,
            max = -Infinity;
        for (let point of polygon) {
            let dotProduct = this.dot(point, normal);
            if (dotProduct < min) min = dotProduct;
            if (dotProduct > max) max = dotProduct
        }
        return {
            min, max
        }
    }
    polygonsCollide(polygon1, polygon2) {
        const normals1 = this.calculateNormals(polygon1);
        const normals2 = this.calculateNormals(polygon2);
        for (let normal of normals1) {
            if (!this.overlap(normal, polygon1, polygon2)) {
                return false
            }
        }
        for (let normal of normals2) {
            if (!this.overlap(normal, polygon2, polygon1)) {
                return false
            }
        }
        return true
    }
    calculateNormals(polygon) {
        const normals = [];
        for (let i = 0; i < polygon.length; i++) {
            const edge = [polygon[i], polygon[(i + 1) % polygon.length]];
            const normal = this.getNormal(edge[0], edge[1]);
            normals.push(normal)
        }
        return normals
    }
    overlap(normal, polygon1, polygon2) {
        const projection1 = this.projectPolygon(polygon1, normal);
        const projection2 = this.projectPolygon(polygon2, normal);
        return projection1.min <= projection2.max && projection2.min <= projection1.max
    }
}`;
//6. export.js
Game_Data.scene = scene;
Game_Data.itemData = itemData;
const jsonString = `Game_Data = ${JSON.stringify(Game_Data)}`;
    
                            // 使用 JSZip 库创建 zip 文件
                            JSZip()
                            .file('index.html', html)
                            .file('style.css', css)
                            .file('game.js', game)
                            .file('main.js', main)
                            .file('PolygonCollider.js',PolygonCollider)
                            .file('exported.js', jsonString)
                            .generateAsync({ type: 'blob' })
                            .then(function(content) {
                            // 创建下载链接
                            const zipBlob = new Blob([content], { type: 'application/zip' });
                            const zipUrl = URL.createObjectURL(zipBlob);
                            const downloadLink = document.createElement('a');
                            downloadLink.href = zipUrl;
                            downloadLink.download = 'gameproject.zip'; // 设置下载文件的名称
                            document.body.appendChild(downloadLink);
                            downloadLink.click(); // 触发下载
                            // 下载完成后，清除链接和 Blob URL
                            setTimeout(() => {
                                URL.revokeObjectURL(zipUrl);
                                downloadLink.remove();
                            }, 100);
                            });

}