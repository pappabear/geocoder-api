'use strict'

exports.check_for_pulse = function(req, res) {
	var pulse = {"hello":"heroku"}
	res.json(pulse)
}

exports.get_geocode_data = function(req, res) {

	const request = require('superagent')

//	console.log("--------------------------------")
//	console.log("Entering the node.js geocoder...")
//	console.log("Requested address is " + req.body.address)
//	console.log("Initiating call to FFIEC...")

	//var jsonToSend = "{sSingleLine:'" + req.body.address + "', iCensusYear:'2017'}"
	var jsonToSend = "{sSingleLine:'" + req.query.address + "', iCensusYear:'2017'}"
	var ffiec = {}
	var d = {}
	var returnPayload = {}

	request
		.post("https://geomap.ffiec.gov/FFIECGeocMap/GeocodeMap1.aspx/GetGeocodeData")
	    .send( jsonToSend )
		.set("Content-Type", "application/json; charset=UTF-8")
		.set("Referer", "https://geomap.ffiec.gov/FFIECGeocMap/GeocodeMap1.aspx")
		.set("Accept", "application/json, text/javascript, */*; q=0.01")
		.set("Origin", "https://geomap.ffiec.gov")
		.set("X-Requested-With", "XMLHttpRequest")
	    .end((err2, res2) => {
            if (err2) 
			{
                //console.log('Geocoder API call failed!')
				//console.log(err2)
				returnPayload.source = "FFIEC"
				returnPayload.error = err2
				res.json(returnPayload)
            }
			else
			{
				//console.log('Geocoder API call succeeded!')
				//console.log(res2.body.d)
				returnPayload.source = "FFIEC"
				returnPayload.originalAddress = req.query.address  //req.body.address.trim() //res2.body.d.sMatchAddr.trim()
			    returnPayload.address = res2.body.d.sAddress.trim()
			    returnPayload.city = res2.body.d.sCityName.trim()
			    returnPayload.countyCode = res2.body.d.sCountyCode.trim()
			    returnPayload.countyName = res2.body.d.sCountyName.trim()
			    returnPayload.latitude = res2.body.d.sLatitude.trim()
			    returnPayload.longitude = res2.body.d.sLongitude.trim()
			    returnPayload.msaCode = res2.body.d.sMSACode.trim()
			    returnPayload.msaName = res2.body.d.sMSAName.trim()
			    returnPayload.stateAbbr = res2.body.d.sStateAbbr.trim()
			    returnPayload.stateCode = res2.body.d.sStateCode.trim()
			    returnPayload.stateName = res2.body.d.sStateName.trim()
			    returnPayload.tract = res2.body.d.sTractCode.trim()
			    returnPayload.zip = res2.body.d.sZipCode.trim()
				res.json(returnPayload)
			}
		})
}