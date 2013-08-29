var db = require('db').current();
var designDoc = require('db').guessCurrent().design_doc;
var $ = require('jquery');
var handlebars = require('handlebars');
var bibList = require('js/bibList');

exports.markAsReadButton = function(button, container) {
	container.addClass('readLater');
	
	button.click(function(event) {
		event.preventDefault();
		button.text(button.text() + "...");
		
		var doc = container.data('doc');
		delete(doc.read_later);
		
		db.saveDoc(doc, function(err, response) {
			if (err) {
				$.jGrowl(err, {group:'error'});
			} else {
				button.remove();
				container.removeClass('readLater');
			}
		});
	});
};


exports.show = function() {
	db.getView(designDoc, 'readLater', {include_docs:true}, function(err, data) {
		if(err) { return alert(err);}
		
		bibList.showView(data, "Reading list");
	});
}


exports.start = function() {
	$('#btnReadLater').click(function(event) {
		event.preventDefault();
		exports.show();
	})
};



