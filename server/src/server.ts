import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { Show, User } from './model';

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());

mongoose.connect(`${process.env.MONGO_URI}/InfSus`).then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

const userSchema = new mongoose.Schema<User>();
const showSchema = new mongoose.Schema<Show>();

const Users = mongoose.model('Users', userSchema);
const Shows = mongoose.model('Shows', showSchema);

app.get('/shows', (req, res) => {

});

app.get('/shows/top-rated', (req, res) => {

});

app.get('/profile', (req, res) => {

});

app.post('/login', (req, res) => {

});

app.post('/register', (req, res) => {

});

app.listen(process.env.PORT, () => {
	console.log(`bok port ${process.env.PORT}`);
});


