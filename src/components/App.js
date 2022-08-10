import React, { useState, useEffect } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import ImagePopup from './ImagePopup'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import api from '../utils/Api'
import EditProfilePopup from './EditProfilePopup'
import EditAvatarPopup from './EditAvatarPopup'
import AddPlacePopup from './AddPlacePopup'

function App () {
  // переменные состояния попапов
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({})
  const [cards, setCards] = useState([])

  // получаем данные пользователя и карточки с сервера
  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([userData, cardList]) => {
        setCurrentUser(userData)
        setCards(cardList)
      })
      .catch(err => console.log(err))
  }, [])

  // функция простановки лайка
  function handleCardLike (card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id)

    if (isLiked) {
      api
        .deleteLike(card._id)
        .then(newCard => {
          // создадим новый массив без лайка пользователя
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
        })
        .catch(err => console.log(err))
    } else {
      api
        .putLike(card._id)
        .then(newCard => {
          // создадим новый массив с поставленным лайком
          setCards(state => state.map(c => (c._id === card._id ? newCard : c)))
        })
        .catch(err => console.log(err))
    }
  }

  // функция удалить карточку
  function handleCardDelete (card) {
    api
      .deleteCard(card._id)
      .then(() => {
        // создадим новый массив в котором не будет удаленной карточки
        setCards(cards.filter(item => item._id !== card._id))
      })
      .catch(err => console.log(err))
  }

  //Обработчик кнопки просмотра карточки (полный размер)
  function handleCardClick (card) {
    setSelectedCard(card)
    setImagePopupOpen(true)
  }

  //Обработчик кнопки редактирования аватарки
  function handleEditAvatarClick () {
    setEditAvatarPopupOpen(true)
  }

  //Обработчик кнопки редактирования инф-ии профиля
  function handleEditProfileClick () {
    setEditProfilePopupOpen(true)
  }

  //Обработчик кнопки добавления карточки
  function handleAddPlaceClick () {
    setAddPlacePopupOpen(true)
  }

  //Обработчик закрытия всех попапов
  function closeAllPopups () {
    setEditAvatarPopupOpen(false)
    setEditProfilePopupOpen(false)
    setAddPlacePopupOpen(false)
    setImagePopupOpen(false)
  }

  // обработчик для обновления данных пользователя
  function handleUpdateUser (data) {
    api
      .editProfile(data.name, data.about)
      .then(newUser => {
        setCurrentUser(newUser)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  // обработчик для обновления аватара пользователя
  function handleUpdateAvatar (data) {
    api
      .changeAvatar(data.avatar)
      .then(newAvatar => {
        setCurrentUser(newAvatar)
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  // обработчик для добавления новой карточки
  function handleAddPlaceSubmit (data) {
    api
      .addCard(data.name, data.link)
      .then(newCard => {
        setCards([newCard, ...cards])
        closeAllPopups()
      })
      .catch(err => console.log(err))
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='body'>
        <div className='page'>
          <Header />

          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
          />

          <Footer />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          {/* <PopupWithForm
            popup={{
              name: 'del-confirm',
              title: 'Вы уверены?',
              submitButtonText: 'Да'
            }}
          ></PopupWithForm> */}

          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
        </div>
        {/* border of page */}
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
