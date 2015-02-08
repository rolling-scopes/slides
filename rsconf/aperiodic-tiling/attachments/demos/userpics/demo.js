window.addEventListener('load', function () {
	var container;
	var canvas;
	// var label;
	var i;

	var wrapper = document.querySelector('.userpics');

	for (i = 100; i < 130; i++) {
		container = document.createElement('div');
		// label = document.createElement('div');
		canvas = document.createElement('canvas');

		createUserpic(canvas, i);

		// label.innerHTML = i;
		container.appendChild(canvas);
		// container.appendChild(label);
		wrapper.appendChild(container);
	}
});