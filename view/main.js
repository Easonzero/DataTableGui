const selectBinder = require('./model/selectBinder');
const resultTableBinder = require('./model/resultTableBinder');
const {onKeyDown} = require('./ipc/eventDispatcher');
const {handler} = require('./ipc/eventHandler');
const background = require('./render/background');
const selector = require('./render/selector');
const table = require('./render/resulttable');

/**
 * Created by eason on 6/2/16.
 */
//init model
window.selectBinder = selectBinder;
window.resultTableBinder = resultTableBinder;

//init background
background.init();
background.animate();

//init selector
selector();
//init resulttable
table();

//init eventHandler
handler();

//bind eventListener
document.addEventListener( 'keydown', onKeyDown, false );

