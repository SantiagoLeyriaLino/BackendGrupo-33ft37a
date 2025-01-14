const modelateData = (query, data) => {
	var info;
	var currentPage = query;
	var documentsPerPage = 9;
	if (data.length == 0) {
		throw new Error('no info');
	}
	var indexOfLastDocument = currentPage * documentsPerPage;
	var indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
	var currentDocuments = data.slice(indexOfFirstDocument, indexOfLastDocument);
	var totalPages = Math.ceil(data.length / documentsPerPage);
	info = {
		page: currentPage,
		totalPages: totalPages,
		documents: currentDocuments,
	};

	return info;
};

module.exports = modelateData;
