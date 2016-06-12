const $  = require( 'jquery' );
const dat = require('dat-gui');
const {ipcRenderer} = require('electron');
const {remote} = require('electron');
const {Menu, MenuItem} = remote;
const {dele,select,add} = require('../model/sqlGenerater');
/**
 * Created by eason on 6/2/16.
 */

module.exports = ()=>{
    let model = window.selectBinder;
    let gui = new dat.GUI();
    gui.remember(model);
    let h = gui.addFolder('tables');
    for(let k in model.tables){
        let ch = h.addFolder(k);
        for(let ck in model.tables[k]){
            ch.add(model.tables[k],ck);
        }
    }
    gui.add(model,'top');
    gui.add(model,'orderBy');
    gui.add(model,'desc');

    const menuglo = new Menu();
    menuglo.append(new MenuItem({label: 'select', click() {
        select((sql)=>ipcRenderer.send('select',sql));
    }}));
    menuglo.append(new MenuItem({label: 'add', click() {
        add((args)=>ipcRenderer.send('add',args));
    }}));
    menuglo.append(new MenuItem({label: 'delete', click() {
        dele((args)=>ipcRenderer.send('delete',args));
    }}));
    $('.dg .main').on('mousedown',(e)=>{
        if(3 == e.which)
            menuglo.popup(remote.getCurrentWindow());
    });
};