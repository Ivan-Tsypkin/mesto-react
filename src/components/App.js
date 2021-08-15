import '../index.css';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { useState } from 'react';


function App() {

  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isCardDeleteConfirmOpen, setCardDeleteConfirmOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({isOpen: false, data: {}})


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

  return (
    <div className="page">
      <div className="page__content">
        <Header />

        <Main
          onEditProfile = {() => setEditProfilePopupOpen(true)}
          onEditAvatar = {() => setEditAvatarPopupOpen(true)}
          onAddPlace = {() => setAddPlacePopupOpen(true)}
          onCardDelete = {() => setCardDeleteConfirmOpen(true)}
          onCardClick = {handleCardClick}
        />

        <Footer />

        <PopupWithForm name="edit" title="Редактировать профиль" isOpen={isEditProfilePopupOpen} onClose = {closeAllPopups} buttonText="Сохранить">
            <input type="text" className="popup__form-item popup__form-item_value_name" placeholder="Имя" name="userName" id="user-name" minLength="2" maxLength="40" required/>
            <span className="user-name-error popup__form-error-msg"></span>
            <input type="text" className="popup__form-item popup__form-item_value_job" placeholder="Род деятельности" name="userJob" id="user-job" minLength="2" maxLength="200" required/>
            <span className="user-job-error popup__form-error-msg popup__form-error-msg_pos_bottom"></span>
        </PopupWithForm>

        <PopupWithForm name="edit-avatar" title="Обновить аватар" isOpen={isEditAvatarPopupOpen} onClose = {closeAllPopups} buttonText="Сохранить">
            <input type="url" className="popup__form-item popup__form-item_value_link" placeholder="Ссылка на аватар" name="avatarLink" id="avatar-link" required/>
            <span className="avatar-link-error popup__form-error-msg"></span>
        </PopupWithForm>

        <PopupWithForm name="new-card" title="Новое место" isOpen={isAddPlacePopupOpen} onClose = {closeAllPopups} buttonText="Создать">
            <input type="text" className="popup__form-item popup__form-item_value_pic-name" placeholder="Название" name="picName" id="pic-name" minLength="2" maxLength="30" required/>
            <span className="pic-name-error popup__form-error-msg"></span>
            <input type="url" className="popup__form-item popup__form-item_value_link" placeholder="Ссылка на картинку" name="picLink" id="pic-link" required/>
            <span className ="pic-link-error popup__form-error-msg popup__form-error-msg_pos_bottom"></span>
        </PopupWithForm>

        <PopupWithForm name="delete-card-confirm" title="Вы уверены?" isOpen={isCardDeleteConfirmOpen} onClose = {closeAllPopups} buttonText="Да"/>

        <ImagePopup {...selectedCard} onClose = {closeAllPopups} />
      </div>
    </div>
  );
}

export default App;
