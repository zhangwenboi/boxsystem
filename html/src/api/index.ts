/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { message } from 'antd';

const codeMessage = {
    200: '服务器成功返回请求的数据。',
    201: '新建或修改数据成功。',
    202: '一个请求已经进入后台排队（异步任务）。',
    204: '删除数据成功。',
    400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
    401: '用户没有权限（令牌、用户名、密码错误）。',
    403: '用户得到授权，但是访问是被禁止的。',
    404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
    406: '请求的格式不可得。',
    410: '请求的资源被永久删除，且不会再得到的。',
    422: '当创建一个对象时，发生一个验证错误。',
    500: '服务器发生错误，请检查服务器。',
    502: '网关错误。',
    503: '服务不可用，服务器暂时过载或维护。',
    504: '网关超时。',
};

/**
 * 异常处理程序
 */
const errorHandler = (error: any): Response => {


    if (error.request.options.responseType === 'blob') {
        return error
    }
    const { response } = error;
    console.log("🚀 ~ response:", response);

    if (response && response.status) {
        const errorText = codeMessage[response.status] || response.statusText;
        const { status, url } = response;

        // 处理参数问题
        let noParamUrl = url;
        if (url.indexOf('?') !== -1) {
            noParamUrl = url.substring(0, url.indexOf('?'));
        }


        message.error(`请求错误 [${status}]: ${noParamUrl}${errorText}`);

    } else if (!response) {
        message.error('您的网络发生异常，无法连接服务器');
    }
    return response;
};

/**
 * 配置request请求时的默认参数
 */
const request = extend({
    errorHandler, // 默认错误处理
    credentials: 'include', // 默认请求是否带上cookie
    // requestType: 'form',
});

/**
 * 所以请求拦截器
 */
// request.interceptors.request.use((url, options): any => {
//     return {
//         url,
//         options: {
//             ...options,
//             headers: {
//                 Authorization: getCookies()?.replaceAll('"', ''),
//             },
//         },
//     };
// });

/**
 * 所有响应拦截器
 */
request.interceptors.response.use(async (response, options): Promise<any> => {

    if (options.responseType === 'blob') {
        return response
    }

    const { status } = response;

    // console.log(data)
    if ((status === 500)) {
        message.error({
            content: '网络错误'
        });
    }
    return response;
});

export default request;


