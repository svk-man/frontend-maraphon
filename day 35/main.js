function buildFun(n){
  var res = [];

  for (var i = 0; i< n; i++){
    let j = i;

    res.push(function(){
      return j;
    })
  }

  return res;
}

for(var i = 0; i < 10; i++){
  console.log(buildFun(10)[i]());
}


function getAverage(marks){
  const sum = marks.reduce(function(sum, item) { return sum + item; }, 0);
  return parseInt(sum / marks.length);
}

console.log(getAverage([2,2,2,2]));
console.log(getAverage([1,2,3,4,5,]));
console.log(getAverage([1,1,1,1,1,1,1,2]));