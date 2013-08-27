var db = require('db').current();
var designDoc = require('db').guessCurrent().design_doc;
var $ = require('jquery');
var handlebars = require('handlebars');
var bibList = require('js/bibList');

function showByTag(tag) {
	return function(event) {
		event.preventDefault();
		
		var q = {
			reduce: false,
			key: JSON.stringify(tag),
			include_docs: true
		};
		
		db.getView(designDoc, 'byTag', q, function(err, data) {
			if(err) {
				return alert(err);
			} else {
				bibList.showView(data, "Documents tagged \""+tag+"\"");
			}
		});
	}
}


exports.start = function() {
	db.getView(designDoc, 'byTag', {group:true}, function(err, data) {
		if(err) {
			return alert(err);
		} else {
			var tagList = $('#tagList');
			for (var i in data.rows) {
				var tag = data.rows[i].key;
				var li = $('<li>');
				$('<a>').attr('href','#')
					.text(tag)
					.click(showByTag(tag))
					.appendTo(li);
				li.appendTo(tagList);
			}
		}
	});
}
