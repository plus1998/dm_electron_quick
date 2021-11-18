import isDevelop from 'electron-is-dev'

const path = require('path')
const os = require('os')
const fs = require('fs')

const baseDir = os.homedir() + '\\Documents\\Ai.FateRebirth'

try {
  fs.mkdirSync(baseDir)
} catch (error) {
  console.log('应用文档文件夹已存在')
}

try {
  fs.mkdirSync(baseDir + '\\screenShot')
} catch (error) {
  console.log('截图文件夹已存在')
}


const libDir = path.join(__dirname, isDevelop ? '../../src/main/library' : '../../../library')


export { libDir, baseDir }
