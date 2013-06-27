var db = require('db').current();
var designDoc = require('db').guessCurrent().design_doc;
var $ = require('jquery');
var handlebars = require('handlebars');

exports.show = function() {
	db.getView(designDoc, 'latest', {descending:true, include_docs:true, limit:10}, function(err, data) {
		if(err) { return alert(err);}
		
		$('#bibList').html(handlebars.templates['bibList.html'](data));
		$('#bibListTitle').text("Latest 10 entries");
	});
}


exports.start = function() {
	$('#btnLatest').click(function(event) {
		event.preventDefault();
		exports.show();
	})
	exports.show();
};



