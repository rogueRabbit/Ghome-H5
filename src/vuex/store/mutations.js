const getMsg = (state, payload) => {
  console.log(state);
}
const getToken=(state,msg,callback)=>{
  //获取token值
  state.token=msg.token;
}
const randomKey=(state,data)=>{
  state.randomKey = data;
  console.log(data);
  //state.randomKey=msg
}
export {
  getMsg,
  getToken,
  randomKey
}