var handlebars = require('handlebars');
var $ = require('jquery');

exports.showView = function(data, title) {
	$('#bibList').html(handlebars.templates['bibList.html'](data));
	$('#bibListTitle').text(title);
};

