var db = require('db').current();
var designDoc = require('db').guessCurrent().design_doc;
var $ = require('jquery');
var handlebars = require('handlebars');

exports.show = function() {
	db.getView(designDoc, 'readLater', {include_docs:true}, function(err, data) {
		if(err) { return alert(err);}
		
		$('#bibList').html(handlebars.templates['bibList.html'](data));
		$('#bibListTitle').text("To read again");
	});
}


exports.start = function() {
	$('#btnReadLater').click(function(event) {
		event.preventDefault();
		exports.show();
	})
};



