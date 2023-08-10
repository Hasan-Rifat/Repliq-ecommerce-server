/* eslint-disable no-console */
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { config } from './config';

process.on('uncaughtException', error => {
  console.error(error);
  process.exit(1);
});

let server: Server;

async function db() {
  try {
    await mongoose.connect(config.database_url as string);
    console.log('database connected');

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.error('failed to connect to database', error);
  }

  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        console.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

db();
