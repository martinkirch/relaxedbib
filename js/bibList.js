var handlebars = require('handlebars');
var $ = require('jquery');
var initMarkAsRead = require('js/readLater').markAsReadButton;
var getTagClickCallback = require('js/byTag').getTagClickCallback;

function addBibEntry(row) {
	var container = $('<li>')
		.attr('id', row.doc._id)
		.addClass('bibEntry')
		.data('doc', row.doc);
	
	$('#bibList').append(container);
	container.html(handlebars.templates['bibList.html']({doc: row.doc}));
	
	if (row.doc.read_later) {
		initMarkAsRead(container.find('.markAsRead'), container);
	}
	
	container.children('.docExpand').click(function(event) {
		container.find('.docDetails').toggle('fast');
	});
}

exports.showView = function(data, title) {
	$('#bibList').empty();
	$('#bibListTitle').text(title);
	
	for (var i in data.rows) {
		addBibEntry(data.rows[i]);
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

