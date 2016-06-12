const mysql = require('../utils/mysqlUtil')
/**
 * Created by eason on 6/3/16.
 */
exports.emit_call = (sql,callback)=>{
  mysql.query(sql, function (err, rows) {
      if (err) {
          return callback(err, null);
      }
      callback(null, rows);
  })
};

exports.emit_nocall = (sql,callback)=>{
    mysql.query(sql, function (err, rows) {
        if (err) {
            return callback(err, null);
        }
        callback(null, null);
    })
};

exports.add = (orderDetail,orderMaster,callback)=>{
    mysql.processTransaction(function (connection) {
        connection.beginTransaction(function(err) {
            if (err) { throw err; }
            connection.query('INSERT OrderDetail VALUES (:orderNo,:productNo,:quantity,:price)', orderDetail, function(err, result) {
                if (err) {
                    connection.rollback(function() {
                        throw err;
                    });
                }

                connection.query('UPDATE Product SET instock = instock+1 WHERE productNo = :productNo', orderDetail, function(err, result) {
                    if (err) {
                        connection.rollback(function() {
                            throw err;
                        });
                    }

                    connection.query('INSERT OrderMaster VALUES (:orderNo,:customerNo,:employeeNo,:orderDate,:orderSum,:invoiceNo)',orderMaster, function(err, result) {
                        if (err) {
                            connection.rollback(function() {
                                throw err;
                            });
                        }

                        connection.commit(function(err) {
                            if (err) {
                                connection.rollback(function() {
                                    throw err;
                                });
                            }
                            callback(null);
                        });
                    });
                });
            });
        });

    });
}

exports.delete = (No,callback)=>{
    mysql.processTransaction(function (connection) {
        connection.beginTransaction(function(err) {
            if (err) { throw err; }
            connection.query('DELETE FROM OrderMaster WHERE OrderNo = :No', {No:No}, function(err, result) {
                if (err) {
                    connection.rollback(function() {
                        throw err;
                    });
                }

                connection.query('DELETE FROM OrderDetail WHERE OrderNo = :No', {No:No}, function(err, result) {
                    if (err) {
                        connection.rollback(function() {
                            throw err;
                        });
                    }
                    connection.commit(function(err) {
                        if (err) {
                            connection.rollback(function() {
                                throw err;
                            });
                        }
                        callback(null);
                    });
                });
            });
        });

    });
};