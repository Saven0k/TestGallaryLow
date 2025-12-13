import express from 'express';
import cookieParser from 'cookie-parser';

import artistRoutes from './routes/artist.routes';
import paintingRoutes from './routes/painting.routes';
import genreRoutes from './routes/genre.routes';
import exhibitionRoutes from './routes/exhibition.routes';
import guestRoutes from './routes/guest.routes';
import authRoutes from './routes/auth.routes';





const app = express();
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/backend/artists', artistRoutes);
app.use('/backend/paintings', paintingRoutes);
app.use('/backend/genres', genreRoutes);
app.use('/backend/exhibitions', exhibitionRoutes);
app.use('/backend/guests', guestRoutes);


app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});


app.use('*', (req, res) => {
  res.status(404).json({ error: 'Путь не найден' });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 API available at http://localhost:${PORT}/api`);
  console.log(`🔐 Auth endpoints available at http://localhost:${PORT}/api/auth`);
});