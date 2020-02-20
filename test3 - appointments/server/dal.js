const mysql = require('mysql');
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: 'test3'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

function readAll(query, callback) {
    connection.query(query, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

function readOne(query, callback) {
    connection.query(query, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    });
}

function createOne(query, callback) {
    connection.query(query, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

function updateOne(query1,query2, callback) {
    connection.query(query1, (err, result) => {
        if (err) {
            callback(err);
        } else {
            connection.query(query2, (err, result) => {
                if (err) {
                    callback(err);
                } else {
                    callback(null, result);
                }
            });
        }
    });
}

function deleteOne(query, callback) {
    connection.query(query, (err) => {
        if (err) {
            callback(err);
        } else {
            callback(null);
        }
    });
}

module.exports = {
    readAll: readAll,
    readOne: readOne,
    createOne: createOne,
    updateOne: updateOne,
    deleteOne: deleteOne
}