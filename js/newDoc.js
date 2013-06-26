var db = require('db').current();
var $ = require('jquery');
var handlebars = require('handlebars');
var parser = require('js/bibtex');

var container = $('#newDocContainer');

var closeAfterUploading = true;

function upload(chain) {
	var item = chain.pop();
	if (item) {
		var doc = item.entry;
		doc._id = db.encode(item.id);
		doc.relaxedbib = {
			modified_at: new Date().toJSON(),
			type: item.type
			// TODO: tags, read later flag, 
			// do NOT attach PDF right now : if there's many entries which one owns the file ?
			// rather redirect to "latest" and allow update&upload
			
			// or only allow when there's only one entry !
		};
		
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

