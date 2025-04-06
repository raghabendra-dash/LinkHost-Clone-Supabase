import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import authRoutes from './routes/auth.js';
import marketplaceRoutes from './routes/marketplace.js';
import ordersRoutes from './routes/orders.js';
import { errorHandler } from './middleware/errorHandler.js';
import { authenticateToken } from './middleware/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());


app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON' });
  }
  next();
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', (req, res, next) => {
  try {
    authRoutes(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use('/api/marketplace', authenticateToken, (req, res, next) => {
  try {
    marketplaceRoutes(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use('/api/orders', authenticateToken, (req, res, next) => {
  try {
    ordersRoutes(req, res, next);
  } catch (error) {
    next(error);
  }
});

app.use(express.static(join(__dirname, '../dist')));

app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});