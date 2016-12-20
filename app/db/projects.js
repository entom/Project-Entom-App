let projects = {};

let db = require('./db');

/**
 * init method
 */
projects.init = () => {
    console.log('projects :: init');
    projects.createTable();
};

/**
 * createTable method
 */
projects.createTable = () => {
    db.serialize(function () {
        db.run("CREATE TABLE IF NOT EXISTS projects (id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255), created DATETIME, modified DATETIME)");
    });
};

/**
 * insert method
 * @param data
 */
projects.insert = (data) => {
    let stmt = db.prepare('INSERT INTO projects(title, created, modified) VALUES ("' + data.title + '", DATETIME("now"), DATETIME("now"))');
    stmt.run();
    stmt.finalize();
};

/**
 * remove method
 * @param id
 */
projects.remove = (id) => {
    let stmt = db.prepare('DELETE FROM projects WHERE id = ' + id);
    stmt.run();
    stmt.finalize();
};

/**
 * getAll method
 * @param fn
 */
projects.getAll = (fn) => {
    db.all("SELECT * FROM projects", function(err, rows) {
        console.log(rows);
        fn(rows);
    });
};

/**
 * dropTable method
 */
projects.dropTable = () => {
    db.run("DROP TABLE IF EXISTS projects");
};

module.exports = projects;