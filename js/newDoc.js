var db = require('db').current();
var $ = require('jquery');
var handlebars = require('handlebars');
var parser = require('js/BibTex-0.1.2');

var container = $('#newDocContainer');


function save() {
	var bib = new parser.BibTex();
	bib.content = $('#newDocBib').val();
	bib.parse();
	
	if (bib.data.length > 1) {
		alert("One at a time !");
		return;
	}
	
	var doc = bib.data[0];
	
	var relaxedbib = {
		modified_at: new Date().toJSON(),
		type: doc.entryType
		// TODO: tags, read later flag
	}
	
	doc.relaxedbib = meta;
	doc._id= doc.cite;
	delete doc.entryType;
	delete doc.cite;
	
	console.log(doc);
	
	db.saveDoc(doc, function(err, response) {
		if (err) {
			alert(err);
		} else {
			container.empty();
		}
	});
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

