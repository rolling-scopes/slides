window.addEventListener('load', function () {
	var canvas = document.createElement('canvas');
	var controller = {
		seed: 12,
		colorsNumber: 3,
		width: 400,
		cols: 10,
		hueStep: 120,
		easing: 'linear',
		update: function () {
			createUserpic(canvas, this.seed, this.colorsNumber, this.width, null, this.cols, null, this.hueStep, this.easing);
		},
		randomSeed: function () {
			this.seed = Math.floor(100000 * Math.random());
			this.update();
		},
		demo: function () {
			if (this.interval) {
				clearInterval(this.interval);
				this.interval = null;
			} else {
				this.randomSeed();
				this.interval = setInterval(this.randomSeed.bind(this), 1000);
			}
		},
		interval: null
	};

	var gui = new dat.GUI({ autoPlace: false });

	gui.add(controller, 'seed').step(1).listen();
	gui.add(controller, 'colorsNumber').step(1).min(2);
	gui.add(controller, 'width').step(20).min(100);
	gui.add(controller, 'cols').step(1).min(2);
	gui.add(controller, 'hueStep').step(1);
	gui.add(controller, 'easing', ['linear', 'easeOutQuart', 'easeInQuart']);
	gui.add(controller, 'update');
	gui.add(controller, 'randomSeed');
	gui.add(controller, 'demo');

	controller.update();

	var customContainer = document.querySelector('.userpic-playground');
	customContainer.appendChild(gui.domElement);
	customContainer.appendChild(canvas);

	window.userpicDemoRunner = controller.demo.bind(controller);
});