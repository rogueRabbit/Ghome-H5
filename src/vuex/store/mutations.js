const getMsg = (state, payload) => {
  console.log(state);
}
const getToken=(state,msg,callback)=>{
  //获取token值
  state.token=msg.token;
}
export {
  getMsg,
  getToken
}