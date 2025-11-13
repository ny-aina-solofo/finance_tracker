const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  signUp:(nom,password,email) => ipcRenderer.invoke('sign-up',nom,password,email),
  signIn:(email,password) => ipcRenderer.invoke('sign-in',email,password),
  getTransaction:() => ipcRenderer.invoke('get-transactions'),
});

