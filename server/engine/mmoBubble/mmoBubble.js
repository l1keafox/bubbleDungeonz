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

let bubble = {
    next:0, // when the next bubble is spawned.
    maxTimer: 40, // what next is set too when it hits 0
    group: [], // this is what holds the bubbles.
}

module.exports = {
    name: function(){
        return "bubbles";
    },
    updateFrame: function(){
        bubble.next--;
        if(bubble.next <= 0){
            bubble.next = bubble.maxTimer;
            let newBubble = new Bubble();
            bubble.group.push(newBubble);
        }
        let index = bubble.group.length;
        while(index--){
          // we go backwards cause I want too :P But in seriously
          // when splicing an array going backwards prevents some issues of next in array
          let bubb = bubble.group[index];
          bubb.update();
           if(bubble.group[index].y <= -10){
            bubble.group.splice(index,1);
             break;
           }
        }
      
    },
    emitData: function(){
        return bubble.group;
    }
}