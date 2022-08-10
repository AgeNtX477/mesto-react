class Api {
  constructor ({ baseUrl, headers }) {
    this._headers = headers
    this._baseUrl = baseUrl
  }

  _checkResponse (res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getProfile () {
    // получаем данные пользователя с сервера
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    }).then(this._checkResponse)
  }

  getInitialCards () {
    // получаем карточки с сервера
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    }).then(this._checkResponse)
  }

  editProfile (name, about) {
    // отправляем на сервер данные пользователя
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name,
        about
      })
    }).then(this._checkResponse)
  }

  addCard (name, link) {
    // отправляем на сервер новую карточку
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link
      })
    }).then(this._checkResponse)
  }

  deleteCard (id) {
    // удаляем карточку с сервера
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse)
  }

  deleteLike (id) {
    // удаляем свой лукас
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    }).then(this._checkResponse)
  }

  putLike (id) {
    // ставим лукас
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    }).then(this._checkResponse)
  }

  changeAvatar (avatar) {
    // отправляем на сервер данные пользователя
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar
      })
    }).then(this._checkResponse)
  }
}

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-44',
  headers: {
    authorization: 'ed24a158-2646-4ac3-a112-ed7a389062f2',
    'Content-Type': 'application/json'
  }
})

export default api
