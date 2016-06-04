let proxy = require('../proxy/mysqlProxy');
/**
 * Created by eason on 6/2/16.
 */
exports.select = (sql,callback) => {
  proxy.emit_call(sql,(err,result)=>{
    if(!result) return 0;
    callback(result);
  });
};

exports.update = (sql)=>{
  proxy.emit_nocall(sql,(err)=>{
    console.log('update proxy callback');
    if(err) console.log(err);
  });
};

exports.dele = (No,callback)=>{
  proxy.delete(No,(err)=>{
    console.log('delete proxy callback');
    if(err) {
      callback('error');
      return console.log(err);
    }
    callback('ok');
  });
};