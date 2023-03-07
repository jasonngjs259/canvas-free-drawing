import "./App.css";

function App() {
  var canvas;
  var context;
  var isDrawing = false;
  var drawingResult = -1;
  var checkDrawingResult = false;
  var startPointX = 0;
  var startPointY = 0;
  var endPointX = 0;
  var endPointY = 0;
  var isMouseLeave = 0;

  window.onload = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = 80;
    canvas.height = 100;
    context.strokeStyle = "red";
    context.lineWidth = 3;

    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmousemove = draw;
    canvas.onmouseleave = stopDrawing2;

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
      // context.fillStyle = "rgba(255, 0, 0, 0.5)"; // red
      // context.fillRect(0, 0, 80, 100);
      // context.fillStyle = "rgba(0, 255, 0, 0.5)"; // lime

      context.beginPath();

      context.save();
      context.rotate((75 * Math.PI) / 180);
      // context.fillRect(48, -50, 15, 55);
      drawDottedLine(55, 5, 55, -48);
      context.restore();

      context.save();
      context.rotate((285 * Math.PI) / 180);
      // context.fillRect(-30, 20, 15, 55);
      drawDottedLine(-22, 20, -22, 70);
      context.restore();

      context.save();
      context.rotate((75 * Math.PI) / 180);
      // context.fillRect(20, -50, 15, 50);
      drawDottedLine(28, -8, 28, -50);
      context.restore();

      //---------------------------------------------------

      // context.save();
      // context.rotate((285 * Math.PI) / 180);
      // context.fillRect(-470, 265, 100, 525);
      // // drawDottedLine(-415, 315, -415, 770);
      // context.restore();

      // context.save();
      // context.rotate((75 * Math.PI) / 180);
      // context.fillRect(710, -475, 100, 525);
      // // drawDottedLine(755, -455, 755, 50);
      // context.restore();
    }

    function startDrawing(e) {
      isDrawing = true;
      context.beginPath();
      context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
      startPointX = e.pageX - canvas.offsetLeft;
      startPointY = e.pageY - canvas.offsetTop;
    }

    function draw(e) {
      if (isDrawing === true) {
        let x = e.pageX - canvas.offsetLeft;
        let y = e.pageY - canvas.offsetTop;
        // let x = e.pageX - canvas.offsetLeft;
        // let y = e.pageY - canvas.offsetTop;

        // if (rgba[0] === 255 && rgba[1] === 0 && rgba[2] === 0) {
        //   if (drawingResult === -1 || drawingResult === 1) {
        //     drawingResult = 0;
        //   }
        // } else if (rgba[0] === 0 && rgba[1] === 255 && rgba[2] === 0) {
        //   if (drawingResult === -1 || drawingResult !== 0) {
        //     drawingResult = 1;
        //   }
        // }

        // console.log(drawingResult);

        context.lineTo(x, y);
        context.stroke();
      }
    }

    function stopDrawing(e) {
      isDrawing = false;
      // endPointX = e.pageX - canvas.offsetLeft;
      // endPointY = e.pageY - canvas.offsetTop;

      // console.log(calculateRedLine());
      // console.log(calculateWhiteDots());

      let totalRed = calculateRedLine();
      let totalWhite = calculateWhiteDots();

      if (totalRed < 800 && totalRed > 500 && totalWhite < (455 * 40) / 100) {
        checkDrawingResult = true;
      } else {
        checkDrawingResult = false;
      }

      if (drawingResult === 1) {
        checkDrawingResult = true;
      } else if (drawingResult === 0) {
        checkDrawingResult = false;
      }

      // console.log(checkDrawingResult);
      // document.getElementById("result").innerHTML =
      //   "Result: " +
      //   checkDrawingResult +
      //   "<br />Start Point: (" +
      //   startPointX +
      //   ", " +
      //   startPointY +
      //   ")<br />End Point: (" +
      //   endPointX +
      //   ", " +
      //   endPointY +
      //   ")";

      document.getElementById("result").innerHTML =
        "Result: " + checkDrawingResult;

      drawingResult = -1;

      // Clear drawed line
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawInitial();
    }

    drawInitial();

    // console.log(calculateWhiteDots());
  };

  return (
    <>
      <div className="App">
        <canvas id="canvas" />
        {/* <div className="canvasContainer">
          <canvas id="canvas" />
        </div> */}
        <div id="result" />
      </div>
    </>
  );
}

export default App;
