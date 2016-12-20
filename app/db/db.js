let db = {};

let sqlite3 = require('sqlite3').verbose();
let database = new sqlite3.Database('appdb.db');

module.exports = database;