#!/usr/bin/env node

export const prefix= function(){
	return process.envs.WWC_PITCH_PREFIX|| "WWC_PITCH_:WWC_"
}

export const envs= function(prefixes){
	if( !prefixes){
		prefixes= prefix()
	}
	prefixes= prefixes
		.split( ":")
		.map( prefix=> env(prefix))
	prefixes.reverse()
	prefixes.unshift({})
	return Object.assign.apply( Object, prefixes)
}

export const env= function(prefix){
	function get(name){
		return process.env[ prefix+ "_"+ name.toUpperCase()]
	}
	return {
		beaconUrl: get( "beacon_url"),
		beaconName: get( "beacon_name"),
		txPowerLevel: get( "beacon_tx_power_level"),
		tlmCount: get( "beacon_tlm_count"),
		tlmPeriod: get("beacon_tlm_period")
	}
}

export const defaults= function(){
	return {
		url: "https://yoyodyne.net"
	}
}

export const all = async function(){
	const [envs, defaults]= await Promise.all([envs(), defaults()])
	return Object.assign({}, envs, defaults)
	//return Promise
	//	.all([envs(), defaults()])
	//	.then([ envs, defaults]=>
	//return envs().then( envs=> Object.assign({}, defaults, envs))
}

const singleton = all()
export default singleton

export const main = async function(){
	singleton.then(console.log)
}

if( typeof require!== "undefined"&& require.main=== module){
	main()
}
