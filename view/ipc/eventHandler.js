const {ipcRenderer} = require('electron');
/**
 * Created by eason on 6/2/16.
 */

exports.handler = ()=>{
    ipcRenderer.on( 'reply', (event, result)=>{
        console.log('go to view');
        if(result == 'ok'){
            alert('ok');
        }
        else if(result == 'error'){
            alert('error');
        }
        else window.resultTableBinder.sync(result);
    });
};
