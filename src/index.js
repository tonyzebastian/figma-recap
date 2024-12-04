require('dotenv').config();
const express = require('express');
const activityRouter = require('./routes/activity');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/activity', activityRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const cors = require('cors');
app.use(cors());