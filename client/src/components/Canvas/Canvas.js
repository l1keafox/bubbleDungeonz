import React, { useState, useEffect, useRef } from "react";

import { io } from "socket.io-client";
const Canvas = (props) => {
  var GAME = {
    // set up some initial values
    WIDTH: 320,
    HEIGHT: 480,
    nextBubble: 0,
    entities: [],
    localCache: null, // this is what is filled in order to draw
    // we'll set the rest of these
    // in the init function
    RATIO: null,
    currentWidth: null,
    currentHeight: null,
    canvas: null,
    ctx: null,

    init: function () {
      // the proportion of width to height
      GAME.RATIO = GAME.WIDTH / GAME.HEIGHT;
      // these will change when the screen is resized
      GAME.currentWidth = GAME.WIDTH;
      GAME.currentHeight = GAME.HEIGHT;
      // this is our canvas element
      //GAME.canvas = document.querySelector("#canvas");
      GAME.canvas = canvas.current;
      // setting this is important
      // otherwise the browser will
      // default to 320 x 200
      GAME.canvas.width = GAME.WIDTH;
      GAME.canvas.height = GAME.HEIGHT;
      // the canvas context enables us to
      // interact with the canvas api
      GAME.ctx = GAME.canvas.getContext("2d");

      // we're ready to resize
      //GAME.resize();
      GAME.loop();
      //},
      //  resize: function () {
      //    GAME.currentHeight = window.innerHeight;
      // resize the width in proportion
      // to the new height
      GAME.currentWidth = GAME.currentHeight * GAME.RATIO;

      // this will create some extra space on the
      // page, allowing us to scroll past
      // the address bar, thus hiding it.
      if (GAME.android || GAME.ios) {
        document.body.style.height = window.innerHeight + 50 + "px";
      }

      // set the new canvas style width and height
      // note: our canvas is still 320 x 480, but
      // we're essentially scaling it with CSS
      GAME.canvas.style.width = GAME.currentWidth + "px";
      GAME.canvas.style.height = GAME.currentHeight + "px";

      // we use a timeout here because some mobile
      // browsers don't fire if there is not
      // a short delay
      window.setTimeout(function () {
        window.scrollTo(0, 1);
      }, 1);
    },
    loop: function () {
      GAME.render();
    },
    render: function () {
      GAME.Draw.rect(0, 0, GAME.WIDTH, GAME.HEIGHT, "#036");

      // cycle through all entities and render to canvas
      if (this.localCache) {
        for (let gameObj of this.localCache) {
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
          //        console.log(ditto,gameObj.x,gameObj.y, gameObj.r);
        }
      }
      //        window.scrollTo(0, document.body.scrollHeight);
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

  //"bubbles"

  const canvas = useRef(null);
  useEffect(() => {
    // 👇️ use a ref (best)
    const el2 = canvas.current;
    console.log(el2);

    // 👇️ use document.querySelector()
    // should only be used when you can't set a ref prop on the element
    // (you don't have access to the element)
    const el = document.querySelector("#canvas");
    console.log(el);
    GAME.init();
  }, []);
  return (
    <canvas ref={canvas} id="canvas">
      {" "}
    </canvas>
  );
};

export default Canvas;
