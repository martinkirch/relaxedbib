var $ = require('jquery');
var db = require('db').current();
var fileReader = new FileReader();

var targetElem = null;

onUploadedSuccess = function(response) {
	var data = $.parseJSON(response);
	db.getDoc(data.id, function(err, response) {
		if (err) {
			$.jGrowl(err, {group:'error'});
		} else {
			targetElem.data('doc', response);
		}
		
		targetElem = null;
	});
};

onUploadedError = function(xhr, status, error) {
	$.jGrowl("Can't upload file : "+status+" - "+error, {group:'error'});
	targetElem = null;
};

fileReader.onloadend = function(loadedEvent) {
	if (loadedEvent.target.readyState == FileReader.DONE) {
		var doc = targetElem.data('doc');
		var uri = db.url + '/' + doc._id + '/' + doc._id + '.pdf?rev=' + doc._rev;
		
		$.ajax({
			url: uri,
			type: 'PUT',
			data: loadedEvent.target.result,
			processData: false,
			contentType: 'application/pdf',
			success: onUploadedSuccess,
			error: onUploadedError
		});
	}
};


function isDraggedFiles(dataTransfer) {
	var t = dataTransfer.types;
	if (t.indexOf) { // chrome
		return t.indexOf('Files') >= 0 || dataTransfer.files != null;
	} else if (t.contains) { // firefox
		return t.contains('Files') || dataTransfer.files != null;
	}
}


exports.start = function() {
	$(document).on('dragenter', '.dropZone', function(e) {
		var dt = e.originalEvent.dataTransfer;
		
		if (isDraggedFiles(dt)) {
			$(this).addClass('draggedOver');
			e.stopPropagation();
			e.preventDefault();
		}
	
	}).on('dragover', '.dropZone', function(e) {
		var dt = e.originalEvent.dataTransfer;
		
		if (isDraggedFiles(dt)) {
			e.stopPropagation();
			e.preventDefault();
		}
	
	}).on('dragleave', '.dropZone', function(e) {
		$(this).removeClass('draggedOver');
	
	}).on('drop', '.dropZone', function(e) {	
		e.stopPropagation();
		e.preventDefault();
		$(this).removeClass('draggedOver');
	
		var dt = e.originalEvent.dataTransfer;
	
		if (dt.files && dt.files.length == 1) {
			var droppedFile = dt.files[0];
			targetElem = $(this).closest('.bibEntry');
			fileReader.readAsArrayBuffer(droppedFile);
		}
	});
}

