/**
 * electron 主进程
 */

declare global {
  namespace NodeJS {
    interface Global {
      mainWindow: any;
      dm: any;
    }
  }
}

import { join } from 'path'
import { app, BrowserWindow, ipcMain } from 'electron'
import is_dev from 'electron-is-dev'
import dotenv from 'dotenv'
import Store from 'electron-store'
import Dm from './modules/dm'

const store = new Store()
ipcMain.on('store:set', async (e, args) => {
  store.set(args.key, args.value)
})
ipcMain.handle('store:get', async (e, args) => {
  const value = await store.get(args)
  return value
})
ipcMain.on('store:delete', async (e, args) => {
  store.delete(args)
})
ipcMain.on('ACTION', (e: any, { action, data }) => {
  if (action === 'MoveWindowByTitle') {
    const { title, x, y } = data;
    // 找到窗口句柄
    const hwnd = global.dm.dll.FindWindowEx(0, "", title)
    console.log(title, '窗口句柄', hwnd)
    // 移动窗口到左上角
    if (hwnd) global.dm.dll.MoveWindow(hwnd, x, y)
    else e.sender.send('PUBLIC', { event: 'error-message', data: `没找到窗口【${title}】` })
  }
})


dotenv.config({ path: join(__dirname, '../../.env') })

let win

class createWin {
  // 创建浏览器窗口
  constructor() {
    win = new BrowserWindow({
      width: is_dev ? 900 : 500,
      height: 800,
      webPreferences: {
        nodeIntegration: true,
        enableRemoteModule: true
      },
    })

    // 全局变量
    global.mainWindow = win

    const URL = is_dev
      ? `http://localhost:${process.env.PORT}` // vite 启动的服务器地址
      : `file://${join(__dirname, '../../dist/render/index.html')}` // vite 构建后的静态文件地址

    win.loadURL(URL)

    if (is_dev) {
      win.webContents.openDevTools()
    }
  }
}

app.whenReady().then(async () => {
  new createWin
  // 注册一个全局的大漠
  global.dm = new Dm()
})


app.on('window-all-closed', async () => {
  if (process.platform !== 'darwin') {
    app.quit()
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    new createWin()
  }
})


// 修改app名字
app.setAppUserModelId('Electron大漠插件Demo')

app.setUserTasks([])