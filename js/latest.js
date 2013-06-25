var db = require('db').current();
var designDoc = require('db').guessCurrent().design_doc;
var $ = require('jquery');
var handlebars = require('handlebars');

exports.start = function() {
	
	db.getView(designDoc, 'byYear', {include_docs:true}, function(err, data) {
		if(err) { return alert(err);}
		
		$('#latest').html(handlebars.templates['bibList.html'](data));
	});
};



