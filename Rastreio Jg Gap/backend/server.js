const express = require('express');
const authRoutes = require('./routes/authRoutes');
const trackingRoutes = require('./routes/trackingRoutes');
const app = express();

app.use(express.json());
app.use('/auth', authRoutes);
app.use('/tracking', trackingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
