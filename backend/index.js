const app = require('./src/config/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`HRM Backend API is running on http://localhost:${PORT}`);
});

