window.ChatComponent = function (element) {
	var self = this;
	var loginValue = element.find('.login-value');
	var loginButton = element.find('.login-button');
	var textValue = element.find('.text-value');
	var textButton = element.find('.text-button');
	var chatMessages = element.find('.chat-messages');

	loginButton.click(function () {
		var value = loginValue.val();
		if (value) {
			self.loginChanged && self.loginChanged(value);
		}
	});

	textButton.click(function () {
		debugger;
		var value = textValue.val();
		if (value) {
			self.textChanged && self.textChanged(value);
		}
	});

	this.addMessage = function (data) {
		var html = [];
		html.push('<div class="chat-login">' + (data.login || 'anonymous') + '</div>');
		html.push('<div class="chat-text">' + (data.text || 'empty') + '</div>');
		chatMessages.append(html.join(''));
	};
};