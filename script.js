score = 0;
cross = true;
audio = new Audio('./sounds/music.mp3');
audiogo = new Audio('./sounds/gameover.mp3');
setTimeout(() => {
    audio.play()
}, 1000);
document.onkeydown = function(e) {
    console.log("KeyCodes :", e.keyCode);

    if(e.keyCode == 38) {
        dino = document.querySelector('.dino');
        // Enabling the jump animation
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino')
        },700);
    }

    if(e.keyCode == 39) {
        dino = document.querySelector('.dino');
        // Current path of dino on X axis
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        // Update path of dino on X axis 
        dino.style.left = dinoX + 112 + "px";
    }
    if(e.keyCode == 37) {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 112 + "px";
    }
}
setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    // Path of dino on X and Y axis respectively
    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    // offset between dino and obstacle on X and Y axis
    offsetX = Math.abs(dx-ox);
    offsetY = Math.abs(dy-oy);

    // dino collides with obstacle
    if(offsetX < 73 && offsetY < 52){
        gameOver.innerHTML = "Game Over - Reload it";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    }

    // dino crosses the obstacle
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);

        // obstacle becomes faster after each cross
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            console.log('New animation Duration', newDur);
        }, 500);
    }
}, 10);

function updateScore(score) {
    scoreCount.innerHTML = "Your Score: " + score;
}
