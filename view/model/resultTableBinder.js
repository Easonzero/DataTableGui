const $  = require( 'jquery' );
const dt = require( 'datatables.net' )(window, $ );
/**
 * Created by eason on 6/3/16.
 */
let current;
let columns=[];

exports.getCurrentRow = ()=>{return current;};

exports.setCurrentRow = (row)=>{
    current = row;
};

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
};