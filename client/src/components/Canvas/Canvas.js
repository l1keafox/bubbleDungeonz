import React, { useState, useEffect, useRef } from "react";
// import bubble from "./bubble.png";
import { AUTH_USER_SESSION } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

import bubble from "./../Canvas/bubble.PNG";
import io from "socket.io-client";

const requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function (callback) {
      window.setTimeout(callback, 1000 / 30);
    }
  );
})();

const Canvas = () => {
  const [socket, setSocket] = useState(null);
  const [authUserSession] = useMutation(AUTH_USER_SESSION);

  useEffect(() => {
    const newSocket = io(); //`http://${window.location.hostname}:3001`
    setSocket(newSocket);
    return () => newSocket.close();
  }, []);

  var GAME = {
    // set up some initial values
    WIDTH: 320,
    HEIGHT: 480,

    RATIO: null,
    currentWidth: null,
    currentHeight: null,
    canvas: null, // canvas is the element
    ctx: null, // ctx is 2d rendering drawing enginge https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
    localCache: [],
    localObjects: null,
    init: function () {
      // the proportion of width to height
      GAME.RATIO = GAME.WIDTH / GAME.HEIGHT;
      GAME.currentWidth = GAME.WIDTH;
      GAME.currentHeight = GAME.HEIGHT;
      GAME.canvas = canvas.current;

      GAME.canvas.width = GAME.WIDTH;
      GAME.canvas.height = GAME.HEIGHT;

      // ctx is 2d rendering drawing enginge https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
      GAME.ctx = GAME.canvas.getContext("2d");

      // resize
      GAME.currentWidth = GAME.currentHeight * GAME.RATIO;

      GAME.canvas.style.width = GAME.currentWidth + "px";
      GAME.canvas.style.height = GAME.currentHeight + "px";
    },
    loop:function(){
      GAME.render();
      requestAnimFrame(GAME.loop);
    },

    render: function () {
      GAME.Draw.rect(0, 0, GAME.WIDTH, GAME.HEIGHT, "#036");
      // cycle through all entities and render to canvas
      if (GAME.localCache) {
        for (let gameObj of GAME.localCache) {
          GAME.Draw.img(bubble, gameObj.x, gameObj.y, gameObj.r, gameObj.r);
        }
      }


      // Now we have localStuff - this isn't shown to everyone only too the user.
      // So this will have clicks for now.
      if(!GAME.localObjects) GAME.localObjects = [];
//      console.log(GAME.localObjects.length, "is our local");
      let index = GAME.localObjects.length;
      while(index--){
      //for(let localObj of GAME.localObjects){
        const localObj = GAME.localObjects[index];
        switch(localObj.type){
          case "clickRipple":
            // This needs x and y from the click
            // So the object radius start 0 
            // and it's opacity starts at 100 and lowers.
            // {type:"clickRipple", x: this.x, y: this.y}
              if(localObj.radius === undefined){
                localObj.radius = 1;
              }
              if(localObj.opacity === undefined){
                localObj.opacity = 100;
              }
              if(localObj.framesLeft === undefined){
                localObj.framesLeft = 35;
              }
              
              if(localObj.framesLeft){
                localObj.framesLeft--;
                GAME.Draw.circle(localObj.x, localObj.y, parseInt( localObj.radius ),"white",localObj.opacity);
                localObj.radius += 1;
                localObj.opacity -= 10;
              }else {
                GAME.localObjects.splice(index,1);
              }
          break;
          default:

          break;
        }
      }
    },

    Draw: {
      clear: function () {
        GAME.ctx.clearRect(0, 0, GAME.WIDTH, GAME.HEIGHT);
      },

      rect: function (x, y, w, h, col) {
        GAME.ctx.fillStyle = col;
        GAME.ctx.fillRect(x, y, w, h);
      },
      img: function (image, dx, dy, dWidth, dHeight) {
        //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
        const img1 = new Image(); // Image constructor
        img1.src = image;
        img1.alt = "alt";
        GAME.ctx.drawImage(img1, dx, dy, dWidth, dHeight);
      },

      circle: function (x, y, r, col,o) {
        let oca = o;
        if(o > 1){
          oca = o/100;
        } 
        //GAME.ctx.fillStyle = col;
        GAME.ctx.fillStyle = `rgba(0, 0, 0, ${oca})`;
        GAME.ctx.beginPath();

        GAME.ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
        GAME.ctx.stroke();
        GAME.ctx.closePath();
        // GAME.ctx.fill();
      },

      text: function (string, x, y, size, col) {
        GAME.ctx.font = "bold " + size + "px Monospace";
        GAME.ctx.fillStyle = col;
        GAME.ctx.fillText(string, x, y);
      },
    },
  };

  const canvas = useRef(null);
  async function authMe(socketd) {
    try {
      await authUserSession({
        variables: { sessionId: socketd },
      });
    } catch (err) {
    }
  }
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        authMe(socket.id);

        GAME.init();
        socket.on("bubbles", (obj) => {
          GAME.localCache = obj;
        });
        requestAnimFrame(GAME.loop);
        GAME.loop();
        let Input = {
          x: 0,
          y: 0,
          tapped: false,

          set: function (data) {
            var offsetTop = GAME.canvas.offsetTop,
              offsetLeft = GAME.canvas.offsetLeft;
            this.x = data.pageX - offsetLeft -5;
            this.y = data.pageY - offsetTop -5;
            
            this.tapped = true;
            if( !GAME.localObjects ){
              GAME.localObjects = [];
            }
            GAME.localObjects.push({type:"clickRipple", x: this.x, y: this.y});

            socket.emit("click", { x: this.x, y: this.y });

          },
        };
        // listen for clicks
        GAME.canvas.addEventListener(
          "click",
          function (e) {

            e.preventDefault();
            //  POP.Input.set(e);
            Input.set(e);
          },
          false
        );
      });
    }
  }, [socket]);


  
  return (
    <div>
      <canvas ref={canvas} id="canvas"></canvas>
    </div>
  );
};

export default Canvas;
