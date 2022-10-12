import React, { useState, useEffect, useRef } from "react";


import io from "socket.io-client";

const Canvas = () => {
  const [socket, setSocket] = useState(null);
  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3002`);
    console.log(newSocket, "Creating?");
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

    init: function () {
      // the proportion of width to height
      GAME.RATIO = GAME.WIDTH / GAME.HEIGHT;
      GAME.currentWidth = GAME.WIDTH;
      GAME.currentHeight = GAME.HEIGHT;
      GAME.canvas = canvas.current;
      console.log(canvas.current, "Init canvas?");
      GAME.canvas.width = GAME.WIDTH;
      GAME.canvas.height = GAME.HEIGHT;

      // ctx is 2d rendering drawing enginge https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/getContext
      GAME.ctx = GAME.canvas.getContext("2d");

      // resize
      GAME.currentWidth = GAME.currentHeight * GAME.RATIO;

      GAME.canvas.style.width = GAME.currentWidth + "px";
      GAME.canvas.style.height = GAME.currentHeight + "px";

    },
    render: function (objects) {
      GAME.Draw.rect(0, 0, GAME.WIDTH, GAME.HEIGHT, "#036");

      // cycle through all entities and render to canvas
      if (objects) {
        for (let gameObj of objects) {
          // let color;

          // let ditto =
          GAME.Draw.circle(
            gameObj.x,
            gameObj.y,
            gameObj.r,
            "rgba(255,255,255,1)"
          );
          GAME.Draw.text(
            gameObj.hits,
            gameObj.x,
            gameObj.y - 1,
            "rgba(255,255,255,1)"
          );
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

      circle: function (x, y, r, col) {
        GAME.ctx.fillStyle = col;
        GAME.ctx.beginPath();
        GAME.ctx.arc(x + 5, y + 5, r, 0, Math.PI * 2, true);
        GAME.ctx.closePath();
        GAME.ctx.fill();
      },

      text: function (string, x, y, size, col) {
        GAME.ctx.font = "bold " + size + "px Monospace";
        GAME.ctx.fillStyle = col;
        GAME.ctx.fillText(string, x, y);
      },
    },
  };

  const canvas = useRef(null);

  useEffect(() => {
//    console.log(socket, "Testing");
    if (socket) {
      console.log("connection made: init canvas");
      GAME.init();
      socket.on("bubbles", (obj) => {
        GAME.render(obj);
      });
      let Input = {
        x: 0,
        y: 0,
        tapped: false,
    
        set: function (data) {
          var offsetTop = GAME.canvas.offsetTop,
            offsetLeft = GAME.canvas.offsetLeft;
          this.x = data.pageX - offsetLeft;
          this.y = data.pageY - offsetTop;
          this.tapped = true;
          console.log("Tapped!", { x: this.x, y: this.y });
          socket.emit("click", { x: this.x, y: this.y });
          GAME.Draw.circle(this.x, this.y, 10, "red");
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

    }
  }, [socket]);

  return <canvas ref={canvas} id="canvas"></canvas>;
};

export default Canvas;
