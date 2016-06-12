let proxy = require('../proxy/mysqlProxy');
/**
 * Created by eason on 6/2/16.
 */
exports.select = (sql,callback) => {
  proxy.emit_call(sql,(err,result)=>{
    callback(result);
  });
};

exports.update = (sql)=>{
  proxy.emit_nocall(sql,(err)=>{
    console.log('update proxy callback');
    if(err) {
      return console.log(err);
    }
    callback('ok');
  });
};

exports.dele = (args,callback)=>{
  proxy.delete(args,(err)=>{
    console.log('delete proxy callback');
    if(err) {
      return console.log(err);
    }
    callback('ok');
  });
};

exports.add = (args,callback)=>{
  proxy.add(args.orderDetail,args.orderMaster,(err)=>{
    console.log('add proxy callback');
    if(err) {
      return console.log(err);
    }
    callback('ok');
  });
};