import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Main from './components/Main';
import PopupWithForm from './components/PopupWithForm';
import ImagePopup from './components/ImagePopup';
import { useState, useEffect } from 'react';
import {api} from './utils/Api';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isCardDeleteConfirmOpen, setCardDeleteConfirmOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({isOpen: false, data: {}})
  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState('');
  const [cards, setCards] = useState([]);

  function closeAllPopups() {
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setCardDeleteConfirmOpen(false);
    setSelectedCard({isOpen: false, data: {}});
  }

  function handleCardClick(data) {
    setSelectedCard(
      {
        isOpen: true,
        data: {
          link: data.link,
          name: data.name
        }
      }
    )
  }

  useEffect(() => {
    api.getUserInfo()
      .then(res => {
        setUserName(res.name);
        setUserDescription(res.about);
        setUserAvatar(res.avatar);
      })
      .catch(error => console.log(error))
  }, [])

  useEffect(() => {
    api.getInitialCards()
      .then(res => {
        setCards(res)
      })
      .catch(error => console.log(error))
  }, [])


  return (
    <div className="page">
      <div className="page__content">
        <Header />

        <Main
          onEditProfile = {() => setEditProfilePopupOpen(true)}
          onEditAvatar = {() => setEditAvatarPopupOpen(true)}
          onAddPlace = {() => setAddPlacePopupOpen(true)}
          onCardDelete = {() => setCardDeleteConfirmOpen(true)}
          profileName = {userName}
          profileDescription = {userDescription}
          profileAvatar = {userAvatar}
          cards = {cards}
          onCardClick = {handleCardClick}
        />

        <Footer />

        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose = {closeAllPopups}>
          <form className="popup__form popup__form_type_profile" method="POST" name="profileForm" noValidate>
            <input type="text" className="popup__form-item popup__form-item_value_name" placeholder="Имя" name="userName" id="user-name" minLength="2" maxLength="40" required/>
            <span className="user-name-error popup__form-error-msg"></span>
            <input type="text" className="popup__form-item popup__form-item_value_job" placeholder="Род деятельности" name="userJob" id="user-job" minLength="2" maxLength="200" required/>
            <span className="user-job-error popup__form-error-msg popup__form-error-msg_pos_bottom"></span>
            <button type="submit" className="popup__submit-button" aria-label="Сохранить профиль">Сохранить</button>
          </form>
        </PopupWithForm>

        <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose = {closeAllPopups}>
          <form className="popup__form popup__form_type_edit-profile" method="POST" name="profileAvatarForm" noValidate>
            <input type="url" className="popup__form-item popup__form-item_value_link" placeholder="Ссылка на аватар" name="avatarLink" id="avatar-link" required/>
            <span className="avatar-link-error popup__form-error-msg"></span>
            <button type="submit" className="popup__submit-button popup__submit-button_disabled" aria-label="Сохранить профиль" disabled>Сохранить</button>
          </form>
        </PopupWithForm>

        <PopupWithForm name="new-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose = {closeAllPopups}>
          <form className="popup__form popup__form_type_add-card" method="POST" name="newCardForm" noValidate>
            <input type="text" className="popup__form-item popup__form-item_value_pic-name" placeholder="Название" name="picName" id="pic-name" minLength="2" maxLength="30" required/>
            <span className="pic-name-error popup__form-error-msg"></span>
            <input type="url" className="popup__form-item popup__form-item_value_link" placeholder="Ссылка на картинку" name="picLink" id="pic-link" required/>
            <span className ="pic-link-error popup__form-error-msg popup__form-error-msg_pos_bottom"></span>
            <button type="submit" className="popup__submit-button popup__submit-button_disabled" aria-label="Сохранить карточку" disabled>Создать</button>
          </form>
        </PopupWithForm>

        <PopupWithForm name="delete-card-confirm" title="Вы уверены?" isOpen={isCardDeleteConfirmOpen} onClose = {closeAllPopups}>
          <form className="popup__form popup__form_type_delete-card-confirm" method="POST" name="newCardForm" noValidate>
            <button type="submit" className="popup__submit-button popup__submit-button_type_delete-card-confirm" aria-label="Удалить карточку">Да</button>
          </form>
        </PopupWithForm>

        <ImagePopup {...selectedCard} onClose = {closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
