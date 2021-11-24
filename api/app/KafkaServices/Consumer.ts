/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import RegisterTransactionService from 'App/services/RegisterTransactionService';
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
      eachMessage: async ({ topic, message }) => {
        const value = message.value?.toString();

        console.log({
          topic,
          value,
        });

        if (value) {
          if (topic === 'new-transaction') this.registerTransaction(value);
        }
      },
    });
  }

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  async registerTransaction(value: string) {
    const data = JSON.parse(value);
    const service = new RegisterTransactionService();
    const transaction = await service.execute(data);
  }
}
