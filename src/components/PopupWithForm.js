import React from 'react'

function PopupWithForm (props) {
  return (
    <div
      className={`popup popup_${props.popup.name} ${
        props.isOpen ? `popup_opened` : ''
      }`}
    >
      <div className={`popup__${props.popup.name}-container`}>
        <h2 className='popup__heading'>{props.popup.title}</h2>
        <form
          name={props.popup.name}
          className={`popup__form popup__form_place_${props.popup.name}`}
          noValidate=''
        >
          <fieldset className='popup__form-set'>
            {props.children}
            <button
              className='popup__submit popup__submit_place_avatar'
              type='submit'
            >
              {props.popup.submitButtonText}
            </button>
          </fieldset>
        </form>
        <button
          className={`popup__close-button popup__close-button_place_${props.popup.name}`}
          onClick={props.onClose}
          type='button'
        />
      </div>
      {/* overlay оставлю на будущее, для закрытия клика по оверлею */}
      <div
        className={`popup__overlay popup__overlay_place_${props.popup.name}`}
      />
    </div>
  )
}

export default PopupWithForm
