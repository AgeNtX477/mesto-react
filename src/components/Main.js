import React, { useEffect, useState } from 'react'
import api from '../utils/Api'
import Card from './Card'

// стейт-переменные для загрузки данных с сервера, данные пользователя + карточки
function Main (props) {
  const [userName, setUserName] = useState('')
  const [userDescription, setUserDescription] = useState('')
  const [userAvatar, setUserAvatar] = useState('')
  const [cards, setCards] = useState([])

// обращаясь к классу api загружаем одноверменно все данные с сервера
  useEffect(() => {
    Promise.all([api.getProfile(), api.getInitialCards()])
      .then(([data, cardList]) => {
        setUserAvatar(data.avatar)
        setUserName(data.name)
        setUserDescription(data.about)
        setCards(cardList)
      })
      .catch(err => console.log(err))
  }, [])

  return (
    <main>
      <section className='profile'>
        <div className='profile__user-container'>
          <img
            src={userAvatar}
            className='profile__avatar'
            alt='Аватар пользователя'
          />
          <button
            onClick={props.onEditAvatar}
            className='profile__avatar-button'
            type='button'
          />
        </div>
        <div className='profile__info'>
          <div className='profile__container'>
            <h1 className='profile__author'>{userName}</h1>
            <button
              onClick={props.onEditProfile}
              className='profile__edit-button'
              type='button'
            />
          </div>
          <h2 className='profile__description'>{userDescription}</h2>
        </div>
        <button
          onClick={props.onAddPlace}
          className='profile__add-button'
          type='button'
        />
      </section>
      <section className='element'>
        {cards.map(itinialCards => {
          return (
            <Card
              card={itinialCards}
              name={itinialCards.name}
              link={itinialCards.link}
              likes={itinialCards.likes.length}
              onCardClick={props.onCardClick}
            />
          )
        })}
      </section>
    </main>
  )
}

export default Main
