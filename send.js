const { SinchClient } = require('@sinch/sdk-core');

const sinchClient = new SinchClient({
    projectId: "XXX",
    keyId: "YYY",
    keySecret: "ZZZZ"
});

async function run(){
    const response = await sinchClient.conversation.messages.send({
        sendMessageRequestBody: {
            app_id: "APP",
            recipient: {
                identified_by: {
                    channel_identities: [
                        {
                            channel: "SMS",
                            identity: "46XXXXXXXXX"
                        }
                    ]
                }
            },
            message: {
                text_message: {
                    text: "This is a test message using the Sinch Node.js SDK"
                }
            },
            channel_properties: {
                SMS_SENDER: "YOUR_sms_sender"
            }
        }
    });

    console.log(JSON.stringify(response));
}
run();