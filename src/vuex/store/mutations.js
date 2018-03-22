const getMsg = (state, payload) => {
  console.log(state);
}
const getToken=(state,msg)=>{
  //获取token值
  console.log(state);
  state.token=msg.token;
  console.log(msg.token);
}
export {
  getMsg,
  getToken
}