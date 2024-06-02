import config from '@/config';
import log from '@/utils/log';
import mongoose from 'mongoose';

const connect = (): Promise<boolean> => {
  return new Promise(async (resolve) => {
    try {
      await mongoose.connect(config.mongodb_uri);
      log('ready', 'Connected to MongoDB');
      resolve(true);
    } catch (error) {
      log('error', 'Error connecting to MongoDB: ' + (error as Error).message);
      console.error(error);
      resolve(false);
    }
  })
};
export default connect;