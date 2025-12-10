const connectToMongo = require("./db");
connectToMongo();

const express = require('express');
const app = express();

// Import CORS
const cors = require('cors');

// IMPORTANT: Dynamic port for Render / cloud hosting
const port = process.env.PORT || 5000;

// ✅ Add allowed origins here
const allowedOrigins = [
  "http://localhost:3000",              // local frontend
  "https://yashrxx.github.io",          // GitHub Pages domain
  "https://yashrxx.github.io/i-note",   // project path
];

// CORS CONFIG
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like POSTMAN, mobile apps)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error("Not allowed by CORS: " + origin));
    }
  },
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`inote backend listening on port ${port}`);
});