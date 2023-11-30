import bcrypt from 'bcryptjs';

export class User {
	private _password: string;

	constructor(
		private readonly _email: string,
		private readonly _name: string,
		passwordHash?: string,
	) {
		if (passwordHash) {
			this._password = passwordHash;
		}
	}

	get password(): string {
		return this._password;
	}

	get email(): string {
		return this._email;
	}

	get name(): string {
		return this._name;
	}

	async setPassword(pass: string, salt: number): Promise<void> {
		this._password = await bcrypt.hash(pass, salt);
	}

	async comparePassword(password: string): Promise<boolean> {
		return await bcrypt.compare(password, this._password);
	}
}
