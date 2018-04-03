
const getLocalStorage = function(name){
  return JSON.parse(localStorage.getItem(name))
};

const setLocalStorage = function(name, val){
  localStorage.setItem(name, JSON.stringify(val))
};

const removeStorage =  function(name){
  localStorage.removeItem(name);
};

const getSessionStorage = function(name){
  return JSON.parse(sessionStorage.getItem(name))
};

const setSessionStorage = function(name, val){
  sessionStorage.setItem(name, JSON.stringify(val))
};
const isPoneAvailable =  function (str) {
  let myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
};

export {
  getLocalStorage,
  setLocalStorage,
  isPoneAvailable,
  removeStorage,
  getSessionStorage,
  setSessionStorage
}

