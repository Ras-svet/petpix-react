export class Auth {
	constructor({url}) {
		this._url = url;
	}

	_checkResponse(response) {
		if (response.ok) {
			console.log(response.json)
			return response.json();
		}
		return Promise.reject(`Ошибка: ${response.status}`)
	};

	checkEmail(email) {
		return fetch(`${this._url}/sendcode`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({email}),
		}).then(this._checkResponse)
	};

	checkCode(email, code) {
		return fetch(`${this._url}/replycode`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({email, code}),
		}).then(this._checkResponse)
	};

	register(email, password, username, firstName) {
		return fetch(`${this._url}/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({email, password, username, firstName}),
		}).then(this._checkResponse)
	}

	login(email, password) {
		return fetch(`${this._url}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({email, password}),
		}).then(this._checkResponse)
	}
}

const auth = new Auth({
	url: 'http://localhost:8000/api/auth',
})

export default auth;