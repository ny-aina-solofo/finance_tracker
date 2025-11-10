const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  getTodoList: () => ipcRenderer.invoke('get-todolist'),
  addTodo: (newLibelle) => ipcRenderer.invoke('add-todo', newLibelle),
  deleteTodo: (id) => ipcRenderer.invoke('delete-todo', id),
  updateDone: (id,newDone) => ipcRenderer.invoke('update-done', id,newDone),
  updateOrder: (updatedList) => ipcRenderer.invoke('update-order', updatedList),
  
});

