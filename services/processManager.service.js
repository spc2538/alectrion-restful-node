const db = require("../utils/SqliteClient");
const firebaseAdmin = require("../utils/FirebaseAdmin");

module.exports = {
    getRecords: getRecords,
    insertRecord: insertRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
}

function verifyDay(){
    const MORNING_HOUR = 8;
    const EVENING_HOUR = 20;
    const dateNow = new Date();
    const hours = dateNow.getHours();
    if(hours >= MORNING_HOUR && hours <= EVENING_HOUR){
        return true;
    }else{
        return false;
    }
}

function findRecord(record_id){
    const recordID = db.query(`SELECT id FROM process_manager WHERE id=?`, [record_id]);
    return recordID;
}

function getRecords() {
    const data = db.query(`SELECT * FROM process_manager`, []);
    return data;
}

async function insertRecord(service_name, service_status) {
    let message = "Test notification send";
    if (service_name == "pm2 service 1"){
        console.log('Test notification');
        try {
            const channelName = "test";
            await firebaseAdmin.sendFCMNotification(channelName, service_name, service_status);
        } catch (error) {
            console.log(error);
        }
    } else {
        const sqlString = `
        INSERT INTO process_manager (service_name, service_status) 
        VALUES (@service_name, @service_status)
        `;
        const result = db.run(sqlString, {service_name, service_status});
        message = 'Error in creating record';
        if (result.changes) {
            message = 'Record created successfully';
        }

        if (verifyDay()){
            try {
                const channelName = "alectrion";
                await firebaseAdmin.sendFCMNotification(channelName, service_name, service_status);
            } catch (error) {
                console.log(error);
            }        
        }    
    }

    
    
    
    return message;
}

function updateRecord(record_id, service_name, service_status) {
    let recordID = findRecord(record_id);
    if (!recordID.length) {
        return 'Error in finding record';
    }
    const sqlString = `
        UPDATE process_manager 
        SET service_name = ?, service_status = ? WHERE id = ?
    `;
    const result = db.run(sqlString, [service_name, service_status, record_id]);
    if (result.changes) {
        message = 'Record updated successfully';
    }
    return message;
}

function deleteRecord(record_id) {
    let recordID = findRecord(record_id);
    if (!recordID.length) {
        return 'Error in finding record';
    }
    const result = db.run('DELETE FROM process_manager WHERE id = ?', [record_id]);
    if (result.changes) {
        message = 'Record deleted successfully';
    }
    return message;
}
