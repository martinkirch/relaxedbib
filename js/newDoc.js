var db = require('db').current();
var $ = require('jquery');
var handlebars = require('handlebars');
var parser = require('js/bibtex');

var container = $('#newDocContainer');


function save() {
	var bib = parser.parse($('#newDocBib').val());
	
	var errorHappened = false;	
	
	for (var directive in bib) {
		for (var id in bib[directive]) {
			var doc = bib[directive][id];
		
			doc.relaxedbib = {
				modified_at: new Date().toJSON(),
				type: directive
				// TODO: tags, read later flag, attach PDF
			};
			
			doc._id= db.encode(id);
			
			console.log(doc);
			
			db.saveDoc(doc, function(err, response) {
				if (err) {
					alert(err);
					errorHappened = true;
				}
			});
		}
	}
	
	if (!errorHappened) {
		container.empty();
	}
}

// its counterpart doesn't exist : just call container.empty()
function show() {
	container.html(handlebars.templates['newDoc.html']({}));
	
	container.show();
	
	container.find('.close').click(function(event) {
		event.preventDefault();
		container.empty();
	});
	
	$('#btnSaveNewDoc').click(function(event) {
		event.preventDefault();
		save();
	})
}

exports.start = function() {
	container.hide();
	$('#btnNew').click(function(event) {
		event.preventDefault();
		show();
	})
}

