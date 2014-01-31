exports.start = function() {
	require('js/bibList').start();
	require('js/latest').start();
	require('js/newDoc').start();
	require('js/readLater').start();
	require('js/byAuthor').start();
	require('js/byTag').start();
	require('js/byYear').start();
	require('js/fileDropper').start();

	var handlebars = require('handlebars');

	/**
	 * Use with triple braces !
	 */
	handlebars.registerHelper('br', function(text) {
		return (new handlebars.SafeString(text)).toString().replace(/\n/g,"<br>\n");
	});

	handlebars.registerHelper('braces', function(text) {
		return '{'+bibSafeString(text)+'}';
	});

	function bibSafeString(s) {
		return new handlebars.SafeString(s);
	};

	handlebars.registerHelper('bibfield', function(text) {
		if (typeof text == 'string') {
			return '{'+bibSafeString(text)+'}';
		} else if (typeof text == 'object' && text.hasOwnProperty('length')) {
			return '{'+text.map(bibSafeString).join(' and ')+'}';
		} else {
			return '{'+bibSafeString(text)+'}';
		}
	});
};


