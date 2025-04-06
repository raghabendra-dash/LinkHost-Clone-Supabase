import express from 'express';
import bcrypt from 'bcryptjs';
import { authenticateToken, generateToken } from '../middleware/auth.js';
import { ValidationError, NotFoundError } from '../middleware/errorHandler.js';

const router = express.Router();

const users = [];

router.post('/register', async (req, res, next) => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName || !lastName) {
      throw new ValidationError('All fields are required');
    }

    if (users.find(u => u.email === email)) {
      throw new ValidationError('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      firstName,
      lastName
    };

    users.push(user);

    const token = generateToken(user);

    res.status(201).json({
      user: { id: user.id, email: user.email, firstName, lastName },
      token
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new ValidationError('Email and password are required');
    }

    const user = users.find(u => u.email === email);
    if (!user) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedError('Invalid credentials');
    }

    const token = generateToken(user);

    res.json({
      user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName },
      token
    });
  } catch (error) {
    next(error);
  }
});

router.get('/profile', authenticateToken, (req, res, next) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    next(error);
  }
});

router.put('/profile', authenticateToken, async (req, res, next) => {
  try {
    const user = users.find(u => u.id === req.user.id);
    if (!user) {
      throw new NotFoundError('User not found');
    }

    const { firstName, lastName } = req.body;
    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;

    res.json({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName
    });
  } catch (error) {
    next(error);
  }
});

export default router;