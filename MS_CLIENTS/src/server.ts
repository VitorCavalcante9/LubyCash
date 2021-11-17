import 'reflect-metadata';
import express from 'express';
import cors from 'cors';
import Consumer from './kafkaService/Consumer';
import { createConnection } from 'typeorm';

const consumer = new Consumer('lubycash-group');

createConnection();
const app = express();

app.use(cors());
app.use(express.json());

app.listen(3334, () => console.log('MS_CLIENTS running'));
