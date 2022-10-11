class Bubble{
    constructor(){
      this.type = "bubble";
      this.r =  Math.floor( Math.random()*10)+3; // the radius of the bubble
      this.x = Math.floor( Math.random()*320);
      this.y = 480; // make sure it starts off screen
      let rando = Math.floor( Math.random()*5)+1;
      this.speed = (Math.floor( Math.random()*7)+.05 * 0.001) + 0.2
      this.hits = rando;
      this.score = rando;
    }
    update(){
      this.y -= this.speed;
    
    }
    render(){
      return 'circle';
    }
  }

  