/* eslint-disable prettier/prettier */
import Consumer from 'App/KafkaServices/Consumer';

const consumer = new Consumer({ groupId: 'api-group' });
consumer.consume({ topic: 'new-transaction', fromBeginning: false });
