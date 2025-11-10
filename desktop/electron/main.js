const { app, BrowserWindow,Menu,ipcMain } = require('electron/main');
const path = require('node:path');
const {sequelize} = require('./src/models/index');
const { getTodolist, addTodo, deleteTodo, updateDone, updateOrder } = require('./src/controllers/todolist_controller');

Menu.setApplicationMenu(null);

const createWindow = () => {
  const win = new BrowserWindow({
    title:'Todolist',
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    // icon: path.join(__dirname, './moon.png'),
  });

  // win.loadURL('http://localhost:5173'); 
  // win.webContents.openDevTools(); 
  win.loadFile(path.join(__dirname, './dist/index.html'))
}

app.whenReady().then(() => {
  ipcMain.handle('get-todolist',getTodolist);
  ipcMain.handle('add-todo',async (_event, newLibelle) => await addTodo(newLibelle));
  ipcMain.handle('delete-todo',async (_event, id) => await deleteTodo(id));
  ipcMain.handle('update-done', async (_event, id, newDone) => await updateDone(id,newDone));
  ipcMain.handle('update-order', async (_event, updatedList) => await updateOrder(updatedList));

  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', async() => {
  if (process.platform !== 'darwin') {
    try {
      await sequelize.close();
      console.log('Connection has been closed successfully.');
    } catch (error) {
      console.error('Unable to close to the database:', error);
    }
    app.quit()
  }
})
app.disableHardwareAcceleration();
