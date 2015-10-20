(function (window, $, undefined) {

	window.PainterComponent = function (element) {
		var self = this;
		this._subscriptions = {};
		var canvas = element.find('canvas');
		var context = canvas.get(0).getContext('2d');
		context.lineCap = 'round';
		context.lineJoin = 'round';
		this._colorPicker = element.find('input.color-picker');
		this._widthRange = element.find('input.lineWidth');
		var started = false
		this.loading = element.find('.loading');
		this._color = this._colorPicker.val() || '#000';
		this._lineWidth = this._widthRange.val() || 1;


		this._getCoords = function (e) {
			var x, y;
			var x = (e.offsetX || e.clientX - $(e.target).offset().left);
			var y = (e.offsetY || e.clientY - $(e.target).offset().top);
			return { x: x, y: y };
		};

		self._widthRange.change(function () {
			self._lineWidth = $(this).val();
		});
		self._colorPicker.change(function () {
			self._color = $(this).val();
		});

		$('canvas').mousedown(function (e) {
			started = true;
			var coords = self._getCoords(e);
			self._startX = coords.x;
			self._startY = coords.y;
		});
		$(document.body).mouseup(function (e) {
			started = false;
		});
		$('canvas').mousemove(function (e) {
			if (started !== true) {
				return;
			}
			var coords = self._getCoords(e);
			var data = {
				type: "line",
				x1: self._startX,
				y1: self._startY,
				x2: coords.x,
				y2: coords.y,
				width: self._lineWidth,
				color: self._color
			}
			self._startX = coords.x;
			self._startY = coords.y;
			self.draw(data);
			self.onDraw && self.onDraw(data);
		});

		this.draw = function (data) {
			switch (data.type) {
				case 'line':
					context.beginPath();
					context.strokeStyle = data.color;
					context.lineWidth = data.width;
					context.moveTo(data.x1, data.y1);
					context.lineTo(data.x2, data.y2);
					context.stroke();
					context.closePath();
					break;
			}
		};

		this.drawImage = function (data) {
			var self = this;
			if (typeof data === 'string') {
				var image = new Image();
				image.src = data;
				image.onload = function () {
					context.drawImage(image, 0, 0);
					self.loading.hide();
				};
			}
		};
	};
} (window, $))