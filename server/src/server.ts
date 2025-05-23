import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { Show, User } from './model';
import bcrypt from 'bcrypt';
// import fs from 'fs';
// const fs = require("fs/promises")
import { writeFile } from 'fs/promises';
dotenv.config();

const corsOptions = {
	origin: ['http://localhost:3000', 'http://localhost:8080'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization']
};

const domain = process.env.DOMAIN;
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
// const clientIdM2M = process.env.REACT_APP_AUTH0_M2M_CLIENT_ID;
// const clientSecretM2M = process.env.REACT_APP_AUTH0_M2M_CLIENT_SECRET;

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(`${process.env.MONGO_URI}`).then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

const userSchema = new mongoose.Schema<User>({
	idUser: {type: Number, required: true},
	name: { type: String, required: true },
	surname: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	role: {type: String, required: true}
}, { versionKey: false });
const showSchema = new mongoose.Schema<Show>();

const Users = mongoose.model('Users', userSchema, 'Users');
const Shows = mongoose.model('Shows', showSchema, 'Shows');


function validatePassword(password: string): boolean {
	const regex = /^(?=.*\d).{10,}$/;
  
	return regex.test(password);
}

function validateEmail(email: string): boolean {
	return email.includes('@');
}

app.get("/", (req, res) => {
	console.log("Pocetna stranica");
	res.send("Welcome");
});

app.get('/shows', async (req, res) => {
	// console.log("shows");

	try {
		const shows = await Shows.find();
		// console.log(shows)
		res.status(200).json(shows);
	} catch(err) {
		res.status(500).json({ message: 'Error fetching shows' });
	}
});

app.get('/users', async (req, res) => {
	console.log("users")
	try {
		const users = await Users.find();
    	res.status(200).json(users);
	} catch (err) {
		res.status(500).json({ message: 'Error fetching users' });
	}
});

app.get("/users/count", async (req, res) => {
	try {
		const count = await Users.countDocuments();
		res.status(200).json({ count });
	} catch (err) {
		res.status(500).json({ error: "Error counting users" });
	}
});

app.get('/shows/top-rated', (req, res) => {

});

app.get('/profile', (req, res) => {

});

// app.post('/login', async (req, res) => {
// 	const {email, password} = req.body;

// 	const user = await Users.findOne({email});
// 	if(!user) {
// 		return res.status(401).json({message: "Wrong email or password"});
// 	} 
// 	const hashedPassword = user.password;

// 	const isMatch = bcrypt.compare(password, hashedPassword);
// 	if(!isMatch) {
// 		res.status(400).json({message: "Wrong email or password"})
// 	}

// 	res.status(200).json({message: "Succesful login!"})
// });

app.post("/register", async (req, res) => {
	console.log("Body: ", req.body);

	if(!validatePassword(req.body.password)) {
		res.status(400).json({error: "Password is not valid!!!"})
	}

	if(!validateEmail(req.body.email)) {
		res.status(400).json({error: "Email is not valid!!!"})
	}

	let count = 0;

	try {
		const response = await fetch("http://localhost:8080/users/count", {
			method: "GET",
			headers: {
                'Content-Type': 'application/json',
            },
		})

		if(!response.ok) {
			const res = await response.json();
			alert(res.error)
			throw new Error("Error while getting users")
		}

		const result = await response.json();
		count = result.count;

	} catch (error) {
		console.log(error);
	}

	let newUser: User = req.body;
	newUser.idUser = count + 1;
	newUser.role = "user"

	const userDoc = new Users(newUser);  
	await userDoc.save();   

	res.status(200).json("All good");
})

app.listen(process.env.PORT, () => {
	console.log(`bok port ${process.env.PORT}`);
});