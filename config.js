const path = require("path");
const config = {};
config.ROOT_DIRECTORY = __dirname + '/';
require("dotenv").config({ path: path.join(config.ROOT_DIRECTORY, ".env") });
config.ENVIRONMENT = process.env.ENVIRONMENT;
config.SERVICE_NAME = process.env.SERVICE_NAME;
config.SERVICE_ALIAS = config.ENVIRONMENT + '-' + config.SERVICE_NAME;
config.NODE_API_PORT = process.env.NODE_API_PORT;
config.PM2_LOGS =  config.ROOT_DIRECTORY + "logs/" + config.SERVICE_ALIAS + ".log";
config.MORGAN_LOGS = config.ROOT_DIRECTORY + "logs/" + config.SERVICE_ALIAS + "-requests.log";

/**
 * Swagger
 */

config.SWAGGER_URL_SECRET = '/' + process.env.SWAGGER_URL_SECRET;
config.SWAGGER_SERVER_DOC = process.env.SWAGGER_SERVER_DOC;
config.SWAGGER_URL = config.SWAGGER_URL_SECRET + '/' ;
config.SWAGGER_GUI = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: config.SERVICE_ALIAS  + " - API",
			version: "1.0.0",
			description: "API",
		},
		servers: [
			{
				url: config.SWAGGER_SERVER_DOC,
			},
		],
	},
	apis: ["./docs/processManager.api.yaml", ]
};

// config.MYSQL_HOST = process.env.MYSQL_HOST;
// config.MYSQL_USER = process.env.MYSQL_USER;
// config.MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
// config.MYSQL_DB = process.env.MYSQL_DB;

module.exports = config;
