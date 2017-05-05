import eddystoneBeacon from "eddystone-beacon"

import configLoader from "./config"

/**
* Start a Eddystone beacon
*/
async function beacon( config){
	config= config|| configLoader
	if( config instanceof Function){
		config= config()
	}
	config= await config
	var options= {
		name: config.beaconName,
		txPowerLevel: config.txPowerLevel,
		tlmCount: config.tlmCount,
		tlmPeriod:config.tlmPeriod
	}
	var beacon= eddystoneBeacon.advertiseUrl(config.beaconUrl, options)
	return beacon
}
