/**
 * @jest-environment node
 */
const request = require('supertest');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { app, Users, Shows } = require('./server.js');
const { describe, test, expect, beforeAll, afterAll, beforeEach } = require('@jest/globals');

describe('API routes', () => {
	let mongoServer;

	beforeAll(async () => {
		await mongoose.disconnect();
		mongoServer = await MongoMemoryServer.create();
		const uri = mongoServer.getUri();
		await mongoose.connect(uri);
	});

	afterAll(async () => {
		await mongoose.disconnect();
		await mongoServer.stop();
	});

	beforeEach(async () => {
		await Users.deleteMany({});
		await Shows.deleteMany({});

		const hashed = await bcrypt.hash('password123', 10);
		await Users.create({
			idUser: 1,
			name: 'Test',
			surname: 'User',
			email: 'test@example.com',
			password: hashed,
			role: 'user',
		});

		await Shows.create({
			idShow: 1,
			title: 'First Show',
			details: {
				author: 'Author1',
				genre: 'Drama',
				release_date: '2025-01-01',
				description: 'Description1',
				image: 'https://fakeimg.pl/200x300'
			},
			reviews: [],
		});
	});

	test('GET / should return welcome', async () => {
		const res = await request(app).get('/');
		expect(res.status).toBe(200);
		expect(res.text).toBe('Welcome');
	});

	test('GET /shows returns all shows', async () => {
		const res = await request(app).get('/shows');
		expect(res.status).toBe(200);
		expect(Array.isArray(res.body.data)).toBe(true);
		expect(res.body.data.length).toBe(1);
	});

	test('GET /users returns all users', async () => {
		const res = await request(app).get('/users');
		expect(res.status).toBe(200);
		expect(res.body.data[0].email).toBe('test@example.com');
	});

	test('GET /shows/:idShow returns a show', async () => {
		const res = await request(app).get('/shows/1');
		expect(res.status).toBe(200);
		expect(res.body.data.title).toBe('First Show');
	});

	test('GET /profile/:idUser returns user without password', async () => {
		const res = await request(app).get('/profile/1');
		expect(res.status).toBe(200);
		expect(res.body.data.email).toBe('test@example.com');
		expect(res.body.data.password).toBeUndefined();
	});

	test('POST /login with valid credentials', async () => {
		const res = await request(app)
			.post('/login')
			.send({ email: 'test@example.com', password: 'password123' });
		expect(res.status).toBe(200);
		expect(res.body.data).toMatch(/Successful login/);
	});

	test('POST /login with invalid password', async () => {
		const res = await request(app)
			.post('/login')
			.send({ email: 'test@example.com', password: 'wrong' });
		expect(res.status).toBe(400);
	});

	test('POST /register creates a new user', async () => {
		const res = await request(app)
			.post('/register')
			.send({
				name: 'New',
				surname: 'User',
				email: 'new@example.com',
				password: 'newpassword123',
			});
		expect(res.status).toBe(201);
		expect(res.body.data).toMatch(/Registration successful/);
		const count = await Users.countDocuments();
		expect(count).toBe(2);
	});

	test('POST /shows/:idShow/reviews adds review', async () => {
		const review = { idReview: 1, comment: 'Great!' };
		const res = await request(app)
			.post('/shows/1/reviews')
			.send({ review });
		expect(res.status).toBe(201);
		expect(res.body.data[0].comment).toBe('Great!');
	});

	test('DELETE /shows/:idShow/reviews/:idReview deletes review', async () => {
		// First add a review
		await Shows.updateOne({ idShow: 1 }, { $push: { reviews: { idReview: 1, comment: 'Test' } } });
		const res = await request(app).delete('/shows/1/reviews/1');
		expect(res.status).toBe(201);
		expect(res.body.data.length).toBe(0);
	});

	test('PUT /shows/:idShow/reviews/:idReview updates review', async () => {
		await Shows.updateOne({ idShow: 1 }, { $push: { reviews: { idReview: 1, comment: 'Old' } } });
		const res = await request(app)
			.put('/shows/1/reviews/1')
			.send({ review: { idReview: 1, comment: 'Updated' } });
		expect(res.status).toBe(201);
		expect(res.body.data[0].comment).toBe('Updated');
	});

	test('PUT /shows/:idShow updates show fields', async () => {
		const res = await request(app)
			.put('/shows/1')
			.send({ title: 'Updated Show' });
		expect(res.status).toBe(201);
		expect(res.body.data.title).toBe('Updated Show');
	});

	test('POST /shows creates a new show', async () => {
		const newShow = {
			title: 'New Show',
			details: {
				author: 'B',
				genre: 'Horror',
				release_date: '2025-02-02',
				description: 'Scary',
				image: 'https://fakeimg.pl/200x300'
			},
		};

		const res = await request(app)
			.post('/shows')
			.send(newShow);

		expect(res.status).toBe(201);
		expect(res.body.data).toMatchObject({
			idShow: 2,
			title: 'New Show'
		});

		const all = await Shows.find();
		expect(all).toHaveLength(2);
	});

	test('POST /shows with duplicate titles returns 400', async () => {
		const dup = {
			title: 'First Show',
			details: {
				author: 'X',
				genre: 'X',
				release_date: '2025-03-03',
				description: 'X',
				image: 'https://fakeimg.pl/200x300'
			},
		};
		const res = await request(app)
			.post('/shows')
			.send(dup);

		expect(res.status).toBe(400);
		expect(res.body.error).toMatch(/already exists/);
	});

	test('DELETE /shows/:idShow deletes existing show', async () => {
		const res = await request(app).delete('/shows/1');

		expect(res.status).toBe(200);
		expect(res.body.data.idShow).toBe(1);

		const remaining = await Shows.find();
		expect(remaining).toHaveLength(0);
	});

	test('DELETE /shows/:idShow returns 404 for non-existent', async () => {
		const res = await request(app).delete('/shows/999');
		expect(res.status).toBe(404);
		expect(res.body.error).toMatch(/not found/);
	});
});
