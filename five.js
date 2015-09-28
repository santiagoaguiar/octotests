var five = require("johnny-five");

var board = five.Board();
var toggle = false;
board.on("ready", function() {
	led = new five.Led(13);
	led.blink(500);
});

