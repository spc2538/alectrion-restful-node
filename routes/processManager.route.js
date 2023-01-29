'use strict';
module.exports = function(app){
    var processManagerService = require('../services/processManager.service');
    app.group('/api/process-manager', (router) => {
        router.get('/', function(req, res, next) {
            let response = processManagerService.getRecords();
            try {
                res.status(200) 
                    .json({
                        status: 200,
                        data: response,
                        message: "API Completada",
                        respuesta: true,
                    });
            } catch(err) {
                console.error(`Error while getting quotes `, err.message);
                return res.status(200)
                    .json({
                        status: 200,
                        message: "Error servicio",
                        response: false
                    });
            }
        });

        router.post('/', async function(req, res, next) {
            const service_name = req.body.service_name;
            const service_status = req.body.service_status;
            if(
                service_name == "" || service_name == null || service_name == undefined ||
                service_status == "" || service_status == null || service_status == undefined
            )
                return res.status(200)
                    .json({
                        status: 200,
                        message: "Error de validacion",
                        response: false
                    });

            let response = await processManagerService.insertRecord(service_name, service_status);
            try {
                res.status(200)
                    .json({
                        status: 200,
                        message: response,
                        respuesta: true,
                    });
            } catch(err) {
                console.error(`Error while getting quotes `, err.message);
                return res.status(200)
                    .json({
                        status: 200,
                        message: "Error servicio",
                        response: false
                    });
            }
        });

        router.put('/', function(req, res, next) {
            const record_id = req.body.record_id;
            const service_name = req.body.service_name;
            const service_status = req.body.service_status;

            if(
                service_name == "" || service_name == null || service_name == undefined ||
                service_status == "" || service_status == null || service_status == undefined ||
                record_id == "" || record_id == null || record_id == undefined
            )
                return res.status(200)
                    .json({
                        status: 200,
                        message: "Error de validacion",
                        response: false
                    });

            let response = processManagerService.updateRecord(record_id, service_name, service_status);
            try {
                res.status(200)
                    .json({
                        status: 200,
                        message: response,
                        respuesta: true,
                    });
            } catch(err) {
                console.error(`Error while getting quotes `, err.message);
                return res.status(200)
                    .json({
                        status: 200,
                        message: "Error servicio",
                        response: false
                    });
            }
        });

        router.delete('/', function(req, res, next) {
            const record_id = req.body.record_id;
            if(record_id == "" || record_id == null || record_id == undefined)
                return res.status(200)
                    .json({
                        status: 200,
                        message: "Error de validacion",
                        response: false
                    });

            let response = processManagerService.deleteRecord(record_id);
            try {
                res.status(200)
                    .json({
                        status: 200,
                        message: response,
                        respuesta: true,
                    });
            } catch(err) {
                console.error(`Error while getting quotes `, err.message);
                return res.status(200)
                    .json({
                        status: 200,
                        message: "Error servicio",
                        response: false
                    });
            }
        });
    });
}