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


app.get("/API/ticker=AAPL", (request, response) => {
    con.query('select * from historicdata where  ticker = "AAPL";', function(err, result) {
        response.send(result);
        console.log("Server is running")
        response.end()
    
    });  
   
})


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


const PORT = process.env.PORT || 3005; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
