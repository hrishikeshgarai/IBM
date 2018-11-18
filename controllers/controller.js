var fs = require('fs');
var contents = fs.readFileSync('./sample.json');
var myContents = JSON.parse(contents);
var result = [];
var pagedResult = [];

//fetch all data
exports.app_fetch = function app_fetch(req, res) {
	res.send(contents);
};

// filter, sort and paginate the data
exports.app_result = function app_result(req, res) {
	// filter
	var obj = req.body.filter;
	for (var i = 0; i < obj.length; i++) {
		var f = obj[i].field;
		var o = obj[i].operator;
		var v = obj[i].value;
		filterData(f, o, v);
	}
	// sort
	var sortObj = req.body.sort;
	for (i in sortObj[0]) {
		var key = i;
		var order = sortObj[0][i];
		sortData(key, order);
	}
	//pagination
	var page = req.body.pagination;
	var size = page[0].size;
	var page_no = page[0].page_no;
	pageData(size, page_no);
	res.send(pagedResult);
}

// save a new record to the JSON file
exports.app_newData = function app_newData(req, res) {
	var data = req.body;
	myContents.push(data);
	fs.writeFile('./sample.json', JSON.stringify(myContents), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
    });
}

function filterData(f, o, v) {
	for (var i = 0; i < myContents.length; i++) {
		var obj = myContents[i];
		if (o == "EQUAL" && obj[f] == v) {
			result.push(obj);
		}
		else if (o == "GREATERTHAN" && obj[f] > v) {
			result.push(obj);
		}
		else if (o == "LESSTHAN" && obj[f] < v) {
			result.push(obj);
		}
		else if (o == "STARTSWITH" && obj[f].startsWith(v)) {
			result.push(obj);
		}
		else if (o == "CONTAINS" && obj[f].contains(v)) {
			result.push(obj);
		}
	}
	myContents = result;
}

function sortData(key, order) {
	myContents.sort(function(a, b) {
		if (order.localeCompare("asc")) {
			if (a[key] > b[key]) {
				return -1;
			}
			else {
				return 1;
			}
		}
		else {
			if (a[key] > b[key]) {
				return 1;
			}
			else {
				return -1;
			}
		}
	});
}

function pageData(size, page_no) {
	var start = ((page_no - 1)*size);
	var end = start + size - 1;
	var i = start;
	while (i <= end) {
		if (myContents[i] != null) {
			pagedResult.push(myContents[i]);
			i++;
		}
		else break;
	}
}
