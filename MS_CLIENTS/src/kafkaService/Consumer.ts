import { Kafka, Consumer as KafkaConsumer } from 'kafkajs';
import CreateClientService from '../services/CreateClientService';

interface IConsumeProps {
  topic: string;
  fromBeginning: boolean;
}

export default class Consumer {
  private consumer: KafkaConsumer;

  constructor(groupId: string) {
    const kafka = new Kafka({
      brokers: ['kafka:29092'],
    });

    this.consumer = kafka.consumer({ groupId });
  }

  public async consume({ topic, fromBeginning }: IConsumeProps): Promise<void> {
    await this.consumer.connect();
    await this.consumer.subscribe({ topic, fromBeginning });

    console.log('Iniciando busca...');

    await this.consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const value = message.value?.toString();

        console.log({
          topic,
          value,
        });

        if (value) {
          if (topic === 'create-client') this.createClient(value);
        }
      },
    });
  }

  async createClient(value) {
    const data = JSON.parse(value);

    const service = new CreateClientService();

    const client = await service.execute(data);

    console.log('client', client);
  }
}
