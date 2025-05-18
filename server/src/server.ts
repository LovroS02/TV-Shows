import express, { response } from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { Show, User } from './model';
// import fs from 'fs';
// const fs = require("fs/promises")
import { writeFile } from 'fs/promises';
dotenv.config();

const corsOptions = {
	origin: 'http://localhost:3000',
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

app.get("/", (req, res) => {
	console.log("Pocetna stranica");
	res.send("Welcome");
});

app.get('/shows', async (req, res) => {
	console.log("shows");

	try {
		const show = await Shows.findOne();
		res.status(200).json(show);
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

app.post('/login', (req, res) => {

});

function validatePassword(password: string): boolean {
	const regex = /^(?=.*\d).{10,}$/;
  
	return regex.test(password);
}

function validateEmail(email: string): boolean {
	return email.includes('@');
}

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

// app.post('/register', async (req, res) => {
// 	const data = req.body;

// 	const authHeader = req.headers['authorization'];
//   	const token = authHeader && authHeader.split(' ')[1];
// 	const fullName = data.name + " " +  data.surname;

// 	let newUserData = {
// 	email: data.email,          // Email of the new user
// 	password: data.password,            // User password
// 	connection: "Username-Password-Authentication", // Connection name (for database connections)
// 	given_name: data.name,                 // First name
// 	family_name: data.surname,                 // Last name
// 	name: fullName,                   // Full name
// 	nickname: "johnny",                 // Nickname
// 	picture: "", // Profile picture (optional)
// 	user_metadata: {}
// 	};
	
// 	const response = await fetch(`https://${domain}/api/v2/users`, {
// 		method: "POST",
// 		headers: {
// 			'Authorization': `Bearer ${token}`,
// 			'Content-Type': 'application/json',
// 			'Accept': 'application/json'
// 		},
// 		body: JSON.stringify(newUserData)
// 	})

// 	if(!response.ok) {
// 		const res = await response.json();
// 		throw new Error("Error");
// 	}

// 	const result = await response.json();
// 	console.log("Result: ", result);
// });

// app.post('/register', async (req, res) => {
//     const data = req.body;

//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];

//     if (!token) {
//         return res.status(400).json({ error: 'Authorization token is required' });
//     }

//     const fullName = `${data.name} ${data.surname}`;

//     let newUserData = {
//         email: data.email,          // Email of the new user
//         password: data.password,    // User password
//         connection: "Username-Password-Authentication", // Connection name (for database connections)
//         given_name: data.name,      // First name
//         family_name: data.surname,  // Last name
//         name: fullName,             // Full name
//         nickname: "johnny",         // Nickname
//         picture: "",                // Profile picture (optional)
//         user_metadata: {}
//     };

// 	const response = await fetch(`https://${domain}/api/v2/users`, {
// 		method: "POST",
// 		headers: {
// 			'Authorization': `Bearer ${token}`,
// 			'Content-Type': 'application/json',
// 			'Accept': 'application/json'
// 		},
// 		body: JSON.stringify(newUserData)
// 	});

// 	if (!response.ok) {
// 		// Log the error response
// 		const errorData = await response.json();
// 		console.error('Error response from API:', errorData);
// 		return res.status(response.status).json({
// 			message: 'Error creating user',
// 			error: errorData
// 		});
// 	}

// 	const result = await response.json();
// 	console.log("User successfully created:", result);
// 	res.status(201).json(result);
// });

// app.get("/get-token", async (req, res) => {
//     const response = await fetch(`https://${domain}/oauth/token`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             grant_type: 'client_credentials',
//             client_id: `${clientId}`,
//             client_secret: `${clientSecret}`,
//             audience: process.env.AUDIENCE,
//         }),
//     })

//     if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Error fetching access token: ${errorData.error_description}`);
//     }

//     const data = await response.json();
// 	console.log(data);
//     res.send(data)
// })

app.listen(process.env.PORT, () => {
	console.log(`bok port ${process.env.PORT}`);
});