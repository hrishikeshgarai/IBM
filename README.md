# IBM
IBM Exercise

How to run:
 1. Clone the repository
 2. cd to the repository folder
 3. npm init
 4. npm install
 5. node app.js
 
 API Functionality :
  1. localhost:3000/ibmex/fetchAll - Fetch/Download the entire dataset
  2. localhost:3000/ibmex/resultData - Performs filtering, sorting and pagination as per the given parameters
  3. localhost:3000/ibmex/newData - Appends a new record to the sample file
  
The APIs are tested using Postman in order to pass the data-parameters in the body as POST Request.
  
Sample POST Request for filtering, sorting and pagination:
{
	"filter" : [{"field": "age", "operator": "EQUAL", "value": 71}],
	"sort" : [{"first_name":"desc"}],
	"pagination" : [{"size" : 5, "page_no" : 2}]
}

Sample POST Request for adding new record:

{"id":0,"first_name":"Hrishikesh","last_name":"Garai","email":"hg1230@nyu.edu","gender":"Male","age":26}

Note: Page Number starts with 1.

# Overview
This Node.js application consists of three APIs:
 1. /fetchAll - This API fetches the raw dataset and downloads it locally for viewing. It uses to HTTP GET Request.
 2. /resultData - This API performs three different functionalities as below:
  a. Filter - Filtering can be performed on any column of types String and Number, and supports the below operators:
     String - EQUAL, CONTAINS, STARTSWITH
     Number - EQUAL, GREATERTHAN, LESSTHAN
  b. Sort - Sorting is performed on the given columns in ascending or descending order as mentioned. In case of multiple sort,it 
     sorts according to the last condition as can be tested using the above POST Request.
  c. Pagination - It takes the page number, the number of entries per page and returns the records within that page of the 
     filtered and sorted dataset. It also returns the total number of pages.
 3. /newData - Appends a new record to the sample dataset.
	    
