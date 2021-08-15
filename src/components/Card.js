export default function Card(props) {
  return (
    <li className="cards__item">
      <button type="button" className="cards__remove-button" aria-label="Удалить карточку" onClick={props.onCardDelete}></button>
      <img src={props.link} alt={props.name} className="cards__image" onClick={() => props.onCardClick(props)}/>
      <div className="cards__caption">
        <h2 className="cards__image-caption">{props.name}</h2>
        <div className="cards__likes">
          <button type="button" className="cards__like-button" aria-label="Поставить лайк"></button>
          <span className="cards__likes-number">{props.likes.length ? props.likes.length : ''}</span>
        </div>
      </div>
    </li>
  )
}
