let domin='';

//获取公钥
const getPublickeyUrl=()=>{
    return domin + '/v1/basic/publickey'
}
//发送短信验证码
const smssend=()=>{
    return domin + '/v1/basic/smssend'
}
export {
    getPublickeyUrl,
    smssend
}