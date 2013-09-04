var db = require('db').current();
var designDoc = require('db').guessCurrent().design_doc;
var $ = require('jquery');
var handlebars = require('handlebars');
var bibList = require('js/bibList');

exports.showByAuthor = function(author) {
	if (author.target) {
		author = $(author.target).text();
	}
	
	var q = {
		reduce: false,
		key: JSON.stringify(author),
		include_docs: true
	};
	
	db.getView(designDoc, 'byAuthor', q, function(err, data) {
		if(err) {
			return alert(err);
		} else {
			bibList.showView(data, "Documents by \""+author+"\"");
		}
	});
};

function showSelected() {
	exports.showByAuthor($("#byAuthorSelector option:selected").text());
};

exports.start = function() {
	db.getView(designDoc, 'byAuthor', {group:true}, function(err, data) {
		if(err) {
			return alert(err);
		} else {
			$('#byAuthor').html(handlebars.templates['byAuthor.html'](data));
			$('#byAuthorSelector').change(showSelected);
			$('#showByAuthor').click(showSelected);
		}
	});
};
