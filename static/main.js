
    let progressBarWidth = 50;
    let decayRate = 2;
    let gameRunning = false;
    let speed = generateRandomSpeed();
    let pointLoss = 10;
    let aPress = false;
    let winner = false;


    function updateSpeedDisplay(speed) {
        $('#currentSpeedDisplay').text(`Current Speed: ${speed}`);
    }

    function naturalDecay() {
        progressBarWidth -= decayRate;
        updateProgressBar();
    }

    function updateProgressBar() {
        if(gameEnd == 0){
        if (gameRunning && progressBarWidth < 0 || gameRunning && progressBarWidth > 100) {
            clearTimeout(timer);
            score -= 100
            gameOver("You tripped and died!", score)
        }
        $('#keyPressProgressBar').css('width', `${progressBarWidth}%`);
    }
    }

    $("#legsGameButton").click(function() {
        startLegsMiniGame();
    });

    function startLegsMiniGame() {
        speed = generateRandomSpeed();
        
        progressBarWidth = 50;
        updateSpeedDisplay(speed);
        gameRunning = true;
        updateProgressBar();
        decayInterval = setInterval(naturalDecay, 50);
        timer = setTimeout(endGame, 5000);
        
    }

    function endGame() {
        gameRunning = false;
        clearInterval(decayInterval);
        updateProgressBar();
        setTimeout(temp, 300);
        
    }

    function temp() {
        let tooSlow = false;
        if (speed == 'slow') {
            if (progressBarWidth > 0) {
                if (progressBarWidth < 33) {
                    winner = true;
                }
            } else {
                tooSlow = true;
            }
        } else if (speed == 'medium') {
            if (progressBarWidth >= 33) {
                if (progressBarWidth < 66) {
                    winner = true;
                }
            } else {
                tooSlow = true;
            }
        } else if (speed == 'fast') {
            if (progressBarWidth >= 66 ) {
                if (progressBarWidth <= 100) {
                    winner = true;
                }
            } else {
                tooSlow = true;
                score -= 30
                
            }
        }
        
        if (winner) {

            score += 10;
        } else if (tooSlow) {

            score -= pointLoss;
        } else {

            score -= pointLoss;
        }
        console.log(progressBarWidth);
    }

    function generateRandomSpeed() {
        const speeds = ['slow', 'medium', 'fast'];
        return speeds[Math.floor(Math.random() * speeds.length)];
    }

    $(document).on('keydown', function(event) {
        
        if (gameRunning) {
            if (event.key === 'j' && aPress == false) {
                aPress = true;
                progressBarWidth += 10;
                updateProgressBar();
                updateSpeedDisplay(speed);
            }
            if (event.key == 'l' && aPress == true) {
                aPress = false;
                progressBarWidth += 10;
                updateProgressBar();
                updateSpeedDisplay(speed);
            }
        }
    });
