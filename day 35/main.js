function buildFun(n){
  let arr = [];

  for (let i = 0; i < n; i++) {
    arr[i] = function() {
      return i;
    }
  }

  return arr;
}

for(let i = 0; i < 10; i++){
  console.log(buildFun(10)[i]());
}