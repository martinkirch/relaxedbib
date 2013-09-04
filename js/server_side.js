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
				doc.bib.author.forEach(function(author) {
					emit(author, null);
				});
			}
		},
		reduce: function(keys, values) { return null; }
	}
};

