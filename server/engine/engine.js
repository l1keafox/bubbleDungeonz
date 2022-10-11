/* The ENGINE

Everything in the engine is done in virutal memory (just normal vars nothing saved in the database).

engine gets initalized via init() called in server.js when the server first starts running.


Game's interface is:

updateFrame - what happens each framePerLoop.

emitFrames - This is what socket IO will be emitting.



*/

// Engine variables.
const FRAMES = 60; // Number of frames per sec
const FramePerLoop = Math.round( 1000/FRAMES ); // number of cycles per second. so every 16.67MS there will be an game loop.
let engineIntervalID; // This will be assigned an id of a setInterval in the initEngine
let gameData; // This gets declared as an object in initEngine.


// Main loop
// Remember this is something that is added on the stack, it doesn't guarnette it'll be called every X ticks, just it's being put on the stack.
function doGameLoop(){
    for(let gameId in gameData){
        // updateFrame

        // emit Frame.
    }
}



// PUBLIC Functions below

module.exports = { 
    init : function() {
        gameData = {};
        console.log(`  -ENG> Started Choo Choo loop every ${FramePerLoop} ms`);
        engineIntervalID = setInterval(doGameLoop,FramePerLoop);
    },
    // this returns various methods too
    addGame: (game,gameID) => {
        if(!gameID){
            gameID = Math.random()*1000000; // yeah 
        }
        gameData[gameID] = game;
    },
 };
