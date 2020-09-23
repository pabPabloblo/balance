# Accounting Notebook

## Assumptions

Doing an operation of the the type "debit" is a debit into 
another from ours therefore representing a reduce of money 
from our account and an increase in theirs (negative amount 
to our balance), and the operation of type "credit" is a 
credit into another account from ours therefore bringing 
money in to our account (positive amount to the balance). 
Based on the interpretation from this article:
  https://en.wikipedia.org/wiki/Debits_and_credits.

## Quickstart

First Make sure you have node installed. <br /> 
1. Clone the repository:  `git clone --depth=1 https://github.com/pabPabloblo/agile-engine.git`. <br /> 
2. Move to the folder: `agile-engine`. <br />
3. To run the application: <br /> 
     On Linux bash execute: `(cd server && npm i && npm start && wait)& (cd client && npm i && npm start && wait)&`. <br /> 
     or <br />  
     On windows cmd execute: `cd server && npm i && start npm start && cd .. && cd client && npm i && start npm start`. <br /> 

### You can also run the client and server separately (RECOMENDED)
at ./agile-engine <br />  
to run the server execute: `cd server && npm i && npm start` <br />  
or <br />  
to run the client execute: `cd client && npm i && npm start`

### Run bin
at ./agile-engine/bin <br />  
if you are on windows run start.bat  <br />  
or <br />  
if you are on Linux run start.sh  <br />  
Open browser at [http://localhost:5050](http://localhost:5050) 
 
## Networking

Endpoints:   <br />  
- GET 'api/' gets balance <br />  
- GET 'api/transaction' gets full history <br />  
- GET 'api/transaction/:id' gets single transaction detail <br />  
- POST 'api/transaction' creates a new transaction and updates balance <br />  
    payload schema: {"type": String , "amount": Number}  <br />  
    type can only take the values ¨debit¨ and ¨credit¨
    amount must range in the interval (0-100000]

## Notes
The backend was written using bare ExpressJs without TS or ES6 syntax to avoid using full blown code generator scaffolding tools that might take longer time to clean up than actually writing the initial code. Plus it seemed as an overkill from the performance point of view. The same goes for full schema and parameters validation libraries as json-schema, ajv, express-validator or even TS since here it was easier and more efficient to implement being so straight forward. <br />  

Also lazy loading and partitioning of the full transactions list was not implemented since a big number of transactions is not expected. Also, the recommendations asked for the get all transactions resource to have no parameters. <br />  

The frontend is built upon Create-React-Tool to avoid boiler plate code, Redux or other toolchains as nextJs or gatsbyJs were not used because it seemed as an overkill and wasteful in terms of time and efficiency.  <br />  

Unit tests and logging were also omitted on account of the time constraints and seem out of scope for a PoC. <br />  

The same goes for configuration related files, since this is going to run only as development and with the provided bin it seemed useless. <br />  
