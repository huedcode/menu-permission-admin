import {toRaw} from 'vue'
const getters = {
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    sidebar: state => state.app.sidebar,
    size: state => state.app.size,
    device: state => state.app.device,
    errorLogs: state => state.errorLog.logs,
    routers: state => state.permission.routes,
    addRouters:state => state.permission.addRouters,
}
export default getters
