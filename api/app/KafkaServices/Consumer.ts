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
      brokers: ['prova_kafka_1:29092'],
    });

    this.consumer = kafka.consumer({ groupId });
  }
}
