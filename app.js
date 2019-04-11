const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');

var currentList, listname;

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

//list`ssss
app.get('/', (req, res) => {
    let sql = 'select * from lists';
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.render('lists', {lists: result});
    });
});

app.post('/gotolist', (req, res) => {
    currentList = req.query.id;
    listname = req.query.name;
    let sql = `select * from todolist1 where listid = ${currentList}`;
    connection.query(sql, (err, result) => {
        if (err) throw err;
        res.render('index', {todoLs: result, listname: listname});
    });
});

app.post('/newlist', (req, res) => {
    let sql = `insert lists(listname) value('${req.body.item}')`;
    connection.query(sql, (err, res) => {
        if (err) throw err;
    });
    res.redirect('/');
});

app.get('/deletelist', (req, res) => {
    let sql = `delete lists, todolist1 from lists join todolist1 where
                lists.listid = ${req.query.id} or todolist1.listid = ${req.query.id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send();
    });
});


//todo`ssss
app.get('/todos', (req, res) => {
    let sql = `select * from todolist1 where listid = ${req.query.id}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.render('index', {todoLs: result, listname: listname});
    });
    
});

app.post('/newtodo', (req, res) => {
    var item = req.body.item;
    let sql = `insert todolist1(ToDo, Completed, listid) values('${item}', 0, ${currentList})`;
    connection.query(sql, (err, res) =>{
        if (err) throw err;
    });
    res.redirect(`/todos?id=${currentList}`);
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
    let sql = `delete from todolist1 where listid = ${currentList}`;
    connection.query(sql, (err, result) => {
        if(err) throw err;
        res.send();
    });
});

app.post('/newlistname', (req, res) => {
   // console.log(req.body.item);
   let sql = `update lists set listname = '${req.body.item}' 
   where listname = '${listname}' and listid = ${currentList}`;
   listname = req.body.item;
   connection.query(sql, (err, result) => {
       if(err) throw err;
       res.redirect(`/todos?id=${currentList}`);
   });
});

const port = process.env.port || 3000;

app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
});