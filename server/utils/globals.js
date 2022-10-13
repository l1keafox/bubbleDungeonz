// This is an folder to add global functions. Try not to abuse too much.

global.rollDice = (numOfDice,numOfFaces) =>{
    let rtn = 0;
    while(numOfDice--){
      rtn += Math.ceil(Math.random()*numOfFaces);
    };
    return rtn;
  };

  global.distance = (x1,y1,x2,y2) =>{
    let a =Math.abs (x1-x2);
    let b =Math.abs (y1-y2);
    return Math.sqrt((a*a)+(b*b))
  }