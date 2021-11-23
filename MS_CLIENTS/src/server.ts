import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import Consumer from './kafkaService/Consumer';
import { createConnection } from 'typeorm';
import { router } from './routes';

const consumer = new Consumer('lubycash-group');
consumer.consume({ topic: 'create-client', fromBeginning: false });

createConnection();
const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(3334, () => console.log('MS_CLIENTS running'));
