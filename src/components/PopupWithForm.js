export default function PopupWithForm(props) {
  return (
    <div className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <button type="button" className="popup__close-button" aria-label="Закрыть окно" onClick={props.onClose}></button>
        <h3 className="popup__heading">{props.title}</h3>

        {props.children}

      </div>
    </div>
  )
}
