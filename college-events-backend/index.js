const fs = require('fs');
const path = require('path');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

const envPath = (() => {
  const primary = path.join(__dirname, '..', '.env');
  const fallback = path.join(__dirname, '..', 'admin.env');
  if (fs.existsSync(primary)) return primary;
  return fallback;
})();

dotenv.config({ path: envPath });

const eventsRouter = require('./routes/events');
const savedRouter = require('./routes/saved');
const remindersRouter = require('./routes/reminders');

const app = express();
app.use(cors());
app.use(express.json({ limit: '1mb' }));

app.get('/health', (req, res) => {
  return res.json({ status: 'ok' });
});

app.use('/api', eventsRouter);
app.use('/api', savedRouter);
app.use('/api', remindersRouter);

// 404 handler
app.use((req, res) => {
  return res.status(404).json({ error: 'Not Found' });
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const status = typeof err.status === 'number' ? err.status : 500;
  const message = err?.message || 'Internal Server Error';
  return res.status(status).json({ error: message });
});

const PORT = Number(process.env.PORT || 4000);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend listening on port ${PORT}`);
});

