/**
 * script.js: Script that powers landing page
 */
(function () {
    const UPDATE_INTRERVAL = 100,
        CONCERT_START = new Date(1588456800000),
        CONCERT_SHOW = new Date(1588456740000); // 1 min before concert start

    var timerInterval, videoDisplayInterval;

    function updateTimer() {
        // Update the number of days, hours, minutes, and seconds remaining
        var now = new Date();
        if (now > CONCERT_SHOW) {
            return false; // Nothing to do here, since concert is visible
        }
        var totalSecondsRemaining = (CONCERT_START - now) / 1000,
            timeRemaining = totalSecondsRemaining;

        var daysRemaining = Math.floor(timeRemaining / 86400);
        timeRemaining -= daysRemaining * 86400;
        var hoursRemaining = Math.floor(timeRemaining / 3600);
        timeRemaining -= hoursRemaining * 3600;
        var minutesRemaining = Math.floor(timeRemaining / 60);
        timeRemaining -= minutesRemaining * 60;
        var secondsRemaining = Math.floor(timeRemaining);

        document.querySelector('#countdown-days').textContent = daysRemaining;
        document.querySelector('#countdown-hours').textContent = hoursRemaining;
        document.querySelector('#countdown-minutes').textContent = minutesRemaining;
        document.querySelector('#countdown-seconds').textContent = secondsRemaining;

        return true;
    };
    function updateVideoDisplay() {
        var now = new Date();
        if (now < CONCERT_SHOW) {
            return false // Not yet time to show the concert
        }

        // Switch classes around
        if (timerInterval) {
            clearInterval(timerInterval);
        }
        if (videoDisplayInterval) {
            clearInterval(videoDisplayInterval);
        }
        // These classes switch what gets displayed
        document.querySelector('.youtube-placeholder').className += ' show-concert';
        document.querySelector('.youtube-vidoe').className += ' show-concert';
        return true;
    };
    window.addEventListener('load', function () {
        if (!updateVideoDisplay()) {
            videoDisplayInterval = setInterval(updateVideoDisplay, UPDATE_INTRERVAL);
            if (updateTimer()) {
                timerInterval = setInterval(updateTimer, UPDATE_INTRERVAL);
            }
        }
    })
})();

function performUpdates() {

};

window.onload = function () {

};