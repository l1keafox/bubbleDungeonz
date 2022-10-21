class Bubble {
  constructor() {
    this.type = "bubble";
    this.r = Math.floor(Math.random() * 15) + 6; // the radius of the bubble
    this.x = Math.floor(Math.random() * 320);
    this.y = 480 + rollDice(2, 4); // make sure it starts off screen
    let rando = Math.floor(Math.random() * 5) + 1;
    this.speed = Math.random() + Math.random();
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

const { GameCard, Score } = require("../../models");

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
    gameCardId = gameSettings.id;

    io.on("connection", (socket) => {
      socket.on("click", (msg) => {
        let i = bubble.group.length;

        while (i--) {
          let bubb = bubble.group[i];
          if (
            distance(bubb.x , bubb.y , msg.x, msg.y) < bubb.r
          ) {
            bubb.hits--;
            let scorePts = 1;

            if (bubb.hits <= 0) {
              scorePts += rollDice(bubb.score, bubb.score);
              bubble.group.splice(i, 1);
            }

            const engine = require("../engine");
            let currentKey = engine.sessionKey();
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

              async function addScoreToGameCard(gameCardId, score, userId) {
                const newScore = await GameCard.findByIdAndUpdate(
                  { _id: gameCardId },
                  {
                    $addToSet: { scores: { user: userId, score: score } },
                  },
                  { runValidators: true, new: true }
                );
                return newScore;
              }

              // async function updateScoreOnGameCard(gameCardId, score, userId) {
              //   const newScore = await GameCard.findByIdAndUpdate(
              //     { _id: gameCardId, "scores.user": userId },
              //     {
              //       $set: { "scores.$.score": score },
              //     },
              //     { runValidators: true, new: true }
              //   );
              //   return newScore;
              // }

              GameCard.findById({ _id: gameCardId }).exec(
                async (err, collection) => {

                  
                  if (collection) {
                    let foundSelf = false;
                    for (let i in collection.scores) {
                      if (collection.scores[i].user == scorer.id) {
                        foundSelf = true;
                        collection.scores[i].score += scorePts;
                        let dtz = await collection.save();
                      }
                    }
                    if (foundSelf) {
                    } else {
                      addScoreToGameCard(gameCardId, scorePts, scorer.id);
                    }
                  }
                }
              );
              // console.log(
              //   `IN game: ${gameCardId} point scored by: ${scorer.username} has now ${scorer.points} id:${scorer.id}`
              // );
            }
          }
        }
      });
    });
  },
  updateFrame: function () {
    const Engine = require("../engine");
    const createBubs = function (randomCount) {
      while (randomCount--) {
        let newBubble = new Bubble();
        bubble.group.push(newBubble);
      }
    };

    bubble.next--;
    if (bubble.next <= 0) {
      if (bubble.next < 0) {
        createBubs(rollDice(1, 2));
      } else {
        let newBubble = new Bubble();
        bubble.group.push(newBubble);
      }
      bubble.next = bubble.maxTimer;
    }
    if (bubble.group.length === 0) {
      createBubs(rollDice(1, 6));
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
