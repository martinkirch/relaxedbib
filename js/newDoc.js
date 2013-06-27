var db = require('db').current();
var $ = require('jquery');
var handlebars = require('handlebars');
var parser = require('js/bibtex');

var container = $('#newDocContainer');

var closeAfterUploading = true;
var meta = {};

function upload(chain) {
	var item = chain.pop();
	if (item) {
		var doc = item.entry;
		doc._id = db.encode(item.id);
		
		meta.type = item.type;
		doc.relaxedbib = meta;
		
		db.saveDoc(doc, function(err, response) {
			if (err) {
				if (err.status == 409) {
					$.jGrowl("Ignoring existing entry "+item.id);
				} else {
					$.jGrowl(err, {group:'error'});
					closeAfterUploading = false;
				}
			}
			upload(chain);
		});
		
	} else if (closeAfterUploading){
		container.empty();
	}
}

function save() {
	var bibChain = parser.parse($('#newDocBib').val());
	
	meta.modified_at = new Date().toJSON();
	meta.read_later = $('#newDocReadLater').is(':checked');
	meta.comments = $('#newDocComment').val().trim();
	meta.tags = [];
	
	var tags = $("#newDocTags").val().trim().split(',');
	for (var i in tags) {
		var tag = tags[i].trim();
		if (tag.length > 0) {
			meta.tags.push(tag);
		}
	}
	
	var closeAfterUploading = true;
	upload(bibChain);
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

