import { createStore } from 'vuex'

const modulesFiles = require.context('./modules', true, /\.js$/)
import getters from './getters'
//你不需要`import app from ` ./modules/app ` `
//它将自动从模块文件中要求所有vuex模块

const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})

export default createStore({
  getters,
  modules
})
