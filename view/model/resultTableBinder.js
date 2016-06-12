const $  = require( 'jquery' );
const dt = require( 'datatables.net' )(window, $ );

const {remote} = require('electron');
const {Menu, MenuItem} = remote;
/**
 * Created by eason on 6/3/16.
 */
const menu = new Menu();

let current;
let columns=[];

menu.append(new MenuItem({label: 'update', click() {
    let tds= current.children();
    $.each( tds, function(i,val){
        var jqob=$(val);
        var txt=jqob.text();
        var put=$("<input type='text'>");
        put.val(txt);
        jqob.html(put);
    });
}}));

exports.getCurrentRow = ()=>{
    return current;
}

exports.getColsName = ()=>{
    return columns;
};

exports.getCurrentData= ()=>{
    return $('#table').DataTable().row().data();
}


exports.sync = (array)=>{
    let tablef = $('#table_sec');
    tablef.empty();
    tablef.html(`<table id="table" class="display" cellspacing="10" width="100%"></table>`);
    let table = $('#table');
    if(table == undefined||array == null)
        return table.DataTable({
            "data": [],
            "columns": [''],
            destroy: true,
            scrollY: 200,
            deferRender:true
        });
    let data=[],fields=[];
    columns = [];
    let i = 0;
    for(let column in array[0]){
        columns[i] = {title:column,class:'center'};
        fields[i] = {label:column,name:column};
        i++;
    }
    i = 0;
    for(let json of array){
        let col = [],j=0;
        for(let key in json){
            col[j] = json[key];
            j++;
        }
        data[i] = col;
        i++;
    }

    table.DataTable({
        "data": data,
        "columns": columns,
        destroy: true,
        scrollY: 200
    });

    table.on('mousedown','tr',function(e){
        current = $(this);
        if(3 == e.which)
            menu.popup(remote.getCurrentWindow());
    });
};