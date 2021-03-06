//-------------------------------------------//
//setup logger
//-------------------------------------------//
import ILogger from "./ILogger";

let winston = require('winston');

let logLevels =
{
	levels :
	{
		fatal 	: 0,
		error 	: 1,
		warn  	: 2,
		verbose : 3,
		debug 	: 4,
		info	: 5
	},
	colors :
	{
		debug  : 'cyan',
		verbose: 'white',
		info   : 'green',
		warn   : 'yellow',
		error  : 'red',
		fatal  : 'red'
	}
};

let logger: ILogger = new (winston.Logger)
({
	levels           : logLevels.levels,
	level            : 'info',				//the default level
	handleExceptions : true,
	transports :
	[
		new (winston.transports.Console)
		({
			level            : 'info',
			levels           : logLevels.levels,
			handleExceptions : true,
			humanReadableUnhandledException : true,
			colorize         : true,
			colors			 : logLevels.colors
		}),
		new (winston.transports.File)
		({
			level			 : 'info',
			levels			 : logLevels.levels,
			handleExceptions : true,
			filename		 : 'logfile.txt',
			colors			 : logLevels.colors
		})
	]
});

winston.addColors(logLevels.colors);

//------------------------------------------//
export default logger;
