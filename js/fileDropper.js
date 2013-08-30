var $ = require('jquery');
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
	$.jGrowl("Can't upload file to "+uri+": "+status+" - "+error, {group:'error'});
	targetElem = null;
};

fileReader.onloadend = function(loadedEvent) {
	if (loadedEvent.target.readyState == FileReader.DONE) {
		var doc = targetElem.data('doc');
		var uri = db.url + doc._id + '/' + doc._id + '.pdf';
		
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


exports.start = function() {
	$(document).on('dragenter', '.bibEntry', function(e) {
		var dt = e.originalEvent.dataTransfer;
	
		if (dt.files && dt.files.length == 1) {
			$(this).addClass('draggedOver');
			e.stopPropagation();
			e.preventDefault();
		}
	
	}).on('dragover', '.bibEntry', function(e) {
		var dt = e.originalEvent.dataTransfer;
		
		if (dt.files && dt.files.length == 1) {
			e.stopPropagation();
			e.preventDefault();
		}
	
	}).on('dragleave', '.bibEntry', function(e) {
		$(this).removeClass('draggedOver');
	
	}).on('drop', '.bibEntry', function(e) {	
		e.stopPropagation();
		e.preventDefault();
		$(this).removeClass('draggedOver');
	
		var dt = e.originalEvent.dataTransfer;
	
		if (dt.files && dt.files.length == 1) {
			var droppedFile = dt.files[0];
			targetElem = $(this);
			fileReader.readAsArrayBuffer(droppedFile);
		}
	});
}

