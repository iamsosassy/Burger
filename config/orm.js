// Import MySQL connection.
var connection = require("../config/connection.js");

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push("?");
    }

    return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
// ===========================================================
function objToSql(ob) {
    var arr = [];

    // loop through the keys and push the key/value as a string int arr
    // ===========================================================
    for (var key in ob) {
        var value = ob[key];

        if (Object.hasOwnProperty.call(ob, key)) {

            if (typeof value === "string" && value.indexOf(" ") >= 0) {
                value = "'" + value + "'";
            }

            arr.push(key + "=" + value);
        }
    }
    // translate array of strings to a single comma-separated string
    return arr.toString();
}

// READ/SELECT all the records in the database
// ===========================================================
var orm = {
    selectAll: function(br) {
        var queryString = 'SELECT * FROM burgers';
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }
            br(result);
        });
    },

    // CREATE/INSERT a new record to the database
    // ===========================================================
    create: function(table, cols, vals, br) {
        var queryString = 'INSERT INTO ' + table;

        queryString += ' (';
        queryString += cols.toString();
        queryString += ') ';
        queryString += 'VALUES (';
        queryString += printQuestionMarks(vals.length);
        queryString += ') ';

        console.log(queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) {
                throw err;
            }

            br(result);
        });
    },

    // UPDATE/UPDATE a specific record in the database
    // ===========================================================
    update: function(table, objColVals, condition, br) {
        var queryString = 'UPDATE ' + table;

        queryString += ' SET ';
        queryString += objToSql(objColVals);
        queryString += ' WHERE ';
        queryString += condition;

        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            br(result);
        });
    },

    // DELETE/DELETE a specific record in the database
    // ===========================================================
    delete: function(table, condition, br) {
        var queryString = 'DELETE FROM ' + table;
        queryString += ' WHERE ';
        queryString += condition;

        connection.query(queryString, function(err, result) {
            if (err) {
                throw err;
            }

            br(result);
        });
    },
};

// Export the orm object for the model (../models/burger.js).
module.exports = orm;


// //Import (require) connection.js into orm.js
// var connection = require('../config/connection.js')


// //Create the methods that will execute the necessary MySQL commands in the controllers. 
// //These are the methods you will need to use in order to retrieve and store data in your database.

// var orm = {

//     selectAll: function(callback) {
//         //mySQL Query
//         connection.query('SELECT * FROM burgers', function(err, result) {
//             if (err) throw err;
//             callback(result);
//         });
//     },


//     insertOne: function(burger_name, callback) {
//         connection.query('INSERT INTO burgers SET ?', {
//             burger_name: burger_name,
//             devoured: false,
//         }, function(err, result) {
//             if (err) throw err;
//             callback(result);
//         });

//     },


//     updateOne: function(burgerID, callback) {
//         connection.query('UPDATE burgers SET ? WHERE ?', [{ devoured: true }, { id: burgerID }],
//             function(err, result) {
//                 if (err) throw err;
//                 callback(result);
//             });
//     }
// };


// // Export the ORM object in module.exports.
// module.exports = orm;