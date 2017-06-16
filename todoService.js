'use strict';

var mysql = require('mysql');

class TodoService {

    constructor() {

        this.config = {
            host: 'localhost',
            user: 'homestead',
            port: 33060,
            password: 'secret',
            database: 'todos'
        };

    }


    get() {
        return this.execute('SELECT * from mytodos');
    }

    find(id) {

        return this.execute('SELECT * from mytodos where id = ?', [id])
            .then(results => {
                return results.length > 0 ? results[0] : Promise.reject('No rows returned');
            })

    }


    insert(text, completed) {
        return this
            .execute('INSERT into mytodos(text, completed) values(?,?)', [text, completed]);
    }

    execute(sql, params = []) {
        return new Promise((resolve, reject) => {
            var connection = mysql.createConnection(this.config);

            connection.connect();

            connection.query(sql, params, function (error, results, fields) {

                if (error) reject(error);

                resolve(results);

            });

            connection.end();
        });
    }


}

module.exports = new TodoService();