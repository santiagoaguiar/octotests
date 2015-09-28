import meshblu from 'meshblu';
import request from 'request';
import * as five from 'johnny-five';

// Check Meshblu status
export function status() {
	request('http://meshblu.octoblu.com/status', (error, response, body) => {
		if (!error && response.statusCode == 200) {
        	console.log(body);
	    }
	})
}

export function pabloDuino() {
	var conn = meshblu.createConnection({
		"uuid": "492659be-b7ce-4699-b7ba-81ba9c276ac3",
		"token": "8e1bbc4dc0fa863696b166157e4980e6e9d29f41",
    	"server": "meshblu.octoblu.com",
    	"port": 80
	});

	conn.on('notReady', function(data){
	    console.log('UUID FAILED AUTHENTICATION!');
	    console.log(data);
	});	

	conn.on('ready', function(data){
	    console.log('UUID AUTHENTICATED!');
	    console.log(data);
	    five.Board().on('ready', function(){
		    console.log('Board ready');

		    var led = new five.Led(13);	 		
		    conn.on('message', function(data){
	            console.log('message received', data);
	            var payload = typeof data.payload === "string" ? JSON.parse(data.payload) : data.payload;
	            if(payload.led == true){
	                led.on();
	            } else {
	                led.off();
				}
	        });
		});
	});
}

export function ig_alljoyn() {
	var conn = meshblu.createConnection({
		"uuid": "642ea17b-f307-4863-b170-f57555277980",
		"token": "38f822cbc9e43739abe8d964424c6f4082b8cbff",
    	"server": "meshblu.octoblu.com",
    	"port": 80
	});

	conn.on('notReady', function(data){
	    console.log('UUID FAILED AUTHENTICATION!');
	    console.log(data);
	});	

	conn.on('ready', function(data){
	    console.log('UUID AUTHENTICATED!');
	    console.log(data);
	    
	});
}