const {ipcMain} = require('electron');
const {select,update,dele,add} = require('./controllers/mysqlController');
/**
 * Created by eason on 6/2/16.
 */
let routes = {
    select:select,
    update:update,
    delete:dele,
    add:add
};

module.exports = () => {
    for(let message in routes){
        ipcMain.on(message, (event, sql) => {
            console.log('go to controller');
            routes[message](sql,(result)=>event.sender.send('reply', result));
        });
    }
};