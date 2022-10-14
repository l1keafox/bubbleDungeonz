
class Bubble {
  constructor() {
    this.type = "bubble";
    this.r = Math.floor(Math.random() * 15) + 6; // the radius of the bubble
    this.x = Math.floor(Math.random() * 320);
    this.y = 480 + rollDice(2, 4); // make sure it starts off screen
    let rando = Math.floor(Math.random() * 5) + 1;
    this.speed = Math.floor(Math.random() * 7) + 0.05 * 0.001 + 0.2;
    this.hits = rando;
    this.score = rando;
  }
  update() {
    this.y -= this.speed;
  }
  render() {
    return "circle";
  }
}


const {GameCard,Score} = require("../../models");


let bubble = {
  next: -1, // when the next bubble is spawned.
  maxTimer: 40, // what next is set too when it hits 0
  group: [], // this is what holds the bubbles.
};
let gameCardId;
module.exports = {
  name: function () {
    return "bubbles";
  },
  init: function (gameSettings) {
    // this is empty
    console.log(gameSettings.id);//
    gameCardId = gameSettings.id;

    io.on("connection", (socket) => {
      socket.on("click", (msg) => {
        let i = bubble.group.length;

        while (i--) {
          let bubb = bubble.group[i];
          if (
            distance(bubb.x + bubb.r, bubb.y + bubb.r, msg.x, msg.y) < bubb.r
          ) {
            bubb.hits--;
            const engine = require("../engine");
            if (bubb.hits <= 0) {
              // console.log(engine.sessionKey);
              let currentKey = engine.sessionKey();
              // console.log(currentKey[socket.id], currentKey);
              let findOne = currentKey.filter(
                (key) => key.sessionId === socket.id
              );
              if (findOne.length) {
                let scorer = findOne[0];
                /* scorer has these values;
                username: username,
        				id:  context.user._id,
        				sessionId:args.sessionId
                */
                if (scorer.points === undefined) {
                  scorer.points = 0;
                }
                let scorePts = rollDice(1, 6);
                scorer.points += scorePts;


                async function addScoreToGameCard( gameCardId, score, userId ){
                  const newScore = await GameCard.findByIdAndUpdate(
                    { _id: gameCardId },
                    {
                      $addToSet: { scores: { user: userId, score: score } },
                    },
                    { runValidators: true, new: true }
                  );
                  return newScore;
                };
                GameCard.findById({ _id: gameCardId }).exec(
                  async (err, collection) => { 
//                    console.log(gameCardId, scorer.username, scorer.id); // this is the gameCard
                   let update = await addScoreToGameCard(gameCardId, scorePts, scorer.id );
                } 
                )
                console.log(
                  `IN game: ${gameCardId} point scored by: ${scorer.username} has now ${scorer.points} id:${scorer.id}`
                );

              }

              bubble.group.splice(i, 1);
            }
          }
        }
      });
    });
  },
  updateFrame: function () {
    const Engine = require("../engine");
    const createBubs = function(randomCount){
      while (randomCount--) {
        let newBubble = new Bubble();
        bubble.group.push(newBubble);
      }
    }
    
    bubble.next--;
    if (bubble.next <= 0) {
      if(bubble.next < 0){
        createBubs(rollDice(3,4));
      } else {
        let newBubble = new Bubble();
        bubble.group.push(newBubble);
      }
      bubble.next = bubble.maxTimer;
    }
    if (bubble.group.length === 0) {
      createBubs(rollDice(2,6));
    }

    let index = bubble.group.length;
    while (index--) {
      // we go backwards cause I want too :P But in seriously
      // when splicing an array going backwards prevents some issues of next in array
      let bubb = bubble.group[index];
      bubb.update();
      if (bubble.group[index].y <= -10) {
        bubble.group.splice(index, 1);
        break;
      }
    }
  },
  emitData: function () {
    return bubble.group;
  },
};
