document.addEventListener('DOMContentLoaded', function () {

    const speedElement = document.getElementById('speed-text');
    const resultTextElement = document.getElementById('result-text');

    const speeds = ['slow', 'medium', 'fast'];
    let requiredSpeed = speeds[Math.floor(Math.random() * speeds.length)];
    speedElement.textContent = requiredSpeed;

    let lastKeyPressTime = 0;
    let keyPressCount = 0;
    const keyPresses = [];
    const requiredPressRate = {
        slow: 1000,
        medium: 500,
        fast: 250
    };

    document.addEventListener('keydown', function (event) {
        console.log(`Leg Task - Key pressed: ${event.key}`);
        
        if (event.key === 'a' || event.key === 'd') {
            const currentTime = Date.now();

            if (lastKeyPressTime) {
                const timeDiff = currentTime - lastKeyPressTime;
                keyPresses.push(timeDiff);

                console.log(`Leg Task - Time difference: ${timeDiff}`);
                console.log(`Leg Task - Key presses array: ${keyPresses}`);

                if (keyPresses.length > 5) {
                    keyPresses.shift(); // Keep only the last 5 key presses
                }

                const averagePressRate = keyPresses.reduce((a, b) => a + b) / keyPresses.length;
                console.log(`Leg Task - Average press rate: ${averagePressRate}`);

                if (averagePressRate <= requiredPressRate[requiredSpeed]) {
                    resultTextElement.textContent = 'Correct speed!';
                    resultTextElement.style.color = 'green';
                } else {
                    resultTextElement.textContent = 'Too slow!';
                    resultTextElement.style.color = 'red';
                }
            }

            lastKeyPressTime = currentTime;
            keyPressCount++;
        }
    });
});
