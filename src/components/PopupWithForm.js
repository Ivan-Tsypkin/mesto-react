export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть окно" onClick={props.onClose}></button>
        <h3 className="popup__heading">{props.title}</h3>
        <form className={`popup__form popup__form_type_${props.name}`} method="POST" name={props.name}>
          {props.children}
          <button type="submit" className="popup__submit-button" aria-label="Сохранить профиль">{props.buttonText}</button>
        </form>
      </div>
    </div>
  )
}
