$(document).ready(function() {
    let progressBarWidth = 25;
    let decayRate = 0.05;
    let gameRunning = false;
    let speed = generateRandomSpeed();
    let score = 0;
    let pointLoss = 10;
    let aPress = false;

    function updateSpeedDisplay(speed) {
        $('#currentSpeedDisplay').text(`Current Speed: ${speed}`);
    }

    function updateProgressBar() {
        let winner = false;
        let tooSlow = false;
        let temp = true;
        progressBarWidth -= decayRate;
        $('#keyPressProgressBar').css('width', `${progressBarWidth}%`);

        if (gameRunning && progressBarWidth > 0) {
            setTimeout(updateProgressBar, 1000/60);
        } else  if (temp) {
            if (speed == 'slow') {
                if (progressBarWidth > 0 && progressBarWidth < 33) {
                    winner = true;
                } else {
                    tooSlow = true;
                }
            } else if (speed == 'medium') {
                if (progressBarWidth >= 33 && progressBarWidth < 66) {
                    winner = true;
                } else {
                    tooSlow = true;
                }
            } else if (speed == 'fast') {
                if (progressBarWidth >= 66 && progressBarWidth <= 100) {
                    winner = true;
                } else {
                    tooSlow = true;
                }
            }
            
            if (winner) {
                console.log("You survived");
                alert("You survived");
                score += 10;
            } else if (tooSlow) {
                console.log("You were too slow. -" + pointLoss + " points");
                alert("You were too slow. -" + pointLoss + " points");
            } else {
                console.log("You were too fast. You trip, -" + pointLoss + " points");
                alert("You were too fast. You trip, -" + pointLoss + " points");
            }
            temp = false;
            gameRunning = false;
        }
    }

    $("#legsGameButton").click(function() {
        startLegsMiniGame();
    });

    function startLegsMiniGame() {
        speed = generateRandomSpeed();
        alert(`Welcome to the Legs Mini-Game!\nYour challenge: Click between 'A' and 'D' repeatedly at ${speed} speed.`);
        progressBarWidth = 25;
        updateSpeedDisplay(speed);
        gameRunning = true;
        updateProgressBar();
        setTimeout(endGame, 5000);
    }

    function endGame() {
        gameRunning = false;
    }

    function generateRandomSpeed() {
        const speeds = ['slow', 'medium', 'fast'];
        return speeds[Math.floor(Math.random() * speeds.length)];
    }

    $(document).on('keydown', function(event) {
        
        if (gameRunning) {
            if (event.key === 'a' && aPress == false) {
                aPress = true;
                progressBarWidth += 10;
                updateProgressBar();
                updateSpeedDisplay(speed);
            }
            if (event.key == 'd' && aPress == true) {
                aPress = false;
                progressBarWidth += 10;
                updateProgressBar();
                updateSpeedDisplay(speed);
            }
        }
    });
});
