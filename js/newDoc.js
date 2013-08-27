var db = require('db').current();
var $ = require('jquery');
var handlebars = require('handlebars');
var parser = require('js/bibtex');

var container = $('#newDocContainer');

function upload(chain, baseDoc, closeAfterUploading) {
	var item = chain.pop();
	if (item) {
		var doc = jQuery.extend({}, baseDoc);
		doc.bib = item.entry;
		doc._id = db.encode(item.id);
		doc.type = item.type;
		
		db.saveDoc(doc, function(err, response) {
			if (err) {
				if (err.status == 409) {
					$.jGrowl("Ignoring existing entry "+item.id);
				} else {
					$.jGrowl(err, {group:'error'});
					closeAfterUploading = false;
				}
			}
			upload(chain, baseDoc, closeAfterUploading);
		});
		
	} else if (closeAfterUploading){
		container.empty();
	}
}

function save() {
	var bibChain = parser.parse($('#newDocBib').val());
	
	var doc = {};
	doc.created_at = new Date().toJSON();
	doc.modified_at = doc.created_at;
	doc.read_later = $('#newDocReadLater').is(':checked');
	doc.comments = $('#newDocComment').val().trim();
	doc.tags = [];
	
	var tags = $("#newDocTags").val().trim().split(',');
	for (var i in tags) {
		var tag = tags[i].trim();
		if (tag.length > 0) {
			doc.tags.push(tag);
		}
	}
	
	upload(bibChain, doc, true);
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

