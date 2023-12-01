export class Users {
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

	getMyInfo(token) {
		return fetch(`${this._url}/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(this._checkResponse)
	}

	addToFavorites(token, userId) {
		return fetch(`${this._url}/${userId}/friends`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(this._checkResponse)
	};

	deleteFromFavorites(token, userId) {
		return fetch(`${this._url}/${userId}/friends`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(this._checkResponse)
	};

	updateUserInfo(token, email, firstName, about) {
		return fetch(`${this._url}/me`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({email, firstName, about}),
		}).then(this._checkResponse)
	}

	updateUserAvatar(token, avatar) {
		return fetch(`${this._url}/me/avatar`, {
			method: "PATCH",
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'multipart/form-data'
			},
			avatar
		})
	}

	getUserInfo(token, userId) {
		return fetch(`${this._url}/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(this._checkResponse)
	}
}

const users = new Users({
	url: 'http://localhost:8000/api/users',
})

export default users;