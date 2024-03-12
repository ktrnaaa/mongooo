import mongoose from "mongoose";    

const connectUrl = 'mongodb://localhost:27017/test';
await mongoose.connect(connectUrl)
    .then(() => console.log('Mongo connected'));