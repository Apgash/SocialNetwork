import express from 'express';
import mongoose from 'mongoose';
import app from './app';

const PORT = process.env.PORT || 3001;
const MONGODB_URI = 'mongodb://localhost:27017/socialNetworkDB';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});