<script>
    import { onMount } from "svelte";
    import {img_url} from "../store";
    import Header from "../include/header.svelte";
    import Nav from "../include/nav.svelte";
    setTimeout(() => {
        document.getElementById("container").className += ' on';
    }, 300);

    var canvas;
    var ctx;
    // 게임의 상태
    var STATE_WAIT = 0;
    var STATE_RUN = 1;
    var STATE_GAMEOVER = 2;
    var state = STATE_WAIT;
    // 우주선
    var spaceShip;
    var sx, sy;
    var SW=13, SH=16;
    var angle = 0;
    // 운석
    var arMete = new Array();
    var meteColor = [ "yellow", "lightgreen", "gray", "blue", "orange" ];
    var NUM = 600;
    // 키 눌림 상태
    var keyPressed = [];
    // 경과 시간
    var oldTime;
    var startTime;
    var totalTime;
    var canvas2;
    var ctx2;
    var x = 150, y=150;
    var dx = 5, dy = 3;
    var r = 150;
    function can2(){
        canvas2 = document.getElementById("canvas2");
        if (canvas2 == null || canvas2.getContext == null) return;
        ctx2 = canvas2.getContext("2d");
        ctx2.fillStyle="pink";
        ctx2.lineWidth=2;
        ctx2.strokeStyle="red"
        setInterval(draw2, 25);
    }
    function draw2() {
        ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
        ctx2.beginPath();
        ctx2.arc(x, y , 150 , 0,2 * Math.PI, true);
        ctx2.fill();
        ctx2.stroke();

        if (x < r || x + r > canvas2.width) {
            dx = -dx;
        }
        if (y < r || y + r > canvas2.height) {
            dy = -dy;
        }
        x += dx;
        y += dy;
    }
    onMount(async () => {
        can2();
        canvas = document.getElementById("canvas");
        if (canvas == null || canvas.getContext == null) return;
        ctx = canvas.getContext("2d");
        spaceShip = new Image();
        spaceShip.src = "/img/flying.png";
        setInterval(runGame, 30);
    });
    window.onkeydown = function(e) {
        keyPressed[e.keyCode] = true;
    }
    window.onkeyup = function(e) {
        keyPressed[e.keyCode] = false;
    }
    // 게임 시작. 운석 난수로 배치하고 시간 리셋
    function startGame() {
        arMete.length = 0;
        for (var i = 0;i < NUM; i++) {
            arMete.push({
                x:Math.random() * canvas.width,
                y: (i < NUM/2 ? 20 : canvas.height-20),
                vx:Math.random() * 200 - 100,
                vy:Math.random() * 200 - 100,
                color:Math.floor(Math.random() * 5)
            });
        }
        sx = canvas.width/2;
        sy = canvas.height/2;
        startTime = getTime();
        oldTime = getTime();
    }
    // 현재 시간 구함
    function getTime() {
        var date = new Date();
        var time = date.getTime();
        date = null;
        return time;
    }
    // 게임 진행
    function runGame() {
        switch (state) {
        case STATE_WAIT:
        case STATE_GAMEOVER:
            if (keyPressed[13] == true) {
                if (spaceShip.complete == false) return;
                startGame();
                state = STATE_RUN;
            }
            break;
        case STATE_RUN:
            // 우주선 이동
            if (keyPressed[38]) {
                sy -= 3;
                angle = 0;
            }
            if (keyPressed[40]) {
                sy += 3;
                angle = 180;
            }
            if (keyPressed[37]) {
                sx -= 3;
                angle = 270;
            }
            if (keyPressed[39]) {
                sx += 3;
                angle = 90;
            }
            // 대각선 이동시의 각도 계산
            if (keyPressed[38] && keyPressed[39]) {
                angle = 45;
            }
            if (keyPressed[39] && keyPressed[40]) {
                angle = 135;
            }
            if (keyPressed[40] && keyPressed[37]) {
                angle = 225;
            }
            if (keyPressed[37] && keyPressed[38]) {
                angle = 315;
            }
            
            // 경과 시간 구함
            var ellapse = getTime() -oldTime;
            oldTime = getTime();
            
            // 운석의 이동
            for (var i = 0;i < NUM; i++) {
                var mx = arMete[i].vx * ellapse / 1000;
                var my = arMete[i].vy * ellapse / 1000;
                arMete[i].x += mx;
                arMete[i].y += my;
                if (arMete[i].x > canvas.width) arMete[i].x=0;
                if (arMete[i].x < 0) arMete[i].x=canvas.width;
                if (arMete[i].y > canvas.height) arMete[i].y=0;
                if (arMete[i].y < 0) arMete[i].y=canvas.height;
                
                // 충돌 판정
                var mx = arMete[i].x;
                var my = arMete[i].y;
                if (mx > sx-SW / 2 && mx < sx+SW / 2 && my > sy-SH / 2 && my < sy+SH/2) {
                    state = STATE_GAMEOVER;
                    break;
                }
            }				
            break;
        }
        draw();
    }

    // 문자열 출력 함수
    function drawText(ctx, text, x, y, font, color, align, base) {
        if (font != undefined) ctx.font = font;
        if (color != undefined) ctx.fillStyle = color;
        if (align != undefined) ctx.textAlign = align;
        if (base != undefined) ctx.textBaseline = base;
        ctx.fillText(text, x, y);
    }
    
    // 화면 그림
    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        switch (state) {
        case STATE_WAIT:
            drawText(ctx, "1994 슈팅게임", canvas.width/2, canvas.height/2 - 60,
                "30px arial", "yellow", "center", "middle");
            drawText(ctx, "Enter : 시작, 키보드 : 이동", 
                canvas.width/2, canvas.height/2 - 20, "20px arial", "white");
            drawText(ctx, "Nexon by Rapid Test Game Bounding_Box", 
                canvas.width/2, canvas.height/2 + 20, "15px arial", "blue");
            break;
        case STATE_RUN:
        case STATE_GAMEOVER:
            // 운석 그림
            for (var i = 0;i < NUM; i++) {
                ctx.beginPath();
                ctx.arc(arMete[i].x, arMete[i].y,2,0,2*Math.PI);
                ctx.fillStyle=meteColor[arMete[i].color];
                ctx.fill();
            }
            
            // 우주선 그림
            ctx.save();
            ctx.translate(sx, sy);
            ctx.rotate(angle * Math.PI / 180);
            ctx.translate(-sx, -sy);
            ctx.drawImage(spaceShip, sx-SW/2, sy-SH/2,30,32);
            ctx.restore();
            
            if (state == STATE_GAMEOVER) {
                drawText(ctx, "Game Over", canvas.width/2, canvas.height/2,"30px arial", "white", "center", "middle");
            } else {
                // 경과 시간 갱신
                totalTime = (getTime() - startTime) / 1000;
            }

            // 경과 시간 표시
            drawText(ctx, totalTime, canvas.width - 10, 10,"20px arial", "yellow", "right", "top");
            break;
        }
    }
    
</script>
<Header/>
<Nav />
<div class="center_wrap" id="container">
    <h1 class="d1_title">BounceBox</h1>
    <canvas id="canvas2" width="1278" height="800" style="border:1px solid #333;">
		이 브라우저는 캔버스를 지원하지 않습니다.
	</canvas>
    <h1 class="d1_title">SpaceShip</h1>
    <canvas id="canvas" width="1280" height="800" style="background-color:#000">
		이 브라우저는 캔버스를 지원하지 않습니다.
	</canvas>

    
</div>
<style>
p{color:red;}
</style>