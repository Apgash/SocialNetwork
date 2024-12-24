import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/userRoutes';
import thoughtRoutes from './routes/thoughtRoutes';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/thoughts', thoughtRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

export default app;