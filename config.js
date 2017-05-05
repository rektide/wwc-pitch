#!/usr/bin/env node

function filterEmpty(o){
	for( var i in o){
		if( o[ i]=== undefined){
			delete o[ i]
		}
	}
	return o
}

export const prefix= function(){
	return process.env.WWC_PITCH_PREFIX|| "WWC_PITCH:WWC"
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
	var composed= Object.assign.apply( Object, prefixes)
	return filterEmpty( composed)
}

export const env= function(prefix){
	function get(name){
		var key= prefix+ "_"+ name.toUpperCase()
		return process.env[ key]
	}
	return filterEmpty({
		beaconUrl: get( "beacon_url"),
		beaconName: get( "beacon_name"),
		txPowerLevel: get( "beacon_tx_power_level"),
		tlmCount: get( "beacon_tlm_count"),
		tlmPeriod: get("beacon_tlm_period")
	})
}

export const defaults= function(){
	return {
		url: "https://yoyodyne.net"
	}
}

export const all = async function(){
	const [_envs, _defaults]= await Promise.all([envs(), defaults()])
	return Object.assign({}, _envs, _defaults)
}

const singleton = all()
export default singleton

export const main = async function(){
	singleton.then(console.log)
}

if( typeof require!== "undefined"&& require.main=== module){
	main()
}
