const {globalShortcut} = require('electron');
const {ctrl_q} = require('./controllers/shortcutController');
/**
 * Created by eason on 6/4/16.
 */
let shortcuts = {
    'CommandOrControl+Q':ctrl_q
};

module.exports = () => {
    for(let shortcut in shortcuts){
        globalShortcut.register(shortcut, shortcuts[shortcut]);
    }
};