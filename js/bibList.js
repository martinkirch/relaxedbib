var handlebars = require('handlebars');
var $ = require('jquery');
var initMarkAsRead = require('js/readLater').markAsReadButton;
var getTagClickCallback = require('js/byTag').getTagClickCallback;

exports.showView = function(data, title) {
	$('#bibList').empty();
	$('#bibListTitle').text(title);
	
	for (var i in data.rows) {
		var row = data.rows[i];
		var container = $('<li>').attr('id', row.doc._id).data('doc', row.doc);
		
		$('#bibList').append(container);
		container.html(handlebars.templates['bibList.html']({doc: row.doc}));
		
		if (row.doc.read_later) {
			initMarkAsRead(container.find('.markAsRead'), container);
		}
		
		container.click(function(event) {
			event.preventDefault();
			$(this).find('.docDetails').toggle('fast');
		});
	}
	
	if (data.rows.length == 0 ){
		var flag = $('<li>')
			.addClass('empty')
			.html("No entry yet... Go back working on your bibliography !");
		
		$('#bibList').append(flag);
	} else {
		$('#bibList').find('.docTag').each(function(i,elem){
			$(elem).click(getTagClickCallback($(elem).text()));
		});
	}
};

