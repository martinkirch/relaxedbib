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
	},
	
	// use group=true to retrieve a tag list
	// use reduce=false, include_docs=true,key=XYZ to fetch docs by tag
	byTag: {
		map: function(doc) {
			if (doc.relaxedbib.tags) {
				doc.relaxedbib.tags.forEach(function(tag) {
					emit(tag, null);
				});
			}
		},
		reduce: function(keys, values) { return null; }
	}
};

