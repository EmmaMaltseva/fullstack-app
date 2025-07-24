import express from 'express';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api', userRoutes);

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Привет с бэкенда!'});
});

const PORT = 4000;
app.listen(PORT, () => {
   console.log(`🚀 Бэк запущен на адресе http://localhost:${PORT}`);
});
