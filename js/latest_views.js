exports.views = {
	latest: {
		map: function(doc) {
			emit(doc.relaxedbib.modified_at, null);
		}
	}	
};

