'use strict';
module.exports = function(app){
    var testService = require('../services/test.service');
    app.group('/api/test', (router) => {
        router.get('/', function(req, res, next) {
            let response = testService.getRecords();
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
                next(err);
            }
        });

        router.post('/', function(req, res, next) {
            const field_test = req.body.field_test;
            if(field_test == "" || field_test == null || field_test == undefined)
                return res.status(200)
                    .json({
                        status: 200,
                        message: "Error de validacion",
                        response: false
                    });

            let response = testService.insertRecord(field_test);
            try {
                res.status(200)
                    .json({
                        status: 200,
                        message: response,
                        respuesta: true,
                    });
            } catch(err) {
                console.error(`Error while getting quotes `, err.message);
                next(err);
            }
        });

        router.put('/', function(req, res, next) {
            const record_id = req.body.record_id;
            const field_test = req.body.field_test;
            if(record_id == "" || record_id == null || record_id == undefined ||
               field_test == "" || field_test == null || field_test == undefined )
                return res.status(200)
                    .json({
                        status: 200,
                        message: "Error de validacion",
                        response: false
                    });

            let response = testService.updateRecord(record_id, field_test);
            try {
                res.status(200)
                    .json({
                        status: 200,
                        message: response,
                        respuesta: true,
                    });
            } catch(err) {
                console.error(`Error while getting quotes `, err.message);
                next(err);
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

            let response = testService.deleteRecord(record_id);
            try {
                res.status(200)
                    .json({
                        status: 200,
                        message: response,
                        respuesta: true,
                    });
            } catch(err) {
                console.error(`Error while getting quotes `, err.message);
                next(err);
            }
        });
    });
}