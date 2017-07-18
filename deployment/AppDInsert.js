//AppD insert

var appDobj = {
	 controllerHostName: process.env['APPD_URL'],
	 controllerPort: 443, 
	 controllerSslEnabled: true,
	 accountName: process.env['APPD_ACCOUNT'],
	 accountAccessKey: process.env['APPD_KEY'],
	 applicationName: process.env['APPD_APP_NAME'],
	 tierName: process.env['APPD_APP_TIER'],
	 nodeName: 'process'
}
require("appdynamics").profile(appDobj);

//End AppD insert