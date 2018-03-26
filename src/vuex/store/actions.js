import { ghhttp, getPhonems, getToken, APIfun, PostRequest } from '@/api/ghhttp.js'
import JSEncrypt from 'JSEncrypt'
import { tripleDESToolEncrypt, tripleDESToolDecrypt } from "@/utils/randomUtil.js"
import { APIs } from '@/api/requestUrl'

let randomKey = '';
let resetkey_count = 0;
//登录加密操作
export const PublicKey = ({ commit, state }, callback) => {
  ghhttp((handShakePostStr, res, key) => {
    let headers = {
      'X-APP-ID': 100112,
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
    var base = new Base64();
    getToken(headers, rsaStr, (res) => {
      if (res.data.code != null && res.data.code == 0) {
        let returnData = tripleDESToolDecrypt(key, res.data.data);
        commit('getToken', JSON.parse(returnData), callback);
      }
      //console.log(res);
    }, (err) => {
      console.log(err);
    })
  });
}

//获取短信验证码
export const getPhonemsAction = ({ commit, state }, dataBack, errBack) => {
  let data = {
    phone: '+86-17621933537',
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

export const getTokenUrl = () => {
  getToken({}, (res) => {
  })
}
export const increment1 = (context) => {
  console.log(2222);
}
function byteArrayToString(byteArray) {
  var str = "", i;
  for (i = 0; i < byteArray.length; ++i) {
    str += escape(String.fromCharCode(byteArray[i]));
  }
  return str;
}
function setHeaders(state, singnResult) {
  //设置请求头配置，用来传递签名
  return {
    'X-APP-ID': 100112,
    'X-TOKEN': state.token,
    'X-SIGNATURE': singnResult
  }
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

