import linuxBattery from "linux-battery"

var num= /(\d+\.\d+)(\s*m?V)?/

/**
* Parse the "7.622 V" voltage from battery into numerical mv
*/
function getMv( battery){
	if( !battery){
		return 0
	}
	var value= num.exec( battery.voltage)
	if( !value){
		return 0
	}
	var mv= Number.parseFloat( value[ 1])
	if( value[ 2][value[ 2].length- 2]!== "m"){
		mv*= 1000
	}
	return mv
}

INTERVAL= 10*1000

/**
* Start reporting battery level
*/
function battery( beacon){
	function report( mv){
		beacon.setBatteryVoltage( mv)
	}
	var handle= setInterval( _=> linuxBattery()
		.then(getMv)
		.then(report), INTERVAL)
	function stop(){
		clearInterval( handle)
	}
	return stop
}

export default battery
