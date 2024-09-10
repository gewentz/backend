const express = require ('express');
const dotenv = require ('dotenv');
const cors = require ('cors');

const connectDB = require ('./config/db.js');
const authRoutes = require ('./routes/authRoutes.js');
const clientsRoutes = require ('./routes/clientsRoutes.js');
const toDoRoutes = require ('./routes/toDoRoutes.js');

dotenv.config();
connectDB();

const app = express();
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.options('*', cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/clients', clientsRoutes);
app.use('/toDo', toDoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
