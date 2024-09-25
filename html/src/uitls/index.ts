/**
 * @description: 获取cookie
 * @params:key
 */
export const getCookies = (key = 'token') => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieKey, cookieValue] = cookie.split('=');
        if (cookieKey === key) {
            return cookieValue;
        }
    }
}
export const copyToClipboard = (text: string) => {
    let target = null;
    target = document.createElement('div');
    target.id = 'tempTarget';
    target.style.opacity = '0';
    target.innerText = text
    document.body.appendChild(target);
    try {
        let range = document.createRange();
        range.selectNode(target);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        console.log('复制成功')
    } catch (e) {
        console.log('复制失败')
    }
    document.body.removeChild(target)
};
export const getAllCookies = () => {
    const cookies = document.cookie.split('; ');
    const cookieObj = {};
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieKey, cookieValue] = cookie.split('=');
        cookieObj[cookieKey] = cookieValue;
    }
    return cookieObj;
}
export const setCookies = (key: string, value: string, expires: number = 1) => {
    const d = new Date();
    d.setTime(d.getTime() + expires * 24 * 60 * 60 * 1000);
    document.cookie = `${key}=${value};expires=${d.toUTCString()};path=/`;
}

export const deleteCookie = (name: string) => {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const [cookieName] = cookie.split('=');
        if (cookieName === name) {
            // 将cookie的过期时间设置为过去的时间
            document.cookie = `${name}=; expires=${new Date(0).toUTCString()}; path=/;`;
            break;
        }
    }
}

export const clearCookie = () => {
    let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
        for (let i = keys.length; i--;) {
            document.cookie = keys[i] + '=0;path=/;expires=' + new Date(0).toUTCString();//清除当前域名下的,例如：m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=' + document.domain + ';expires=' + new Date(0).toUTCString();//清除当前域名下的，例如 .m.kevis.com
            document.cookie = keys[i] + '=0;path=/;domain=kevis.com;expires=' + new Date(0).toUTCString();//清除一级域名下的或指定的，例如 .kevis.com
        }
    }
    console.log('已清除');
}


// 防抖,并且可以立即执行一次,可以携带参数
export const debounce = (fn: (...args) => void, delay: number, immediate: boolean = false) => {
    let timer: any = null;
    return function (...args) {
        if (immediate) {
            fn(...args);
        }
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(...args);
        }, delay);
    };
}


// 节流,并且可以立即执行一次,可以携带参数,可以控制最后一次是否执行
export const throttle = (fn: (...args) => void, delay: number, immediate: boolean = false, last: boolean = false) => {
    let timer: any = null;
    let flag = true;
    if (last) {
        return debounce((...args) => {
            if (immediate && flag) {
                fn(...args);
                flag = false;
            }
            if (!timer) {
                timer = setTimeout(() => {
                    fn(...args);
                    timer = null;
                }, delay);
            }
        }, delay, immediate)
    } else {
        return function (...args) {
            if (immediate && flag) {
                fn(...args);
                flag = false;
            }
            if (!timer) {
                timer = setTimeout(() => {
                    fn(...args);
                    timer = null;
                }, delay);
            }

        };
    }
}
// 定时请求,当满足条件时,停止请求
export const intervalRequest = (fn: (...args) => void, delay: number, condition: () => boolean) => {
    return setInterval(() => {
        if (condition()) {
            fn();
        }
    }, delay
    );
}
// 获取地址中携带的参数
export function getQueryParams(): object;
export function getQueryParams(name: string): string;
export function getQueryParams(name?: string): string | object {
    var qList = window.location.hash.substring(1)?.split('?').filter(e => e.includes('='))

    if (!qList?.length) return null

    var pair = qList[0]?.split("&");

    if (name) {
        const pariname = pair.find(e => e.includes(`${name}=`))
        return pariname ? decodeURIComponent(pariname)?.split('=')[1] : ""
    } else {
        var queryParams = {};
        for (var i = 0; i < pair.length; i++) {
            var arr = pair[i].split("=");
            queryParams[arr[0]] = decodeURIComponent(arr[1]);
        }
        return queryParams
    }
}
// 点击下载文件

export const downFile = (content: string, filename: string): void => {
    var ele = document.createElement('a');// 创建下载链接
    ele.download = filename;//设置下载的名称
    ele.style.display = 'none';// 隐藏的可下载链接
    // 字符内容转变成blob地址
    var blob = new Blob([content]);
    ele.href = URL.createObjectURL(blob);
    // 绑定点击时间
    document.body.appendChild(ele);
    ele.click();
    // 然后移除
    window.URL.revokeObjectURL(ele.href) // 释放URL 对象
    document.body.removeChild(ele);
};

// 将json参数转换为formData格式参数
export const jsonToFormData = (json: any) => {
    const formData = new FormData();
    Object.keys(json).forEach((key) => {
        if (typeof json[key] === 'object') {
            formData.append(key, JSON.stringify(json[key]));
        } else {
            formData.append(key, json[key]);
        }
    });
    return formData
}

// 将多维数组转换为一维数组,并且检测是否数组对象中有children
export const flattenChildrenArray = (arr: any[]) => {
    return arr.reduce((a, b) => {
        return a.concat(Array.isArray(b.children) ? flattenChildrenArray(b.children) : b);
    }, []);
}