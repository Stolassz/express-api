import routes from './routes/index.js'
import express from 'express';

const app = express();
app.use(express.json());
app.get('/', (req, res) => res.json({ status: 'ok' }));
app.use('/api', routes)

export default app;