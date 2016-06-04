/**
 * Created by eason on 6/3/16.
 */
var mysql     = require("mysql");
var {mysqlConfig}    = require("../config");
var mysqlPool = null;

function initMysqlPool () {
    mysqlPool = mysql.createPool(mysqlConfig);
}

exports.query = (sqlReq='', callback)=>{
    if (!mysqlPool) {
        initMysqlPool();
    }

    if (sqlReq.length === 0) {
        throw new error("the sqlReq is null");
    }

    mysqlPool.getConnection(function (err, connection) {
        if (err) {
            throw err;
        }

        connection.query(sqlReq, function (err, rows) {
            connection.release();
            return callback(err, rows);
        });
    });
};

exports.processTransaction = function (callback) {
    if (!mysqlPool) {
        initMysqlPool();
    }

    mysqlPool.getConnection(function (err, connection) {

        if (err) {
            throw err;
        }

        connection.config.queryFormat = function (query, values) {
            if (!values) return query;
            return query.replace(/\:(\w+)/g, function (txt, key) {
                if (values.hasOwnProperty(key)) {
                    return this.escape(values[key]);
                }
                return txt;
            }.bind(this));
        };

        return callback(connection);
    });
};