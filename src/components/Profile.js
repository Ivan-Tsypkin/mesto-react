export default function Profile(props) {
  return (
    <section className="profile">
      <div className="profile__avatar-container" onClick={props.onEditAvatar}>
        <img
          src={props.currentUser.avatar}
          alt="Аватар пользователя"
          className="profile__avatar"
        />
      </div>
      <div className="profile__info">
        <h1 className="profile__name">{props.currentUser.name}</h1>
        <button
          type="button"
          className="profile__edit-button"
          aria-label="Редактировать профиль"
          onClick={props.onEditProfile}
        ></button>
        <p className="profile__job">{props.currentUser.about}</p>
      </div>
      <button
        type="button"
        className="profile__add-button"
        aria-label="Добавить место"
        onClick={props.onAddPlace}
      ></button>
    </section>
  )
}
