exports.views = {
	byYear: {
		map: function(doc) {
			emit(doc.year, null);
		}
	}	
};

