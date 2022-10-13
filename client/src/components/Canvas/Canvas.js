import React, { useState, useEffect, useRef } from "react";
// import bubble from "./bubble.png";
import { AUTH_USER_SESSION } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

import bubble from "./../Canvas/bubble.PNG";
import io from "socket.io-client";
import color from "./../../utils/colors.css";
import auth from "./../../utils/auth";
const Canvas = () => {
  const [socket, setSocket] = useState(null);
  const [authUserSession, { error, data }] = useMutation(AUTH_USER_SESSION);

  useEffect(() => {
    const newSocket = io(`http://${window.location.hostname}:3002`);
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
          GAME.Draw.img(bubble, gameObj.x, gameObj.y, gameObj.r, gameObj.r);
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
  async function authMe(socketd) {
    try {
      const {} = await authUserSession({
        variables: { sessionId: socketd },
      });
      //...formState
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        authMe(socket.id);

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
