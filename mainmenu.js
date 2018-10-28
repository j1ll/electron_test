const {Menu} = require('electron');
const config = require('./config/mainmenu');
setMenu = function () {
  Menu.setApplicationMenu(Menu.buildFromTemplate(config));
};
module.exports=setMenu;