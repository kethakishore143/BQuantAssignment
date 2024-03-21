Project README
Introduction
This repository contains code for an API built using Node.js that interacts with a MySQL hosted database.
The API retrieves financial data based on specified parameters such as ticker symbol, columns (e.g., revenue, gross profit), and period (e.g., 5 years). 
The performance of the API in terms of load times has been evaluated using Postman.


Getting Started
To get started with this project, follow these steps:

Clone the Repository: Clone this repository to your local machine using the following command:

bash
Copy code
git clone https://github.com/kethakishore143/BQuantAssignment/git
Install Dependencies: Navigate to the project directory and install the necessary dependencies using npm:

bash
Copy code
cd BQuantAsignment
node server.js
Set Up MySQL Database: Make sure you have a MySQL database set up. You'll need to configure the database connection details in the config.js file.

Run the Server: Start the Node.js server by running the following command:

sql
Copy code
nodemon server.js




Testing the API: You can test the API endpoints using Postman or any other HTTP client. Refer to the API endpoints below for details on how to make requests.

API Endpoints
Endpoint: /ticker=<ticker_symbol>&column=<columns>&period=<period>
Description: This endpoint retrieves financial data for the specified ticker symbol, columns, and period.
Example: /ticker=AAPL&column=revenue,gp&period=5y
Parameters:
ticker: The ticker symbol of the company (e.g., AAPL for Apple Inc.).
column: The financial data columns to retrieve (e.g., revenue, gp for gross profit).
period: The time period for which the data is requested (e.g., 5y for 5 years).
Performance Evaluation
Load times for the API endpoints have been evaluated using Postman. Below are the recorded load times for two sample API requests:

API Requset 1: /ticker/AAPL
Load Time: 87 milliseconds

API Request 2: /ticker=AAPL&column=revenue,gp&period=5y

Load Time: 87 milliseconds
API Request 3: /ticker=ZS&column=revenue,gp&period=5y

Load Time: 89 milliseconds

API Request 4: /ticker=YELP

Load Time: 97 milliseconds
Note: The actual load times may vary depending on factors such as server performance, network latency, and database size.
