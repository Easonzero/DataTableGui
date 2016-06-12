/**
 * Created by eason on 6/3/16.
 */
let selectBinder;
let resultTableBinder;
let sql;
let select = '*';
let from = new Set();
let where = new Map();

function getTableNo(table1,tables){
    for(let k in selectBinder.tables[table1]){
        for(let table2 in tables) {
            if(table1 == table2) continue;
            for (let k2 in selectBinder.tables[table2]) {
                if (k == k2) return {table:table2,no:k};
            }
        }
    }
    return null;
}

function getNo(table){
    table = table.toLowerCase();
    if(table.charAt(0)=='o'){
        return 'OrderNo';
    }else{
        return table+'No';
    }
}

function splitOpArgs(args){
    let op = '=';
    if(args.charAt(0)=='>'||args.charAt(0)=='<'||args.charAt(0)=='='){
        op = args.charAt(0);
        args = args.substring(1,args.length);
    }
    if(!isNaN(args)){
        return {op:op,args:args};
    }
    else return {op:op,args:`'${args}'`};
}

function WHERE(callback){
    if(where.size!==0){
        let keys = where.keys();
        let values = where.values();
        let key = keys.next();
        let value = values.next();
        sql += ' WHERE ' + key.value + value.value.op + value.value.args;
        for(let i=0;i < where.size-1;i++){
            let key = keys.next();
            let value = values.next();
            sql += ' AND ' + key.value + value.value.op + value.value.args;
        }
    }
    callback();
}

function FROM(callback) {
    let previous = new Set();
    previous.add(from.values().next().value);
    let previous_top = previous.values().next().value;
    sql += previous_top;
    for(let table of from){
        if(table == previous_top){
            continue;
        }
        sql += ' join ' + table;
        let row = getTableNo(table,previous);
        if(row){
            sql += ' on ' + table +'.'+ row.no +'='+ row.table +'.'+row.no;
        }
        previous.add(table);
    }
    callback();
}

function UPDATE(json,callback){
    let table = from.values().next().value;
    let no = getNo(table);
    sql = 'UPDATE '+table+' SET ';
    for(let key in json){
        if(key !== no){
            sql += key + '=' + json[key];
        }
    }
    sql += ' WHERE ' + no + '=' + json[no];
    callback(sql);
}

function SELECT(callback) {
    sql = 'SELECT '+select + ' FROM ';

    FROM(()=>WHERE(()=>{
        if(selectBinder.orderBy!==''){
            sql += ' ORDER BY ' + selectBinder.orderBy + selectBinder.desc?'DESC':'ASC';
        }

        if(selectBinder.top!==0){
            sql += ' LIMIT 0,' + selectBinder.top;
        }
        callback(sql);
    }));
}

exports.select = (callback)=>{
    from.clear();
    where.clear();
    selectBinder = window.selectBinder;
    for(let k in selectBinder.tables){
        for(let ck in selectBinder.tables[k]){
            if(selectBinder.tables[k][ck] !== ''&&selectBinder.tables[k][ck] !== 0){
                if(!from.has(k)) from.add(k);
                where.set(k+'.'+ck,splitOpArgs(selectBinder.tables[k][ck]));
            }
        }
    }
    return SELECT(callback);
};

exports.update = (callback)=> {
    resultTableBinder = window.resultTableBinder;
    if(from.size!==1) return;
    let data = resultTableBinder.getCurrentData();
    let columns = resultTableBinder.getColsName();
    let json = {};
    for(let i=0;i<columns.length;i++){
        json[columns[i].title] = data[i];
    }
    return UPDATE(json,callback)
};

exports.dele = (callback)=>{
    from.clear();
    where.clear();
    selectBinder = window.selectBinder;
    let orderNo = selectBinder.tables.OrderMaster.orderNo||selectBinder.tables.OrderDetail.orderNo;
    if(!orderNo){
        alert("请填写orderNo");
        return;
    }
    callback(orderNo);
};

exports.add = (callback)=>{
    from.clear();
    where.clear();
    selectBinder = window.selectBinder;
    let orderMaster = selectBinder.tables.OrderMaster;
    let orderDetail = selectBinder.tables.OrderDetail;

    let date = new Date();
    orderMaster.orderDate = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();

    orderMaster.orderSum = orderDetail.price * orderDetail.quantity;
    if(orderMaster.orderNo != orderDetail.orderNo){
        alert('orderNo 填写不一致');
        return;
    }
    for(let ck in orderMaster){
        if(orderMaster[ck] == ''||orderMaster[ck] == 0){
            alert('信息填写不全');
            return;
        }
    }
    for(let ck in orderDetail){
        if(orderDetail[ck] == ''||orderDetail[ck] == 0){
            alert('信息填写不全');
            return;
        }
    }
    callback({
        orderMaster:orderMaster,
        orderDetail:orderDetail
    });
};