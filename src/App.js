import "./App.css";

function App() {
  var canvas;
  var context;
  var isDrawing = false;
  var drawingResult = -1;
  var checkDrawingResult = false;
  var isMobile = false;
  var dottedLine = 0;
  var zigzag = [
    [
      {
        rotation: 15,
        coordinate: {
          fromX: -25,
          fromY: -15,
          toX: 25,
          toY: -15,
        },
      },
      {
        rotation: 345,
        coordinate: {
          fromX: -25,
          fromY: 0,
          toX: 25,
          toY: 0,
        },
      },
      {
        rotation: 15,
        coordinate: {
          fromX: -25,
          fromY: 15,
          toX: 25,
          toY: 15,
        },
      },
    ],
    [
      {
        rotation: 15,
        coordinate: {
          fromX: -35,
          fromY: -30,
          toX: 15,
          toY: -30,
        },
      },
      {
        rotation: 345,
        coordinate: {
          fromX: -25,
          fromY: -15,
          toX: 25,
          toY: -15,
        },
      },
      {
        rotation: 15,
        coordinate: {
          fromX: -25,
          fromY: 0,
          toX: 25,
          toY: 0,
        },
      },
      {
        rotation: 345,
        coordinate: {
          fromX: -25,
          fromY: 15,
          toX: 25,
          toY: 15,
        },
      },
      {
        rotation: 15,
        coordinate: {
          fromX: -18,
          fromY: 30,
          toX: 32,
          toY: 30,
        },
      },
    ],
    [
      {
        rotation: 15,
        coordinate: {
          fromX: -35,
          fromY: -30,
          toX: 15,
          toY: -30,
        },
      },
      {
        rotation: 345,
        coordinate: {
          fromX: -25,
          fromY: -15,
          toX: 25,
          toY: -15,
        },
      },
      {
        rotation: 15,
        coordinate: {
          fromX: -25,
          fromY: 0,
          toX: 25,
          toY: 0,
        },
      },
      {
        rotation: 345,
        coordinate: {
          fromX: -30,
          fromY: 15,
          toX: 20,
          toY: 15,
        },
      },
    ],
  ];

  var BIG_ZIGZAG = [
    [
      {
        rotation: 345,

        coordinate: {
          fromX: -77,
          fromY: -65,
          toX: 100,
          toY: -65,
        },
      },
      {
        rotation: 25,

        coordinate: {
          fromX: -100,
          fromY: 0,
          toX: 100,
          toY: 0,
        },
      },
      {
        rotation: 345,

        coordinate: {
          fromX: -100,
          fromY: 65,
          toX: 100 - (100 - 77),
          toY: 65,
        },
      },
    ],
    [
      {
        rotation: 15,
        coordinate: {
          fromX: -100,
          fromY: -100,
          toX: 77,
          toY: -100,
        },
      },
      {
        rotation: 345,
        coordinate: {
          fromX: -82,
          fromY: -50,
          toX: 118,
          toY: -50,
        },
      },
      {
        rotation: 15,
        coordinate: {
          fromX: -100,
          fromY: 0,
          toX: 100,
          toY: 0,
        },
      },
      {
        rotation: 345,
        coordinate: {
          fromX: -110,
          fromY: 50,
          toX: 90,
          toY: 50,
        },
      },
      {
        rotation: 15,
        coordinate: {
          fromX: -75,
          fromY: 100,
          toX: 120,
          toY: 100,
        },
      },
    ],
    [
      {
        rotation: 15,
        coordinate: {
          fromX: -110,
          fromY: -75,
          toX: 68,
          toY: -75,
        },
      },
      {
        rotation: 345,
        coordinate: {
          fromX: -100,
          fromY: -30,
          toX: 100,
          toY: -30,
        },
      },
      {
        rotation: 15,
        coordinate: {
          fromX: -100,
          fromY: 30,
          toX: 100,
          toY: 30,
        },
      },
      {
        rotation: 345,
        coordinate: {
          fromX: -125,
          fromY: 75,
          toX: 72,
          toY: 75,
        },
      },
    ],
  ];

  window.onload = function () {
    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      isMobile = true;
    } else {
      isMobile = false;
    }

    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = isMobile ? 686 : 80;
    canvas.height = isMobile ? 726 : 100;
    context.strokeStyle = "red";
    context.lineWidth = isMobile ? 8 : 4;

    canvas.ontouchstart = startDrawing;
    canvas.ontouchend = stopDrawing;
    canvas.ontouchmove = draw;

    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmousemove = draw;
    canvas.onmouseleave = stopDrawing2;

    // start sample
    // context.beginPath();
    // context.moveTo(100, 10);
    // context.lineTo(210, 10);
    // context.strokeStyle = "lime";
    // context.stroke();

    // context.beginPath();
    // context.moveTo(100, 30);
    // context.lineTo(210, 30);
    // context.strokeStyle = "blue";
    // context.stroke();

    // context.beginPath();
    // context.moveTo(100, 50);
    // context.lineTo(210, 50);
    // context.strokeStyle = "red";
    // context.stroke();

    // context.strokeStyle = "red";
    // context.strokeRect(310, 70, 100, 200);

    // context.save();
    // context.strokeStyle = "lime";
    // context.strokeRect(510, 70, 100, 200);
    // context.restore();

    // context.strokeRect(710, 70, 100, 200);
    // end sample

    function stopDrawing2() {
      if (isDrawing) {
        stopDrawing();
        isDrawing = false;
      }
    }

    function calculateRedLine() {
      let count = 0;
      let rgba = context.getImageData(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < rgba.data.length; i += 1) {
        if (
          rgba.data[i] === 255 &&
          rgba.data[i + 1] === 0 &&
          rgba.data[i + 2] === 0
        ) {
          count += 1;
        }
      }

      return count;
    }

    function calculateWhiteDots() {
      let count = 0;
      let rgba = context.getImageData(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < rgba.data.length; i += 1) {
        if (
          rgba.data[i] === 255 &&
          rgba.data[i + 1] === 255 &&
          rgba.data[i + 2] === 255
        ) {
          count += 1;
        }
      }

      return count;
    }

    function drawDottedLine(fromX, fromY, toX, toY) {
      context.lineWidth = 2;
      context.strokeStyle = "white";
      context.setLineDash([5, 5]);

      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
    }

    function drawInitial() {
      context.beginPath();

      let randomZigzag = 1;
      let scale = 1;
      let selectedZigzag = isMobile
        ? BIG_ZIGZAG[randomZigzag]
        : zigzag[randomZigzag];

      selectedZigzag.forEach((element) => {
        // can add the switch to utils
        switch (randomZigzag) {
          case 0:
            scale = isMobile ? 2.5 : 1;
            break;
          case 1:
            scale = isMobile ? 1.5 : 1;
            break;
          case 2:
            scale = isMobile ? 1 : 1;
            break;
          default:
            scale = 1;
            break;
        }

        context.save();
        context.translate(canvas.width / 2, canvas.height / 2);
        context.rotate((element.rotation * Math.PI) / 180);
        context.scale(scale, scale);
        context.translate(-canvas.width / 2, -canvas.height / 2);
        drawDottedLine(
          canvas.width / 2 + element.coordinate.fromX,
          canvas.height / 2 + element.coordinate.fromY,
          canvas.width / 2 + element.coordinate.toX,
          canvas.height / 2 + element.coordinate.toY
        );
        context.restore();
      });

      // context.save();
      // context.rotate((75 * Math.PI) / 180);
      // drawDottedLine(385, -276, 385, 14);
      // context.restore();

      // context.save();
      // context.rotate((285 * Math.PI) / 180);
      // drawDottedLine(-192, 130, -192, 430);
      // context.restore();

      // context.save();
      // context.rotate((75 * Math.PI) / 180);
      // drawDottedLine(228, -308, 228, -8);
      // context.restore();

      dottedLine = calculateWhiteDots();
    }

    function startDrawing(e) {
      isDrawing = true;
      context.beginPath();

      if (isMobile) {
        context.moveTo(
          e.changedTouches[0].clientX - canvas.offsetLeft,
          e.changedTouches[0].clientY - canvas.offsetTop
        );
      } else {
        context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
      }
    }

    function draw(e) {
      let x = null;
      let y = null;
      if (isDrawing === true) {
        if (isMobile) {
          x = e.changedTouches[0].clientX - canvas.offsetLeft;
          y = e.changedTouches[0].clientY - canvas.offsetTop;
        } else {
          x = e.pageX - canvas.offsetLeft;
          y = e.pageY - canvas.offsetTop;
        }

        context.lineTo(x, y);
        context.stroke();
      }
    }

    function stopDrawing() {
      isDrawing = false;

      let totalRed = calculateRedLine();
      let totalWhite = calculateWhiteDots();

      if (
        totalRed < dottedLine * 2 &&
        totalRed > (dottedLine * 2 * 60) / 100 &&
        totalWhite < (dottedLine * 60) / 100
      ) {
        checkDrawingResult = true;
      } else {
        checkDrawingResult = false;
      }

      if (drawingResult === 1) {
        checkDrawingResult = true;
      } else if (drawingResult === 0) {
        checkDrawingResult = false;
      }

      document.getElementById("result").innerHTML =
        "Result: " + checkDrawingResult;

      drawingResult = -1;
      console.log("Dotted line: " + calculateWhiteDots());
      console.log("Red line: " + calculateRedLine());

      // Clear drawed line
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawInitial();
    }

    drawInitial();
  };

  return (
    <>
      <div className="App">
        <canvas id="canvas" />
        <div id="result" />
      </div>
    </>
  );
}

export default App;
