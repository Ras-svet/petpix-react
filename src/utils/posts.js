export class Posts {
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

	getAllPosts(token) {
		return fetch(`${this._url}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(this._checkResponse)
	};

	getFavoritesPosts(token) {
		return fetch(`${this._url}/favorite`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(this._checkResponse)
	}

	like(token, postId) {
		return fetch(`${this._url}/${postId}/likes`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(this._checkResponse)
	}

	deleteLike(token, postId) {
		return fetch(`${this._url}/${postId}/likes`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(this._checkResponse)
	}

	getMyCards(token) {
		return fetch(`${this._url}/me`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(this._checkResponse)
	}

	getUserCards(token, userId) {
		return fetch(`${this._url}/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			}
		}).then(this._checkResponse)
	}
}

const posts = new Posts({
	url: 'http://localhost:8000/api/posts',
})

export default posts;