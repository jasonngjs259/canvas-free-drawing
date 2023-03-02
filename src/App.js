import "./App.css";

function App() {
  var canvas;
  var context;
  var isDrawing = false;

  window.onload = function () {
    canvas = document.getElementById("canvas");
    context = canvas.getContext("2d");
    canvas.width = 1000;
    canvas.height = 900;
    context.strokeStyle = "#913d88";
    context.lineWidth = 10;

    context.fillStyle = "red";
    context.fillRect(0, 0, 800, 500);
    context.fillStyle = "lime";
    context.fillRect(400, 0, 100, 500);

    canvas.onmousedown = startDrawing;
    canvas.onmouseup = stopDrawing;
    canvas.onmousemove = draw;

    function startDrawing(e) {
      isDrawing = true;
      context.beginPath();
      context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
    }

    function draw(e) {
      if (isDrawing === true) {
        var x = e.pageX - canvas.offsetLeft;
        var y = e.pageY - canvas.offsetTop;

        var rgba = context.getImageData(x, y, 1, 1).data;

        if (rgba[0] === 255 && rgba[1] === 0 && rgba[2] === 0) {
          console.log(false);
        } else if (rgba[0] === 0 && rgba[1] === 255 && rgba[2] === 0) {
          console.log(true);
        }

        context.lineTo(x, y);
        context.stroke();
      } else {
        var x = e.clientX;
        var y = e.clientY;

        var rgba = context.getImageData(x, y, 1, 1).data;
        // console.log(rgba[0], rgba[1], rgba[2]);
      }
    }

    function stopDrawing() {
      isDrawing = false;

      // Clear drawed line
      // context.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div className="App">
      <canvas id="canvas"></canvas>
    </div>
  );
}

export default App;
