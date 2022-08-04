import React from 'react'

function Card (props) {
  function handleClick () {
    props.onCardClick(props.card)
  }
  return (
    <article className='element__box'>
      <img
        src={props.link}
        className='element__image'
        alt={props.name}
        onClick={handleClick}
      />
      <div className='element__stuff'>
        <h2 className='element__title'>{props.name}</h2>
        <div className='element__like-container'>
          <button className='element__like-button' type='button' />
          <span className='element__like-counter'>{props.likes}</span>
        </div>
      </div>
      <button className='element__del-button_visible' type='button' />
    </article>
  )
}

export default Card
