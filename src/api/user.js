import {setToken} from "../utils/auth";


export const apiLogin = (loginForm) => {
    return new Promise((resolve, reject) => {
        let result = filterUser(loginForm) // 获取登录结果
        setTimeout(() => {
            if(!result){
                reject('账号或密码错误！')
            }else{
                resolve({
                    token:result,
                })
            }
        }, 1000)
    })
}

// 模拟登录
const filterUser = (loginForm) => {
    let {account, pwd} = loginForm
    if(account === 'admin' || account === 'edit'){
        if(pwd === '123456'){
            return account === 'admin'?'lzz-token':'edit-token';
        }else{
            return false;
        }
    }
    return false;
}
