/* eslint-disable prettier/prettier */
import { Consumer as KafkaConsumer, Kafka } from 'kafkajs';

export default class GetClientsService {
  public async execute(): Promise<string | undefined> {
    const kafka = new Kafka({
      brokers: ['kafka:29092'],
    });

    const consumer = kafka.consumer({ groupId: 'outro' });

    await consumer.connect();
    await consumer.subscribe({ topic: 'test', fromBeginning: false });

    let value: string = '';
    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        if (message.value) value = message.value?.toString();

        console.log({
          topic,
          value,
        });
      },
    });

    if (value) return value;
  }
}
