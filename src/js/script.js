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
		const SHOW_CONCERT = 'show-concert';
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
		var placeholder = document.querySelector('.youtube-placeholder'),
			video = document.querySelector('.youtube-video');
		if (placeholder.className.indexOf(SHOW_CONCERT) === -1) {
			placeholder.className += ' ' + SHOW_CONCERT;
		}
		if (video.className.indexOf(SHOW_CONCERT) === -1) {
			video.className += ' ' + SHOW_CONCERT;
		}
		return true;
	};
	window.addEventListener('load', function () {
		if (!updateVideoDisplay()) {
			videoDisplayInterval = setInterval(updateVideoDisplay, UPDATE_INTRERVAL);
			if (updateTimer()) {
				timerInterval = setInterval(updateTimer, UPDATE_INTRERVAL);
			}
		}
	});
	window.modal = function (modalId, method) {
		const OPEN_CLASS = 'modal-open'
		var modal = document.querySelector('#' + modalId),
			body = document.querySelector('body');
		if (method === 'open') {
			if (modal.className.indexOf(OPEN_CLASS) === -1) {
				modal.className += ' ' + OPEN_CLASS;
				body.className += ' ' + OPEN_CLASS;
			}
		} else if (method === 'close') {
			var openIndex = modal.className.indexOf(OPEN_CLASS);
			if (openIndex > -1) {
				modal.className = modal.className.replace(
					OPEN_CLASS,
					''
				);
				body.className = body.className.replace(
					OPEN_CLASS,
					''
				);
			}
		}
	};
	// Even if window hasn't yet loaded, the elements should be available, so
	// we should configure them to prevent flashing the wrong thing
	try {
		updateVideoDisplay();
		updateTimer();
	} catch (ex) { ; }
})();
