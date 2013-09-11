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
	exports.showByAuthor($("#byAuthorSelector option:selected").val());
};

function reverseAuthorName(author) {
	var splitted = author.split(" ");
	var i = splitted.length - 1;
	var l = splitted[i];
	splitted[i] = splitted[0];
	splitted[0] = l+",";
	return splitted.join(" ");
}

function compareByLabel(a,b) {
	if (a.label > b.label) {
		return 1;
	} else if (a.label < b.label) {
		return -1;
	} else {
		return 0;
	}
}

exports.start = function() {
	db.getView(designDoc, 'byAuthor', {group:true}, function(err, data) {
		if(err) {
			return alert(err);
		} else {
			for (var i in data.rows) {
				data.rows[i].label = reverseAuthorName(data.rows[i].key);
			}
			
			data.rows.sort(compareByLabel);
			
			$('#byAuthor').html(handlebars.templates['byAuthor.html'](data));
			$('#byAuthorSelector').change(showSelected);
			$('#showByAuthor').click(showSelected);
		}
	});
};
