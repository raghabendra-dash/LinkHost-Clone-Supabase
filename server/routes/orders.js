import express from 'express';

const router = express.Router();


const orders = [];

router.get('/', (req, res) => {
  const userOrders = orders.filter(order => order.userId === req.user.id);
  res.json(userOrders);
});

router.post('/', (req, res) => {
  const order = {
    id: Date.now().toString(),
    userId: req.user.id,
    ...req.body,
    status: 'new',
    createdAt: new Date()
  };

  orders.push(order);
  res.status(201).json(order);
});

router.get('/:id', (req, res) => {
  const order = orders.find(o => o.id === req.params.id && o.userId === req.user.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
});

export default router;