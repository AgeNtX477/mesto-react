import React, { useState } from 'react'
import Header from './Header'
import Main from './Main'
import Footer from './Footer'
import PopupWithForm from './PopupWithForm'
import ImagePopup from './ImagePopup'

function App () {
  // переменные состояния попапов
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false)
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})

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

  return (
    <div className='body'>
      <div className='page'>
        <Header />

        <Main
          onEditAvatar={handleEditAvatarClick}
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onCardClick={handleCardClick}
        />

        <Footer />

        <PopupWithForm
          popup={{
            name: 'avatar',
            title: 'Обновить аватар',
            submitButtonText: 'Сохранить'
          }}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type='url'
            name='avatar'
            placeholder='Ссылка на аватар'
            className='popup__input popup__input_type_avatar'
            required
          />
          <span
            className='popup__error popup__error_place_avatar'
            id='avatar-error'
          />
        </PopupWithForm>

        <PopupWithForm
          popup={{
            name: 'profile-edit',
            title: 'Редактировать профиль',
            submitButtonText: 'Сохранить'
          }}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type='text'
            name='name'
            placeholder='Имя'
            className='popup__input popup__input_type_author'
            minLength={2}
            maxLength={40}
            required
          />
          <span
            className='popup__error popup__error_place_name'
            id='name-error'
          />
          <input
            type='text'
            name='about'
            placeholder='О себе'
            className='popup__input popup__input_type_description'
            minLength={2}
            maxLength={200}
            required
          />
          <span
            className='popup__error popup__error_place_about'
            id='about-error'
          />
        </PopupWithForm>

        <PopupWithForm
          popup={{
            name: 'img-add',
            title: 'Новое место',
            submitButtonText: 'Создать'
          }}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        >
          <input
            type='text'
            name='place'
            placeholder='Название'
            className='popup__input popup__input_type_place-name'
            minLength={2}
            maxLength={30}
            required
          />
          <span
            className='popup__error popup__error_place_place'
            id='place-error'
          />
          <input
            type='url'
            name='url'
            placeholder='Ссылка на картинку'
            className='popup__input popup__input_type_img-src'
            required
          />
          <span
            className='popup__error popup__error_place_url'
            id='url-error'
          />
        </PopupWithForm>

        <PopupWithForm
          popup={{
            name: 'del-confirm',
            title: 'Вы уверены?',
            submitButtonText: 'Да'
          }}
        ></PopupWithForm>

        <ImagePopup
          isOpen={isImagePopupOpen}
          card={selectedCard}
          onClose={closeAllPopups}
        />
      </div>
      {/* border of page */}
    </div>
  )
}

export default App
