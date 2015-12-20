var app = require('app')    // module to control application life
var BrowserWindow = require('browser-window')   // module to create native browser window

var mainWindow = null   /* keep a global reference of the window object,
                           if you don't, the window will be closed automatically
                           when the Javascript object is garbage collected */

app.on('window-all-closed', () => {     // quit when all windows are closed
    if (process.platform != 'darwin') {     /* on OSX it is common for app and their menu bar
                                               to stay active until the user quits explicitely with
                                               Cmd + Q */
        app.quit()
    }
})

app.on('ready', () => {
    mainWindow = new BrowserWindow({width: 900, height: 600})
    mainWindow.loadURL('file://' + __dirname + '/index.html')
    mainWindow.on('closed', () => {
        mainWindow = null
    })
})