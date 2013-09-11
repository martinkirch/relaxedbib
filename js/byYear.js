var db = require('db').current();
var designDoc = require('db').guessCurrent().design_doc;
var $ = require('jquery');
var handlebars = require('handlebars');
var bibList = require('js/bibList');

exports.showByYear = function(year) {
	if (year.target) {
		year = $(year.target).text();
	}
	
	var q = {
		reduce: false,
		key: JSON.stringify(year),
		include_docs: true
	};
	
	db.getView(designDoc, 'byYear', q, function(err, data) {
		if(err) {
			return alert(err);
		} else {
			bibList.showView(data, "Documents from \""+year+"\"");
		}
	});
};

function showSelected() {
	exports.showByYear($("#byYearSelector option:selected").text());
};

exports.start = function() {
	db.getView(designDoc, 'byYear', {group:true, descending: true}, function(err, data) {
		if(err) {
			return alert(err);
		} else {
			$('#byYear').html(handlebars.templates['byYear.html'](data));
			$('#byYearSelector').change(showSelected);
			$('#showByYear').click(showSelected);
		}
	});
};
