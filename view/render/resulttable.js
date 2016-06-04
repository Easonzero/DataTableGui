const $  = require( 'jquery' );
const {remote} = require('electron');
const {Menu, MenuItem} = remote;
/**
 * Created by eason on 6/3/16.
 */

module.exports = ()=>{
    let resultPanel = $('#result'),
        actionBtn = $('#action'),
        table = $('#table');
    let {getCurrentRow,setCurrentRow} = window.resultTableBinder;
    resultPanel.css('left',window.innerWidth*(-0.85)+20);
    window.addEventListener('resize',()=>resultPanel.css('left',window.innerWidth*(-0.85)+20),false);
    actionBtn.click(()=>{
        var left = resultPanel.css('left');
        if (left == '0px' || left == '') {
            resultPanel.css('left',window.innerWidth*(-0.85)+20);
            actionBtn.text('>>');
        } else {
            resultPanel.css('left','0px');
            actionBtn.text('<<');
        };
    });

    const menu = new Menu();
    menu.append(new MenuItem({label: 'update', click() {
        let tds= getCurrentRow().children();
        $.each( tds, function(i,val){
            var jqob=$(val);
            var txt=jqob.text();
            var put=$("<input type='text'>");
            put.val(txt);
            jqob.html(put);
        });
    }}));

    table.on('mousedown','tr',function(e){
        setCurrentRow($(this));
        if(3 == e.which)
            menu.popup(remote.getCurrentWindow());
    });
};
