const {ipcRenderer} = require('electron');
const $  = require( 'jquery' );
const {update} = require('../model/sqlGenerater');
/**
 * Created by eason on 6/2/16.
 */

function onKeyDown( event ) {
    event.stopPropagation();
    switch( event.keyCode ) {
        case 83://ctrl s
            if(event.ctrlKey){
                let table = $('#table').DataTable();
                let {getCurrentRow} = window.resultTableBinder;
                let row=table.row(getCurrentRow());
                let tds=getCurrentRow().children();
                $.each(tds, function(i,val){
                    var jqob=$(val);
                    var txt=jqob.children("input").val();
                    jqob.html(txt);
                    table.cell(jqob).data(txt);
                });
            }
            update((sql)=>ipcRenderer.send('update',sql));
            break;
    }
}

exports.onKeyDown = onKeyDown;