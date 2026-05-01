import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import leetcodeRouter from './routes/leetcode';
import codechefRouter from './routes/codechef';
import codeforcesRouter from './routes/codeforces';
import gfgRouter from './routes/gfg';
import atcoderRouter from './routes/atcoder';
import contestsRouter from './routes/contests';
import codolioRouter from './routes/codolio';
import powerlevelRouter from './routes/powerlevel';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*', // For dev, allow all. Update in prod.
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Basic Route
app.get('/', (req, res) => {
  res.send('Codolio MERN Backend is running');
});

// API Routes
app.use('/api/leetcode', leetcodeRouter);
app.use('/api/codechef', codechefRouter);
app.use('/api/codeforces', codeforcesRouter);
app.use('/api/gfg', gfgRouter);
app.use('/api/atcoder', atcoderRouter);
app.use('/api/contests', contestsRouter);
app.use('/api/codolio', codolioRouter);
app.use('/api/powerlevel', powerlevelRouter);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Database Connection (Optional until configured)
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('No MONGODB_URI provided in .env. Skipping database connection for now.');
}
