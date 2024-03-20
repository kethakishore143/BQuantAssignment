const express = require('express');
const app = express();
const mysql = require('mysql');


app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "mysqldb2"
});


con.connect(function(err) {
    if (err) {
        console.error("Error connecting to MySQL: " + err.stack);
        return;
    }
    console.log("DB connected!");
});


app.get("/API/ticker/:ticker", (request, response) => {
    const ticker = request.params.ticker;

    con.query(`SELECT * FROM historicdata WHERE ticker = ?`, [ticker], function(err, result) {
        if (err) {
            console.error('Error executing query:', err);
            response.status(500).json({ error: 'Internal server error' });
            return;
        }

        response.send(result);
        console.log("Server is running");
        response.end();
    });
});



app.get("/API/ticker=:ticker&column=:columns&period=:period", (request, response) => {
    const ticker = request.params.ticker;
    const columns = request.params.columns;
    const period = request.params.period;

    
    con.query(`SELECT ${columns} FROM historicdata WHERE ticker = ? AND STR_TO_DATE(date, '%m/%d/%Y') BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL ${period} YEAR) AND CURRENT_DATE()`, [ticker],
        function(err, result) {
            if (err) {
                console.error("Error executing query: " + err.stack);
                response.status(500).send("Internal Server Error");
                return;
            }
            response.json(result);
            console.log("Server is running");
        }
    );
});


app.get("/", (request, response)=>{
    response.send(`<ul>
    <li> Click  the Links</li>
    <li> <a  href="http://localhost:3005/API/ticker/AAPL" target="_blank">http://localhost:3005/API/ticker/AAPL</a> </li>
    <li> <a  href="http://localhost:3005/API/ticker/YELP" target="_blank">http://localhost:3005/API/ticker/YELP</a> </li>

   <li> <a href="http://localhost:3005/API/ticker=ZS&column=ticker,revenue,gp&period=5"  target="_blank">http://localhost:3005/API/ticker=ZS&column=ticker,revenue,gp&period=5</a></li>

    <li><a href="http://localhost:3005/API/ticker=AAPL&column=ticker,revenue,gp&period=5"  target="_blank">http://localhost:3005/API/ticker=AAPL&column=ticker,revenue,gp&period=5</a></li>

</ul>`)

});



const PORT = process.env.PORT || 3005; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
