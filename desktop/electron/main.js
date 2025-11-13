const { app, BrowserWindow,Menu,ipcMain } = require('electron/main');
const path = require('node:path');
const {sequelize} = require('./src/models/index');
const { signUp, signIn } = require('./src/controllers/user_controller');
const { getTransaction} = require('./src/controllers/transactions_controller');

Menu.setApplicationMenu(null);

const createWindow = () => {
  const win = new BrowserWindow({
    title:'Finance',
    width: 1280,
    height: 1024,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    },
    // icon: path.join(__dirname, './moon.png'),
  });

  win.loadURL('http://localhost:8080'); 
  win.webContents.openDevTools(); 
  // win.loadFile(path.join(__dirname, './dist/index.html'))
}

app.whenReady().then(() => {
  ipcMain.handle('sign-up', async(_event,nom,password_user,email) => await signUp(nom,password_user,email));
  ipcMain.handle('sign-in', async (_event, email, password_user) => {
    const userData = await signIn(email, password_user);
    return userData;
  });

  ipcMain.handle('get-transactions',getTransaction);
  
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
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
