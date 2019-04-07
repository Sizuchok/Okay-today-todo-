const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'todolist'
});

connection.connect((err) => {
    if(err) throw err;
    console.log('DB connected!');
});

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    let sql = 'select * from todolist1';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('index', {todoLs: result});
    });
});

app.post('/newtodo', (req, res) => {
    var item = req.body.item;
    let sql = `insert todolist1(ToDo, Completed) values('${item}', 0)`;
    connection.query(sql, (err, res) =>{
        if (err) throw err;
    });
    res.redirect('/');
});

app.get('/delete', (req, res) => {
    let sql = `delete from todolist1 where id = ${req.query.id}`;
    connection.query(sql, (err, result) =>{
        if(err) throw err;
        res.send();
    });
});

app.get('/isdone', (req, res) => {
    let sql = `update todolist1 set Completed = ${req.query.status} where ID = ${req.query.id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send();
    });
});

app.get('/clear', (req, res) => {
    let sql = 'truncate table todolist1';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send();
    });
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});