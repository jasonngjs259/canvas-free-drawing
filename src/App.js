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

        context.lineTo(x, y);
        context.stroke();
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
