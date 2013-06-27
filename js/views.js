exports.views = {
	latest: {
		map: function(doc) {
			emit(doc.relaxedbib.modified_at, null);
		}
	},
	
	readLater: {
		map: function(doc) {
			if (doc.relaxedbib.read_later) {
				emit(doc.relaxedbib.modified_at, null);
			}
		}
	}
};

