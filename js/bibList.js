var handlebars = require('handlebars');
var $ = require('jquery');
var dbName = require('db').guessCurrent().db;

var initMarkAsRead = require('js/readLater').markAsReadButton;
var showByTag = require('js/byTag').showByTag;
var showByYear = require('js/byYear').showByYear;
var showByAuthor = require('js/byAuthor').showByAuthor;

function addBibEntry(row) {
	var container = $('<li>')
		.attr('id', row.doc._id)
		.addClass('bibEntry')
		.data('doc', row.doc);
	
	$('#bibList').append(container);
	container.html(handlebars.templates['bibList.html']({dbName: dbName, doc: row.doc}));
	
	if (row.doc.read_later) {
		initMarkAsRead(container.find('.markAsRead'), container);
	}
	
	container.find('.docExpand').click(function(event) {
		event.preventDefault();
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
		$('#bibList').find('.docTag').click(showByTag);
		$('#bibList').find('.docYear').click(showByYear);
		$('#bibList').find('.docAuthor').click(showByAuthor);
	}
};

