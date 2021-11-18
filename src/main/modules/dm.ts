import cp from 'child_process'
import { libDir } from '../config'

const winax = require('winax')

export default class {
    dll
    variant
    constructor() {
        // 注入dll
        try {
            this.dll = new winax.Object('dm.dmsoft')
            this.variant = winax.Variant
            this.reg()
        } catch (error) {
            cp.execFileSync(libDir + '\\reg.bat')
            setTimeout(() => {
                this.dll = new winax.Object('dm.dmsoft')
                this.variant = winax.Variant
                this.reg()
            }, 3000)
        }
    }
    reg() {
        console.log('大漠插件版本：', this.dll.Ver())
        console.log('大漠插件路径：', this.dll.GetBasePath())
    }
}