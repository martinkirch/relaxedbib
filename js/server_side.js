exports.views = {
	latest: {
		map: function(doc) {
			emit(doc.modified_at, null);
		}
	},
	
	readLater: {
		map: function(doc) {
			if (doc.read_later) {
				emit(doc.modified_at, null);
			}
		}
	},
	
	// use group=true to retrieve a tag list
	// use reduce=false, include_docs=true,key=XYZ to fetch docs by tag
	byTag: {
		map: function(doc) {
			if (doc.tags) {
				doc.tags.forEach(function(tag) {
					emit(tag, null);
				});
			}
		},
		reduce: function(keys, values) { return null; }
	}
};

