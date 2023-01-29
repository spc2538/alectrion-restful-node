const db = require("../utils/SqliteClient")
module.exports = {
    getRecords: getRecords,
    insertRecord: insertRecord,
    updateRecord: updateRecord,
    deleteRecord: deleteRecord,
}

function findRecord(record_id){
    const recordID = db.query(`SELECT id FROM test WHERE id=?`, [record_id]);
    return recordID;
}

function getRecords() {
    const data = db.query(`SELECT * FROM test`, []);
    return data;
}

function insertRecord(field_test) {
    const result = db.run('INSERT INTO test (field_test) VALUES (@field_test)', {field_test});
    let message = 'Error in creating record';
    if (result.changes) {
        message = 'Record created successfully';
    }
    return message;
}

function updateRecord(record_id, field_test) {
    let recordID = findRecord(record_id);
    if (!recordID.length) {
        return 'Error in finding record';
    }
    const result = db.run('UPDATE test SET field_test = ? WHERE id = ?', [field_test, record_id]);
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
    const result = db.run('DELETE FROM test WHERE id = ?', [record_id]);
    if (result.changes) {
        message = 'Record deleted successfully';
    }
    return message;
}
