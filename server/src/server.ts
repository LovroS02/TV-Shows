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
		res.status(200).json({ data: shows });
	} catch (err) {
		res.status(500).json({ error: 'Error fetching shows' });
	}
});

app.get('/users', async (req, res) => {
	try {
		const users = await Users.find();
		res.status(200).json({ data: users });
	} catch (err) {
		res.status(500).json({ error: 'Error fetching users' });
	}
});

app.get('/shows/:idShow', async (req, res) => {
	
	try {
		const { idShow } = req.params;
		const show = await Shows.findOne({ idShow: parseInt(idShow) });

		if (show) {
			res.status(200).json({ data: show })
		} else {
			res.status(404).json({ error: "Show not found" })
		}
	} catch (err) {
		console.error('Server error: ', err);
		res.status(500).json({ error: 'Server error' });
	}
});

app.get('/profile/:idUser', async (req, res) => {
	try {
		const { idUser } = req.params;
		const user = await Users.findOne({ idUser: parseInt(idUser) }).select('-password');

		if (user) {
			res.status(200).json({ data: user });
		} else {
			res.status(404).json({ error: 'User not found' });
		}
	} catch (err) {
		console.error('Server error:', err);
		res.status(500).json({ error: 'Server error' });
	}
});

app.post('/login', async (req, res) => {
	const { email, password } = req.body;

	const user = await Users.findOne({ email });
	if (user) {
		const hashedPassword = user.password;
		const isMatch = await bcrypt.compare(password, hashedPassword);
		if (!isMatch) {
			res.status(400).json({ error: 'Wrong email or password' });
		}

		res.status(200).json({ data: 'Successful login!' });
	} else {
		res.status(401).json({ error: 'Wrong email or password' });
	}
});

app.post('/register', async (req, res) => {
	try {
		const count = await Users.countDocuments();
		const	hashedPassword = await bcrypt.hash(req.body.password, 10);

		const newUser = {
			...req.body,
			idUser: count + 1,
			role: 'user',
			password: hashedPassword,
		};

		try {
			const userDoc = new Users(newUser);
			await userDoc.save();
			res.status(201).json({ data: 'Registration successful' });

			return;
		} catch (err) {
			console.error('DB error:', err);
			res.status(500).json({ error: 'Error saving user' });
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'Server error' });
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
			res.status(201).json({ data: show.reviews });
		} else {
			res.status(404).json({ error: 'Show not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
});

app.delete('/shows/:idShow/reviews/:idReview', async (req, res) => {
	try {
		const { idShow, idReview } = req.params;
		const show = await Shows.findOne({ idShow: parseInt(idShow) });

		if (show) {
			const reviewIndex = show.reviews.findIndex(r => r.idReview === parseInt(idReview));
			if (reviewIndex !== -1) {
				show.reviews.splice(reviewIndex, 1);
				await show.save();
				res.status(201).json({ data: show.reviews });
			} else {
				res.status(404).json({ error: 'Review not found' });
			}
		} else {
			res.status(404).json({ error: 'Show not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
});

app.put('/shows/:idShow/reviews/:idReview', async (req, res) => {
	try {
		const { idShow, idReview } = req.params;
		const { review } = req.body;
		const show = await Shows.findOne({ idShow: parseInt(idShow) });
		if (show) {
			show.reviews[parseInt(idReview) - 1] = review;
			await show.save();
			res.status(201).json({ data: show.reviews });
		} else {
			res.status(404).json({ error: 'Show not found' });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
});

app.put('/shows/:idShow', async (req, res) => {
	try {
		const { idShow } = req.params;
		const updates = req.body;

		let show;
		try {
			show = await Shows.findOne({ idShow: +idShow });
		} catch(err) {
			console.error(err);
			res.status(500).json({ error: 'Server error' });
		}
		if (show) {
			if (updates.details) {
				show.details = {
					...show.details,
					...updates.details
				};
				delete updates.details
			}

			Object.assign(show, updates);
			await show.save();
			res.status(201).json({ data: show });
		} else {
			res.status(404).json({ error: 'Show not found' });
		}

	} catch (err) {
		console.error(err);
		res.status(500).json({ error: 'Server error' });
	}
});

app.post('/shows', async (req, res) => {
	try {
		const { title, details } = req.body;

		const exists = await Shows.findOne({ title: title });
		if (exists) {
			res.status(400).json({ error: 'Show with that idShow already exists' });
		}

		const count = await Shows.countDocuments();
		const newShow = {
			idShow: count + 1,
			title,
			details,
			reviews: []
		};

		try {
			const showDoc = new Shows(newShow);
			await showDoc.save();
			res.status(201).json({ data: newShow });
		} catch (err) {
			console.error('DB error:', err);
			res.status(500).json({ error: 'Error saving show' });
		}
	} catch (err) {
		console.error('Error creating show:', err);
		res.status(500).json({ error: 'Error creating show' });
	}
});

app.delete('/shows/:idShow', async (req, res) => {
	try {
		const { idShow } = req.params;
		const deleted = await Shows.findOneAndDelete({ idShow: parseInt(idShow) });
		if (deleted) {
			res.status(200).json({ data: deleted });
		} else {
			res.status(404).json({ error: 'Show not found' });
		}
	} catch (err) {
		console.error('Error deleting show:', err);
		res.status(500).json({ error: 'Error deleting show' });
	}
});

app.listen(process.env.PORT, () => {
	console.log(`bok port ${process.env.PORT}`);
});

module.exports = {app, Users, Shows};