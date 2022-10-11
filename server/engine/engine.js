/* The ENGINE

Everything in the engine is done in virutal memory (just normal vars nothing saved in the database).

engine gets initalized via init() called in server.js when the server first starts running.


Game's interface is:

updateFrame - what happens each framePerLoop.

emitFrames - This is what socket IO will be emitting.

name - name? 

*/

// Engine variables.
const FRAMES = 30; // Number of frames per sec
const FramePerLoop = Math.round( 1000/FRAMES ); // number of cycles per second. so every 16.67MS there will be an game loop.
let engineIntervalID; // This will be assigned an id of a setInterval in the initEngine
let gameData; // This gets declared as an object in initEngine.


const mmoBubble = require('./mmoBubble/mmoBubble');
// Main loop
// Remember this is something that is added on the stack, it doesn't guarnette it'll be called every X ticks, just it's being put on the stack.
function doGameLoop(){
    for(let gameId in gameData){
        let thisGame = gameData[gameId];
        // updateFrame
        thisGame.updateFrame();
        // get data too
        const data = thisGame.emitData();
        // let {io} = require('./../socket/');
        // io is on the global object because i(ray) couldn't figure out how to grab
        // it from index.js. I am not proud of this
        // but if this can be fixed please let me know.
        io.emit("bubbles",data);
    }
}



// PUBLIC Functions below

module.exports = { 
    init : function() {
        gameData = {};
        console.log(`  -ENG> Started Choo Choo loop every ${FramePerLoop} ms`);
        engineIntervalID = setInterval(doGameLoop,FramePerLoop);
        this.addGame(mmoBubble);
    },
    // this returns various methods too
    addGame: (game,gameID) => {
        console.log("  -ENG> added GAME",game.name());
        if(!gameID){
            gameID = Math.random()*1000000; // yeah 
        }
        gameData[gameID] = game;
    },
 };
