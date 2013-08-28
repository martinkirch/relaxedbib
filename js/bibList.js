var handlebars = require('handlebars');
var $ = require('jquery');
var getTagClickCallback = require('js/byTag').getTagClickCallback;

exports.showView = function(data, title) {
	$('#bibList').html(handlebars.templates['bibList.html'](data));
	$('#bibListTitle').text(title);
	
	$('#bibList').find('.docTag').each(function(i,elem){
		$(elem).click(getTagClickCallback($(elem).text()));
	});
};

