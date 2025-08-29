const { Kafka } = require('kafkajs');

const brokers = ['localhost:9093'];
console.log('📡 Brokers being used:', brokers);

// Kafka setup
const kafka = new Kafka({
    clientId: 'pg-stream-app',
    brokers
});

const consumer = kafka.consumer({ groupId: 'pg-consumer-group' });

async function run() {
    try {
        await consumer.connect();
    } catch (error) {
        console.error('❌ Error connecting to Kafka:', error);
    }


    // Replace with your actual Debezium topic name
    const topic = 'testdb-server.public.users';
    await consumer.subscribe({ topic, fromBeginning: true });

    console.log(`✅ Listening to changes on topic: ${topic}`);

    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const event = message.value.toString();
            const parsed = JSON.parse(event);

            //console.log('🟡 Event received:', JSON.stringify(parsed, null, 2));

            // You can process based on operation type
            const op = parsed.payload?.op;
            const after = parsed.payload?.after;
            const before = parsed.payload?.before;

            if (op === 'c') {
                console.log('🟢 New record inserted:', after);
            } else if (op === 'u') {
                console.log('🟠 Record updated:', after);
            } else if (op === 'd') {
                console.log('🔴 Record deleted:', before);
            }
        }
    });
}

run().catch("error:::::", console.error);