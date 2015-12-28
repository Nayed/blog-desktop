'use strict'

const app                   = require('app')
const browserWindow         = require('browser-window')
const electron              = require('electron')
const ipc                   = electron.ipcMain
const Menu                  = require('menu')

//-- reports any crashes to the server
require('crash-reporter').start()


//-- set up the main app menu
const menu_template = require('./inc/app-menu.js')
const main_menu = Menu.buildFromTemplate(menu_template)


//-- create a global var for all the windows
const appWindows = {
  main : null
}

/**
 * quit the app when all windows are closed
 */
app.on('window-all-closed', () => {
  if (process.platform != 'darwin')
    app.quit()
})

/**
 * main app init
 */
app.on('ready', () => {
  //-- init the main window
  appWindows.main = new browserWindow({
      width: 1000,
      height: 700,
      frame : false
    })
  //-- open up the dev tools for debugging
  appWindows.main.openDevTools()
  //apply the main menu
  Menu.setApplicationMenu(main_menu)
  /**
   * unset the appWindows.main variable on close
   */
  appWindows.main.on('closed', () => {
    appWindows.main = null
  })

  appWindows.main.loadURL('file://' + __dirname + '/pages/main.html')

  /**
   * listeners
   */

})
