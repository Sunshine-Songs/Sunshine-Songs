/**
 * script.js: Script that powers landing page
 */
(function () {
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
})();
