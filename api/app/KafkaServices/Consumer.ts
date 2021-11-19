/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import { Consumer as KafkaConsumer, Kafka } from 'kafkajs';

interface IConsumer {
  groupId: string;
}

interface IConsume {
  topic: string;
  fromBeginning: boolean;
}

export default class Consumer {
  private consumer: KafkaConsumer;

  constructor({ groupId }: IConsumer) {
    const kafka = new Kafka({
      brokers: ['kafka:29092'],
    });

    this.consumer = kafka.consumer({ groupId });
  }

  public async consume({ topic, fromBeginning }: IConsume) {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning });

    console.log(`Consuming topic ${topic}`);
    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          topic,
          value: message.value?.toString(),
        });
      },
    });
  }
}
