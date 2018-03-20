import {ghhttp,getPhonems} from '@/api/ghhttp.js'
//登录加密操作
export const PublicKey =(context)=> {
  ghhttp();
}

export const getPhonemsAction =(context)=> {
  let data={
    voiceMsg:0,
    supportPic:2, 
    phone:'+86-18717778365',
    type:4
  };
  getPhonems(data,(res)=>{
    console.log(res);
  });
}

export const increment1 =(context)=> {
  console.log(2222);
}