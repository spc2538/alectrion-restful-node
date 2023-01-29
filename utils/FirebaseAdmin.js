const admin = require("firebase-admin");
const serviceAccount = require("../firebase.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = {
    sendFCMNotification: sendFCMNotification
}
async function sendFCMNotification(channelName, serviceMessage, serviceStatus) {
    let status = false;
    const data = {
        name: channelName,
        message: serviceMessage,
        status: serviceStatus
    }
    const message = {
        data: {
            title: JSON.stringify(data),
            android_channel_id: channelName,
        },
        topic: "alectrion"
    };
    try {
        await admin.messaging().send(message)
        status = true;
        console.log(`Notification send: ${serviceMessage}, ${serviceStatus}`);
    } catch (e) {
        console.log("Notification error \n\t");
        console.log(e);
        status = false;
    }
    return status;
}