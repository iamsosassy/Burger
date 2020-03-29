// import orm.js into burger.js
var orm = require('../config/orm.js');

// create the code that will call the ORM functions using burger specific input for the ORM.
var burger = {

    selectAll: function(callback) {
        orm.selectAll(function(res) {
            callback(res);
        });
    },

    insertOne: function(burger_name, callback) {

        orm.create("burgers", ["burger_name", "devoured"], [burger_name, false], function(res) {
            callback(res);
        });
    },

    updateOne: function(burger_id, callback) {
        orm.update("burgers", {
            devoured: true,
        }, "id = " + burger_id, function(res) {
            callback(res);
        });
    }

};


// Export at the end of the burger.js file.
module.exports = burger;