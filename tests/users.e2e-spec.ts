import { App } from '../src/app';
import { boot } from '../src/main';
import request from 'supertest';

let application: App;

beforeAll(async () => {
	const { app } = await boot;
	application = app;
});

describe('Users e2e', () => {
	it('Register - existing user', async () => {
		const res = await request(application.app).post('/users/register').send({
			email: 'a@gmail.com',
			password: '123123',
		});

		expect(res.statusCode).toBe(422);
	});

	it('Login - with the wrong email', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'wrong@gmail.com',
			password: '1',
		});

		expect(res.statusCode).toBe(404);
	});

	it('Login - with the wrong password', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'a@gmail.com',
			password: '1',
		});

		expect(res.statusCode).toBe(401);
	});

	it('Login - successful', async () => {
		const res = await request(application.app).post('/users/login').send({
			email: 'a@gmail.com',
			password: '123123',
		});

		expect(res.statusCode).toBe(200);
		expect(res.body.id).toBeDefined();
		expect(res.body.jwt).toBeDefined();
	});

	it('Info - unsuccessful', async () => {
		const loginRes = await request(application.app).post('/users/login').send({
			email: 'a@gmail.com',
			password: '123123',
		});
		const infoRes = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer 1`);
		expect(infoRes.statusCode).toBe(401);
	});

	it('Info - successful', async () => {
		const loginRes = await request(application.app).post('/users/login').send({
			email: 'a@gmail.com',
			password: '123123',
		});
		const infoRes = await request(application.app)
			.get('/users/info')
			.set('Authorization', `Bearer ${loginRes.body.jwt}`);

		expect(infoRes.statusCode).toBe(200);
		expect(infoRes.body.email).toBe('a@gmail.com');
		expect(infoRes.body.id).toBeDefined();
		expect(infoRes.body.name).toBeDefined();
	});
});

afterAll(() => {
	application.close();
});
