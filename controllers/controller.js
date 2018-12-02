var fs = require('fs');
var contents = fs.readFileSync('./sample.json');
contents = JSON.parse(contents);
var myContents = contents;
var result = [];
var pagedResult = [];

// main page
exports.app_home = function app_home(req, res) {
	res.render('home');
};

// fetch all data
exports.app_fetch = function app_fetch(req, res) {
	res.render('view', {content : JSON.stringify(contents)});
};

// filter, sort and paginate the data
exports.app_post = function app_post(req, res) {
	res.render('filterview');
};

exports.app_result = function app_result(req, res) {
	myContents = contents;
	var obj = req.body;
	
	// filter
	if (obj.filter != null) {
		if (obj.filter == "filter") {
			var f = obj.field;
			var o = obj.operator;
			var v = obj.value[0];
			filterData(f,o,v);
		}
		else {
			for (var i = 0; i < obj.filter.length; i++) {
				var f = obj.field[i];
				var o = obj.operator[i];
				var v = obj.value[i];
				filterData(f, o, v);
			}
		}
	}

	// sort
	if (obj.sort != null) {
		if (obj.sort == "sort") {
			var key = obj.key;
			var order = obj.order;
			sortData(key, order);
		}
		else {
			for (var i = 0; i < obj.sort.length; i++) {
				var key = obj.key[i];
				var order = obj.order[i];
				sortData(key, order);
			}
		}
	}
	//pagination
	if (obj.size != "" && obj.page_no != "") {
		var size = obj.size;
		var page_no = obj.page_no;
		pageData(size, page_no);
		myContents = pagedResult;
	}
	res.render('view', {content : JSON.stringify(myContents)});
}

// save a new record to the JSON file
exports.app_new = function app_new(req, res) {
	res.render('newview');
};

exports.app_newData = function app_newData(req, res) {
	myContents = contents;
	var data = req.body;
	myContents.push(data);
	sortData("id", "asc");
	fs.writeFile('./sample.json', JSON.stringify(myContents, null, 6), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    res.send("New record created");
    });
}

// filter function
function filterData(f, o, v) {
	result = [];
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
		else if (o == "CONTAINS" && obj[f].includes(v)) {
			result.push(obj);
		}
	}
	myContents = result;
}

// sort function
function sortData(key, order) {
	myContents.sort(function(a, b) {
		if (order == "desc") {
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

// page function
function pageData(size, page_no) {
	pagedResult = [];
	var pages = Math.ceil(myContents.length / size);
	pagedResult.push({"Pages" : pages, "Page No" : page_no});
	var start = ((page_no - 1)*size);
	var end = start + parseInt(size) - 1;
	var i = start;
	while (i <= end) {
		if (myContents[i] != null) {
			pagedResult.push(myContents[i]);
			i++;
		}
		else break;
	}
}