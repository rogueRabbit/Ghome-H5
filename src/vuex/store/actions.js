import { ghhttp,  PostRequest } from '@/api/ghhttp.js'
import JSEncrypt from 'jsencrypt'
import { tripleDESToolEncrypt, tripleDESToolDecrypt,setCookie } from "@/utils/randomUtil.js"
import { APIs } from '@/api/requestUrl'

window.randomKey = '';
window.token = '';
window.deviceid = 10000;
let resetkey_count = 0;
//登录加密操作
export const PublicKey = ({ commit, state }, callback) => {
  ghhttp((handShakePostStr, res, key) => {
    let headers = {
      'X-APP-ID': deviceid,
      'X-TOKEN': state.token
    };
    randomKey = key;
    let encrypt = new JSEncrypt();
    let rsaPublic = res.data.data.key;
    encrypt.setPublicKey(rsaPublic);
    //let data=encryptedString(rsaPublic,handShakePostStr,'OHDave')
    //console.log(data);
    //let key=new RSAKeyPair(rsaPublic,10001,handShakePostStr);
    //console.log(key);
    let rsaStr = encrypt.encrypt(handShakePostStr);
    let params = {
      'signature': rsaStr,
      'timestamp': new Date().getTime()
    };
    PostRequest(APIs.getHandShakeUrl(),headers, rsaStr, (res) => {
      if (res.data.code != null && res.data.code == 0) {
        let returnData = tripleDESToolDecrypt(key, res.data.data);
        window.token=JSON.parse(returnData).token;
        setCookie('token',JSON.parse(returnData).token);
        console.log();
        commit('getToken', JSON.parse(returnData));
        if(callback){
          callback();
        }
      }
      //console.log(res);
    }, (err) => {
      console.log(err);
    })
  });
}

//获取用户配置
export const getAppConfigure = ({ commit, state }, dataBack, errBack) => {
  let data = {
    deviceid: deviceid
  };
  let headersUpdate={
    'X-APP-VERSION':'7.02.0',
    'X-CHANNEL':'A1',
    'X-PLATFORM':2,
    'X-AREA':'231',
    'X-SDK-VERSION':'2.2.0'
  };
  PostRequest(APIs.getAppConfigurationUrl(), setHeaders(state, sign(randomKey, data),headersUpdate), tripleDESToolEncrypt(randomKey, postDataStr(data)), (res) => {
    if (dataBack) {
      dataBack(JSON.parse(tripleDESToolDecrypt(randomKey, res.data.data)));
    }
  }, (err) => {
    if (errBack) {
      errBack(err);
    }
  });
}
//获取短信验证码
export const getPhonemsAction = ({ commit, state }, dataBack, errBack) => {
  let data = {
    phone: '+86-15172054835',
    supportPic: 2,
    type: 4,
    voiceMsg: 0
  };
  PostRequest(APIs.getRequestSmsCodeUrl(), setHeaders(state, sign(randomKey, data)), tripleDESToolEncrypt(randomKey, postDataStr(data)), (res) => {
    if (dataBack) {
      dataBack(JSON.parse(tripleDESToolDecrypt(randomKey, res.data.data)));
    }
  }, (err) => {
    if (errBack) {
      errBack(err);
    }
  });
}




function setHeaders(state, singnResult,moreHeader) {
  //设置请求头配置，用来传递签名
  let headersSet={
    'X-APP-ID': deviceid,
    'X-TOKEN': state.token,
    'X-SIGNATURE': singnResult,
    'X-HTTP-ENGINE':'android',
    'X-PROMOTERID':'android',
    'X-CHANNEL-INFO':'',
    'X-DEVICEID':1000
  };
  if(moreHeader){
    for(let i in moreHeader){
      headersSet[i] = moreHeader[i];
    }
  }
  return headersSet;
}

function sign(random, params) {//数据签名加入X-token
  let mapList = '';
  for (let key in params) {
    mapList = mapList + key + '=' + params[key] + '&';
  }
  if (mapList.length > 0) {
    mapList = mapList.substring(0, mapList.length - 1);
  }
  mapList = (mapList + random).toLowerCase();
  return CryptoJS.MD5(mapList).toString().toUpperCase();
}

function postDataStr(params) {
  let mapList = '';
  for (let key in params) {
    mapList = mapList + key + '=' + params[key] + '&';
  }
  if (mapList.length > 0) {
    mapList = mapList.substring(0, mapList.length - 1);
  }
  return encodeURI(mapList).replace(/\+/g, '%2B')
}

