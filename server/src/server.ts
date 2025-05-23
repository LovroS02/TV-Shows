import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { Review, Show, User } from './model';
import bcrypt from 'bcrypt';

dotenv.config();

const corsOptions = {
	origin: ['http://localhost:3000', 'http://localhost:8080'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(`${process.env.MONGO_URI}`).then(() => console.log('MongoDB Connected'))
	.catch(err => console.log(err));

const userSchema = new mongoose.Schema<User>({
	idUser: { type: Number, required: true },
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, required: true },
}, { versionKey: false });

const showSchema = new mongoose.Schema<Show>({
	idShow: { type: Number, required: true },
	title: { type: String, required: true },
	details: {
		author: { type: String, required: true },
		genre: { type: String, required: true },
		release_date: { type: String, required: true },
		description: { type: String, required: true },
		image: { type: String, required: true },
	},
	reviews: { type: Array(), required: true },
}, { versionKey: false });

const Users = mongoose.model('Users', userSchema, 'Users');
const Shows = mongoose.model('Shows', showSchema, 'Shows');

app.get('/', (req, res) => {
	res.send('Welcome');
});

app.get('/shows', async (req, res) => {
	try {
		const shows = await Shows.find();
		res.status(200).json({ shows: shows });
	} catch (err) {
		res.status(500).json({ message: 'Error fetching shows' });
	}
});

app.get('/users', async (req, res) => {
	try {
		const users = await Users.find();
		res.status(200).json({ users: users });
	} catch (err) {
		res.status(500).json({ message: 'Error fetching users' });
	}
});

app.get('/users/count', async (req, res) => {
	try {
		const count = await Users.countDocuments();
		res.status(200).json({ count: count });
	} catch (err) {
		res.status(500).json({ error: 'Error counting users' });
	}
});

app.get('/profile', (req, res) => {

});

app.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const user = await Users.findOne({ email });
	if (user) {
		const hashedPassword = user.password;
		const isMatch = bcrypt.compare(password, hashedPassword);
		if (!isMatch) {
			res.status(400).json({ message: 'Wrong email or password' });
		}

		res.status(201).json({ message: 'Successful login!' });
	} else {
		res.status(401).json({ message: 'Wrong email or password' });
	}
});

app.post('/register', async (req, res) => {
	let count = 0;

	try {
		const response = await fetch('http://localhost:8080/users/count', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (!response.ok) {
			const errorRes = await response.json();
			console.error(errorRes.error);
			res.status(500).json({ error: 'Error while getting users' });
		}

		const result = await response.json();
		count = result.count;
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error fetching user count' });
	}

	let hashedPassword;
	try {
		hashedPassword = await bcrypt.hash(req.body.password, 10);
	} catch (err) {
		console.error('Bcrypt error:', err);
		res.status(500).json({ error: 'Error hashing password' });
	}

	const newUser = {
		...req.body,
		idUser: count + 1,
		role: 'user',
		password: hashedPassword,
	};

	try {
		const userDoc = new Users(newUser);
		await userDoc.save();
		res.status(201).json({ message: 'Registration successful' });
	} catch (err) {
		console.error('DB error:', err);
		res.status(500).json({ error: 'Error saving user' });
	}
});

app.post('/shows/:idShow/reviews', async (req, res) => {
	try {
		const { idShow } = req.params;
		const { review } = req.body;
		const show = await Shows.findOne({ idShow: parseInt(idShow) });

		if (show) {
			show.reviews.push(review);
			await show.save();
			res.status(201).json({ message: 'Review added', reviews: show.reviews });
		} else {
			res.status(404).json({ message: 'Show not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

app.delete('/shows/:idShow/reviews/:idReview', async (req, res) => {
	try {
		const { idShow, idReview } = req.params;
		const show = await Shows.findOne({ idShow: parseInt(idShow) });

		if (show) {
			show.reviews.splice(parseInt(idReview), 1);
			await show.save();
			res.status(201).json({ message: 'Review deleted', reviews: show.reviews });
		} else {
			res.status(404).json({ message: 'Show not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

app.put('/shows/:idShow/reviews/:idReview', async (req, res) => {
	try {
		const { idShow, idReview } = req.params;
		const { review } = req.body;
		const show = await Shows.findOne({ idShow: parseInt(idShow) });
		if (show) {
			show.reviews[parseInt(idReview)] = review;
			await show.save();
			res.json({ message: 'Review updated', reviews: show.reviews });
		} else {
			res.status(404).json({ message: 'Show not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

app.put('/shows/:idShow', async (req, res) => {
	try {
		const { idShow } = req.params;
		const updates = req.body;
		const show = await Shows.findOneAndUpdate(
			{ idShow: parseInt(idShow) },
			{ $set: updates },
			{ new: true },
		);

		if (show) {
			res.json({ message: 'Show updated', show });
		} else {
			res.status(404).json({ message: 'Show not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ message: 'Server error' });
	}
});

app.listen(process.env.PORT, () => {
	console.log(`bok port ${process.env.PORT}`);
});