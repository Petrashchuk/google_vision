import mongoose from 'mongoose';
import config from 'config';

function configureMongo() {
  const mongoUrl = config.get('mongoDB_url');

  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: false,
      useFindAndModify: true,
    })
    .then(() => console.log('Connected to the database!'))
    .catch(err => console.error('Cannot connect to the database!', err));
}

export default configureMongo;
