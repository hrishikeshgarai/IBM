# IBM
IBM Exercise
How to run:
 1. Clone the repository
 2. cd to the repository folder
 3. npm init
 4. npm install
 5. node app.js
 
 API functionality :
  1. localhost:3000/ibmex/fetchAll - Fetch/Download the entire dataset
  2. localhost:3000/ibmex/resultData - Performs filtering, sorting and pagination as per the given parameters
  
Sample POST Request:
{
	"filter" : [{"field": "age", "operator": "EQUAL", "value": 71}],
	"sort" : [{"first_name":"desc"}],
	"pagination" : [{"size" : 10, "page_no" : 1}]
}
