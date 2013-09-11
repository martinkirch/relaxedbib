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
				for (var i in doc.tags) {
					emit(doc.tags[i].toLowerCase(), null);
				}
			}
		},
		reduce: function(keys, values) { return null; }
	},
	
	byYear: {
		map: function(doc) {
			if (doc.bib.year) {
				emit(doc.bib.year, null);
			}
		},
		reduce: function(keys, values) { return null; }
	},
	
	byAuthor: {
		map: function(doc) {
			if (doc.bib.author) {
				for (var i in doc.bib.author) {
					emit(doc.bib.author[i], null);
				}
			}
		},
		reduce: function(keys, values) { return null; }
	}
};

