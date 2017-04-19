const {app,BrowserWindow,ipcMain} = require("electron")

let win;
app.on('ready', () => {
    win = new BrowserWindow({width: 800, height: 600});
    win.loadURL('file://' + __dirname + '/public/index.html');
    win.on('closed', () => {
        win = null;
    }); 
});

app.on('window-all-closed', () => {
    if (process.platform != 'darwin') {
        app.quit();
    }   
})

ipcMain.on("select-input", (event, arg) => {
    const {dialog} = require("electron")
    dialog.showOpenDialog({properties:["openDirectory"]}, (filePaths) => {
        if(filePaths){
            event.returnValue = filePaths[0]
        }else{
            event.returnValue = false
        }
    })
})

ipcMain.on("select-output", (event, arg) => {
    const {dialog} = require("electron")
    dialog.showOpenDialog({properties:["openDirectory"]}, (filePaths) => {
        if(filePaths){
            event.returnValue = filePaths[0]
        }else{
            event.returnValue = false
        }
    })
})
