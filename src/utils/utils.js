// 获取data-time格式
export const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

// 获取中文年月份
export const formatTimeCn = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return {
        year: year + '年',
        month: month + '月',
        day: day + '日'
    }
}
// 获取纯数字年月份
export const formatTimeNum = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return {
        year: year,
        month: month,
        day: day
    }
}
export const mGetDate = (year, month) => {
    var d = new Date(year, month, 0);
    return d.getDate();
}


export const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}

/*删除数组中的某个一个元素*/
export const remove = (arr, ele) => {
    var index = arr.indexOf(ele);
    if (index > -1) {
        arr.splice(index, 1);
    }
    return arr;
}

// 倒计时 endtime 传入时间戳
export const showDownTime = (endtime) => {
    var nowtime = new Date().getTime(), //获取当前时间戳
        endtime = endtime; //定义结束时间
    var lefttime = endtime - nowtime //距离结束时间的毫秒数
    if (lefttime < 0 || lefttime == 0) {
        return {
            downDay: 0,
            downHour: '00',
            downMinute: '00',
            downSecond: '00'
        }
    } else {
        var leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)) || 0 //计算天数
        var lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24) || 0 //计算小时数
        var leftm = Math.floor(lefttime / (1000 * 60) % 60) || 0 //计算分钟数
        var lefts = Math.floor(lefttime / 1000 % 60) || 0; //计算秒数
        return {
            downDay: leftd, //天
            downHour: lefth < 10 ? '0' + lefth : lefth, //时
            downMinute: leftm < 10 ? '0' + leftm : leftm, //分
            downSecond: lefts < 10 ? '0' + lefts : lefts //秒
        }
    }
}
/**
 * 验证数据类型
 * **/
export const checkStrType = (str, type) => {
    switch (type) {
        case 'phone': //手机号码
            return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(str);
        case 'tel': //座机
            return /^(0\d{2,3}-\d{7,8})(-\d{1,4})?$/.test(str);
        case 'card': //身份证
            return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(str);
        case 'pwd': //密码以字母开头，长度在6~18之间，只能包含字母、数字和下划线
            return /^[a-zA-Z]\w{5,17}$/.test(str)
        case 'postal': //邮政编码
            return /[1-9]\d{5}(?!\d)/.test(str);
        case 'QQ': //QQ号
            return /^[1-9][0-9]{4,9}$/.test(str);
        case 'email': //邮箱
            return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(str);
        case 'money': //金额(小数点2位)
            return /^\d*(?:\.\d{0,2})?$/.test(str);
        case 'URL': //网址
            return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(str)
        case 'IP': //IP
            return /((?:(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d)\\.){3}(?:25[0-5]|2[0-4]\\d|[01]?\\d?\\d))/.test(str);
        case 'date': //日期时间
            return /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(str) || /^(\d{4})\-(\d{2})\-(\d{2})$/
                .test(str)
        case 'number': //数字
            return /^[0-9]$/.test(str);
        case 'english': //英文
            return /^[a-zA-Z]+$/.test(str);
        case 'chinese': //中文
            return /^[\\u4E00-\\u9FA5]+$/.test(str);
        case 'lower': //小写
            return /^[a-z]+$/.test(str);
        case 'upper': //大写
            return /^[A-Z]+$/.test(str);
        case 'HTML': //HTML标记
            return /<("[^"]*"|'[^']*'|[^'">])*>/.test(str);
        default:
            return true;
    }

}

/**
* 数组/对象深克隆
* 通过Object.prototype.toString可以知道数据的真实类型，避免typeof null == object 的问题
* 目前只对数组和对象进行判断，可以对其他数据类型进行扩展
**/
export const deepClone = (obj) => {
    const type = Object.prototype.toString.call(obj);
    switch (type) {
        case '[object Object]': {
            let cloneObj = {};
            for (let key in obj) {
                cloneObj[key] = deepClone(obj[key])
            }
            return cloneObj;
        }
            break;
        case '[object Array]': {
            return obj.map(item => deepClone(item))
        }
            break;
        default:
            return obj;
    }
}

/**
 * 上传文件转换为base64,这个file参数就是文件信息
 * **/
export const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
        let reader = new FileReader();
        let fileResult = "";
        reader.readAsDataURL(file);
        //开始转
        reader.onload = function () {
            fileResult = reader.result;
        };
        //转失败
        reader.onerror = function (error) {
            reject(error);
        };
        //转结束resolve 出去
        reader.onloadend = function () {
            resolve(fileResult);
        };
    });
}
//对菜单进行排序
export const sortRouters = (accessedRouters) => {
    for (let i = 0; i < accessedRouters.length; i++) {
        let router = accessedRouters[i];
        if (router.children && router.children.length > 0) {
            router.children.sort(compare("sort"));
        }
    }
    accessedRouters.sort(compare("sort"));
}
//升序比较函数
export const compare = (p) => {
        return function (m, n) {
            let a = m[p];
            let b = n[p];
            return a - b;
        }
    }

